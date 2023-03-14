const { RefreshTokens, Users, BankOfUsers, Banks, Imgs } = require("data/db/models")
const bcryptjs = require("bcryptjs")
const dotenv = require("dotenv").config();
const { CreateAccessToken, CreateRefreshToken } = require("data/token")

export const UserControllerAuthen = {
    Login: async (req, res) => {
        const { userName, pass } = req.body;

        try {
            const user = await Users.findOne({
                where: {
                    userName: userName
                },
                include: [{ model: Imgs }]
            });
            if (user) {

                if (bcryptjs.compareSync(pass, user.pass)) {

                    const newAccessToken = CreateAccessToken(user);
                    const newRefreshToken = CreateRefreshToken(user);

                    const [refreshtoken, created] = await RefreshTokens.findOrCreate({
                        where: {
                            idUser: user.id
                        }
                    });
                    if (!created) {
                        refreshtoken.refreshToken = newRefreshToken;
                        await refreshtoken.save();
                        res.cookie("refreshToken", newRefreshToken, {
                            httpOnly: true,
                            secure: true,
                            path: "/",
                            sameSite: "strict",
                            maxAge: 60 * 1000 * 60 * 24
                        });
                        user.pass = null;
                        user.pass2 = null;
                        const str = user.wallet_number.split(" ")[1];
                        user.wallet_number = str;
                        return res.status(200).json({
                            User: user,
                            accessToken: newAccessToken,
                            Online: true,
                            mess: "Login success!"
                        });
                    } else {
                        refreshtoken.set({
                            idUser: user.id,
                            refreshToken: newRefreshToken
                        });
                        await refreshtoken.save();
                        user.pass = null;
                        user.pass2 = null;
                        return res.status(200).json({
                            User: user,
                            accessToken: newAccessToken,
                            Online: true,
                            mess: "Login success!"
                        });
                    }
                } else {
                    return res.status(404).json({ error: "Pass wrong!" })
                }

            } else {
                return res.status(404).json({ error: "User not found!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Register: async (req, res) => {
        const { userName, pass, pass2, phone, email } = req.body;
        try {
            if (userName !== "" || pass !== "") {
                const [user, created] = await Users.findOrCreate({
                    where: {
                        userName: userName
                    }
                });
                if (!created) {
                    return res.status(400).json({ error: "Username đã tồn tại!" })
                } else {
                    const salt = bcryptjs.genSaltSync(10);
                    const salt2 = bcryptjs.genSaltSync(11);
                    const newPass = bcryptjs.hashSync(pass, salt);
                    const newPass2 = bcryptjs.hashSync(pass2, salt2);
                    const wallet_number = "Hga " + new Date().getTime();
                    const str = wallet_number.split(" ")[1];
                    user.set({
                        phone: phone + "$$block$$",
                        email: email + "$$block$$",
                        pass: newPass,
                        pass2: newPass2,
                        wallet_number: wallet_number
                    });
                    await user.save();
                    user.pass = null;
                    user.pass2 = null;
                    user.wallet_number = str;
                    return res.status(201).json({ mess: "Register success", user: user })
                }
            } else {
                return res.status(400).json({ error: "No data" })
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken");
            return res.end();
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    RefreshUser: async (req, res) => {
        const { id } = req.query;
        try {
            const user = await Users.findOne({
                where: {
                    id: id
                },
                include: [{ model: Imgs }]
            });
            if (user) {
                return res.status(200).json({ User: user });
            } else {
                return res.status(404).json({ error: "User không tồn tại!" });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}