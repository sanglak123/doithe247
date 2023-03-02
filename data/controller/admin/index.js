const { Prices, Cards, Values, Users, RefreshTokens, Imgs, Products, Banks, BankOfUsers, TypeCards } = require("../../db/models");
const axios = require("axios");
const { Op, FLOAT } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const path = require("path");

const bycrys = require("bcryptjs");
const { CreateAccessToken, CreateRefreshToken } = require("data/token");

const ControllAdmin = {
    Authen: {
        Login: async (req, res) => {
            const { pass2, key } = req.body;
            const { id } = req.query;
            try {
                const admin = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                if (admin) {
                    if (bycrys.compareSync(pass2, admin.pass2)) {
                        if (key === process.env.KEY_ADMIN) {
                            return res.status(200).json({ mess: "Đăng nhập thành công!", LoginAdmin: true });
                        } else {
                            return res.status(400).json({ error: "KEY_ADMIN wrong!" });
                        }
                    } else {
                        return res.status(400).json({ error: "Password 2 wrong!" });
                    }
                } else {
                    return res.status(403).json({ error: "You are not Admin!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Register: async (req, res) => {
            const { userName, displayName, fullName, adress, pass, pass2, email, phone, key } = req.body;
            try {
                if (key === process.env.KEY_ADMIN) {
                    const oldAdmin = await Users.findOne({
                        where: {
                            userName: userName
                        }
                    });
                    if (oldAdmin) {
                        return res.status(400).json({ error: "Username already exits!" });
                    } else {
                        const salt = bycrys.genSaltSync(15);
                        const salt2 = bycrys.genSaltSync(17);
                        const newPass = bycrys.hashSync(pass, salt);
                        const newPass2 = bycrys.hashSync(pass2, salt2);
                        const wallet_number = "Hga " + new Date().getTime();                       
                        await Users.create({
                            userName: userName,
                            displayName: displayName,
                            fullName: fullName,
                            adress: adress,
                            pass: newPass,
                            pass2: newPass2,
                            email: email,
                            phone: phone,
                            admin: true,
                            wallet_number: wallet_number
                        });
                        return res.status(201).json({ mess: "Register success!" });
                    }
                } else {
                    return res.status(403).json({ error: "Your are not admin!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        EditProfile: async (req, res) => {
            const { id } = req.query;
            const { displayName, fullName, phone, adress, email } = req.body;

            try {
                const admin = await Users.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: Imgs }]
                });
                if (admin) {

                    if (req.file) {
                        const baseURL = req.protocol + '://' + req.get('host');
                        const pathImage = baseURL + '/img/avatar/' + req.file.filename;
                        const oldAvatar = await Imgs.findOne({
                            where: {
                                id: admin.avatar
                            }
                        });
                        if (oldAvatar) {
                            const unLoad = path.join(__dirname, "../../../../../public/img/avatar/");
                            fs.unlink(unLoad + oldAvatar.fileName, async (err) => {
                                if (err) {
                                    return res.status(500).json(err);
                                } else {
                                    oldAvatar.path = pathImage;
                                    oldAvatar.fileName = req.file.filename;
                                    await oldAvatar.save();

                                    admin.displayName = displayName;
                                    admin.fullName = fullName;
                                    admin.phone = phone;
                                    admin.adress = adress;
                                    admin.avatar = oldAvatar.id;
                                    admin.email = email
                                    await admin.save();

                                    const adminResult = await Users.findOne({
                                        where: {
                                            id: id
                                        },
                                        include: [{ model: Imgs }]
                                    });
                                    adminResult.pass = null;
                                    adminResult.pass2 = null;
                                    return res.status(200).json({ mess: "Update success!", User: adminResult })
                                }
                            })
                        } else {
                            const Avatar = await Imgs.create({
                                fileName: req.file.filename,
                                path: pathImage
                            });

                            admin.displayName = displayName;
                            admin.fullName = fullName;
                            admin.phone = phone;
                            admin.adress = adress;
                            admin.avatar = Avatar.id;
                            admin.email = email
                            await admin.save();

                            const adminResult = await Users.findOne({
                                where: {
                                    id: id
                                },
                                include: [{ model: Imgs }]
                            });
                            adminResult.pass = null;
                            adminResult.pass2 = null;
                            return res.status(200).json({ mess: "Update success!", User: adminResult })
                        }

                    } else {
                        admin.displayName = displayName;
                        admin.fullName = fullName;
                        admin.phone = phone;
                        admin.adress = adress;
                        admin.email = email
                        await admin.save();
                        const adminResult = await Users.findOne({
                            where: {
                                id: id
                            },
                            include: [{ model: Imgs }]
                        });
                        adminResult.pass = null;
                        adminResult.pass2 = null;
                        return res.status(200).json({ mess: "Update success!", User: adminResult })
                    }
                } else {
                    return res.status(404).json({ error: "Admin not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Prices: {
        Update: async (req, res) => {
            try {
                await axios({
                    method: "GET",
                    url: "https://doithe1s.vn/chargingws/v2/getfee?partner_id=6155991561"
                }).then(async (responsive) => {

                    const data = responsive.data;
                    for (let index = 0; index < data.length; index++) {
                        const telcoData = data[index].telco;
                        const valueData = data[index].value;
                        const feesChangeData = data[index].fees;

                        const card = await Cards.findOne({
                            where: {
                                telco: telcoData
                            }
                        });
                        const value = await Values.findOne({
                            where: {
                                name: valueData
                            }
                        })
                        const oldPrice = await Prices.findOne({
                            where: {
                                [Op.and]: [
                                    { idCard: card.id },
                                    { idValue: value.id }
                                ]
                            }
                        });
                        const discount = process.env.DISCOUNT;
                        if (oldPrice) {
                            oldPrice.feesChange = parseFloat(feesChangeData) + parseFloat(discount);
                            await oldPrice.save();
                        } else {
                            await Prices.create({
                                idCard: card.id,
                                idValue: value.id,
                                feesChange: parseFloat(feesChangeData) + parseFloat(discount),
                            });
                        }
                    };
                    const listPrice = await Prices.findAll({
                        include: [
                            { model: Cards },
                            { model: Values }
                        ]
                    });
                    return res.status(200).json({ Prices: listPrice, mess: "Update success!" })
                }).catch((err) => {
                    return res.status(500).json(err);
                })
            } catch (error) {
                return res.status(500).json(err);
            }
        },
        EditFeesBuy: async (req, res) => {
            const { id } = req.query;
            const { feesBuy } = req.body;
            try {
                const price = await Prices.findOne({
                    where: {
                        id: id
                    }
                });
                if (price) {
                    price.feesBuy = feesBuy;
                    await price.save();
                    return res.status(200).json({ mess: "Update success!" })
                } else {
                    return res.status(404).json({ error: "Price not found!" })
                }
            } catch (error) {
                return res.status(500).json(err);
            }
        },
        Add: async (req, res) => {
            const { idCard, idValue, feesChange, feesBuy } = req.body;
            try {
                const oldPrice = await Prices.findOne({
                    where: {
                        [Op.and]: [
                            { idCard: idCard },
                            { idValue: idValue }
                        ]
                    }
                });
                if (oldPrice) {
                    return res.status(400).json({ error: "Price already exits! Please choose update price" })
                } else {
                    await Prices.create({
                        idCard: idCard,
                        idValue: idValue,
                        feesChange: feesChange,
                        feesBuy: feesBuy
                    });
                    return res.status(201).json({ mess: "Add success!" })
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        }
    },
    Cards: {
        Add: async (req, res) => {
            try {

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {
                const card = await Cards.findOne({
                    where: {
                        id: id
                    }
                });
                if (card) {
                    const price = await Prices.findOne({
                        where: {
                            idCard: card.id
                        }
                    });
                    if (price) {
                        await Products.destroy({
                            where: {
                                idPrice: price.id
                            }
                        });
                        await Prices.destroy({
                            where: {
                                idCard: card.id
                            }
                        });
                        await card.destroy();
                        return res.status(200).json({ mess: "Delete success!" })
                    } else {
                        await card.destroy();
                        return res.status(200).json({ mess: "Delete success!", price })
                    }
                } else {
                    return res.status(404).json({ error: "Card not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Edit: async (req, res) => {
            const { id } = req.query;
            const { telco, change } = req.body;
            try {

                const card = await Cards.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: Imgs }, { model: TypeCards }]
                });
                if (card) {
                    if (req.file) {
                        const baseURL = req.protocol + '://' + req.get('host');
                        const pathImage = baseURL + '/img/logo/' + req.file.filename;
                        const oldImg = await Imgs.findOne({
                            where: {
                                id: card.img
                            }
                        });
                        if (oldImg) {
                            //Có ảnh củ = > xóa ảnh => thêm mới ảnh = > save
                            const unLoad = path.join(__dirname, "../../../../../../public/img/logo/");
                            fs.unlink(unLoad + oldImg.fileName, async (err) => {
                                if (err) {
                                    return res.status(500).json(err);
                                } else {
                                    oldImg.fileName = req.file.filename;
                                    oldImg.path = pathImage;
                                    await oldImg.save().then(async (newImg) => {
                                        card.telco = telco;
                                        card.img = newImg.id;
                                        card.change = change;
                                        await card.save().then((newCard) => {
                                            return res.status(200).json({ mess: "Update success!", Card: newCard, Img: newImg });
                                        });
                                    });
                                }
                            })
                        } else {
                            const newImg = await Imgs.create({
                                fileName: req.file.filename,
                                path: pathImage
                            });
                            card.telco = telco;
                            card.img = newImg.id;
                            card.change = change;
                            await card.save();
                            return res.status(200).json({ mess: "Update success!", Card: card, Img: newImg })
                        }
                    } else {
                        card.telco = telco;
                        card.change = change;
                        await card.save().then((newCard) => {
                            return res.status(200).json({ mess: "Update success!", Card: newCard })
                        });

                    }
                } else {
                    return res.status(404).json({ error: "Cards not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
    },
    Data: {
        GetAll: async (req, res) => {
            try {
                const listUsers = await Users.findAll({
                    where: {
                        admin: false
                    }
                });
                const listChangeCards = await Products.findAll({
                    where: {
                        command: "change"
                    },
                    include: [{ model: Users }, { model: Prices, include: [{ model: Cards }, { model: Values }] }]
                });

                const listBuyCards = await Products.findAll({
                    where: {
                        command: "buy"
                    },
                    include: [{ model: Users }, { model: Prices, include: [{ model: Cards }, { model: Values }] }]
                });

                return res.status(200).json({
                    Users: listUsers,
                    ChangeCards: listChangeCards,
                    BuyCards: listBuyCards
                })
            } catch (error) {
                return res.status(500).json(err);
            }
        }
    },
    Banks: {
        Add: async (req, res) => {
            const { name, sign } = req.body;
            try {
                const oldBank = await Banks.findOne({
                    where: {
                        [Op.and]: [
                            { name: name },
                            { sign: sign }
                        ]
                    }
                });
                if (oldBank) {
                    return res.status(400).json({ error: "Bank already exits!" })
                } else {
                    await Banks.create({
                        name: name,
                        sign: sign
                    });
                    return res.status(201).json({ mess: "Add success!" })
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Edit: async (req, res) => {
            const { id } = req.query;
            const { name, sign } = req.body;
            try {
                const bank = await Banks.findOne({
                    where: {
                        id: id
                    }
                });
                if (bank) {
                    bank.name = name;
                    bank.sign = sign;
                    await bank.save();
                    return res.status(200).json({ mess: "Edit success!" })
                } else {
                    return res.status(404).json({ error: "Bank not found!" })
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {
                const bank = await Banks.findOne({
                    where: {
                        id: id
                    }
                });
                if (bank) {
                    await BankOfUsers.destroy({
                        where: {
                            idBank: bank.id
                        }
                    })
                    await bank.destroy();
                    return res.status(200).json({ mess: "Delete success!" })
                } else {
                    return res.status(404).json({ error: "Bank not found!" })
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        }
    }
};

module.exports = {
    ControllAdmin
}