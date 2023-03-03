import { Op } from "sequelize";

const { RefreshTokens, Users, BankOfUsers, Banks, Payments, Products, ReceiveBanks, Imgs, Prices, Cards, Values, Events } = require("data/db/models")
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
                    const listBankUser = await BankOfUsers.findAll({
                        where: {
                            idUser: user.id
                        },
                        include: [
                            { model: Banks },
                            { model: Users }
                        ]
                    });

                    const withdraw = await Payments.findAll({
                        where: {
                            [Op.and]: [
                                { idUser: user.id },
                                { command: "withdraw" }
                            ]
                        },
                        include: [
                            { model: BankOfUsers, include: [{ model: Banks }] },
                            { model: ReceiveBanks, include: [{ model: Banks }] },
                            { model: Imgs },
                            { model: Users }
                        ]
                    });
                    const refill = await Payments.findAll({
                        where: {
                            [Op.and]: [
                                { idUser: user.id },
                                { command: "refill" }
                            ]
                        },
                        include: [
                            { model: BankOfUsers, include: [{ model: Banks }] },
                            { model: ReceiveBanks, include: [{ model: Banks }] },
                            { model: Imgs },
                            { model: Users }
                        ]
                    });
                    const products = await Products.findAll({
                        where: {
                            idUser: user.id
                        },
                        include: [
                            { model: Users },
                            { model: Prices, include: [{ model: Cards }, { model: Values }] }
                        ]
                    });
                    const listEvent = await Events.findAll();

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
                            BankOfUsers: listBankUser,
                            Withdraws: withdraw,
                            Refills: refill,
                            Products: products,
                            Events: listEvent,
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
                            BankOfUsers: listBankUser,
                            Withdraws: withdraw,
                            Refills: refill,
                            Products: products,
                            Events: listEvent,
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
        const { userName, pass, phone, email } = req.body;
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
                    const newPass = bcryptjs.hashSync(pass, salt);
                    const wallet_number = "Hga " + new Date().getTime();
                    const str = wallet_number.split(" ")[1];
                    user.set({
                        phone: phone,
                        email: email,
                        pass: newPass,
                        wallet_number: wallet_number
                    });
                    await user.save();
                    user.pass = null;
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
    }
}