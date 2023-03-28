import bcryptjs from "bcryptjs"
import path from "path"
import fs from "fs"
import axios from "axios"
import {Op} from "sequelize"
import {
    Users,
    BankOfUsers,
    Banks,
    Cards,
    Imgs,
    Prices,
    Products,
    RefreshTokens,
    TypeCards,
    Values,
} from "../../../db/models"
import {serialize} from "cookie"
import {CreateAccessToken, CreateRefreshToken} from "../../../token"

export const AdminAuthController = {
    Authen: {
        Login: async (req, res) => {
            const {userName, pass, pass2, keyAdmin} = req.body
            try {
                const admin = await Users.findOne({
                    where: {
                        userName: userName,
                    },
                    include: [{model: Imgs}],
                })

                if (admin) {
                    if (admin.admin) {
                        if (bcryptjs.compareSync(pass, admin.pass)) {
                            if (bcryptjs.compareSync(pass2, admin.pass2)) {
                                if (
                                    keyAdmin ===
                                    process.env.NEXT_PUBLIC_KEY_ADMIN
                                ) {
                                    const newAccessToken =
                                        CreateAccessToken(admin)
                                    const newRefreshToken =
                                        CreateRefreshToken(admin)

                                    const [refreshtoken, created] =
                                        await RefreshTokens.findOrCreate({
                                            where: {
                                                idUser: admin.id,
                                            },
                                        })
                                    if (!created) {
                                        refreshtoken.refreshToken =
                                            newRefreshToken
                                        await refreshtoken.save()
                                        res.setHeader(
                                            "Set-Cookie",
                                            serialize(
                                                "refreshToken",
                                                newRefreshToken,
                                                {
                                                    httpOnly: true,
                                                    secure: true,
                                                    path: "/",
                                                    sameSite: "strict",
                                                    maxAge: 60 * 1000 * 60 * 24,
                                                }
                                            )
                                        )

                                        admin.pass = null
                                        admin.pass2 = null
                                        const str =
                                            admin.wallet_number.split(" ")[1]
                                        admin.wallet_number = str
                                        return res.status(200).json({
                                            User: admin,
                                            accessToken: newAccessToken,
                                            Online: true,
                                            mess: "Login success!",
                                        })
                                    } else {
                                        refreshtoken.set({
                                            idUser: admin.id,
                                            refreshToken: newRefreshToken,
                                        })
                                        await refreshtoken.save()
                                        admin.pass = null
                                        admin.pass2 = null
                                        return res.status(200).json({
                                            User: admin,
                                            accessToken: newAccessToken,
                                            Online: true,
                                            mess: "Login success!",
                                        })
                                    }
                                } else {
                                    return res.status(404).json({
                                        error: "Key admin không chính xác!",
                                    })
                                }
                            } else {
                                return res.status(404).json({
                                    error: "Mật khẩu cấp 1 không chính xác!",
                                })
                            }
                        } else {
                            return res.status(404).json({
                                error: "Mật khẩu cấp 1 không chính xác!",
                            })
                        }
                    } else {
                        return res
                            .status(403)
                            .json({error: "Không có quyền truy cập!"})
                    }
                } else {
                    return res.status(404).json({error: "Admin không tồn tại!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Register: async (req, res) => {
            const {
                userName,
                displayName,
                fullName,
                adress,
                pass,
                pass2,
                email,
                phone,
                key,
            } = req.body
            try {
                if (key === process.env.NEXT_PUBLIC_KEY_ADMIN) {
                    const oldAdmin = await Users.findOne({
                        where: {
                            userName: userName,
                        },
                    })
                    if (oldAdmin) {
                        return res
                            .status(400)
                            .json({error: "Username already exits!"})
                    } else {
                        const salt = bcryptjs.genSaltSync(15)
                        const salt2 = bcryptjs.genSaltSync(17)
                        const newPass = bcryptjs.hashSync(pass, salt)
                        const newPass2 = bcryptjs.hashSync(pass2, salt2)
                        const wallet_number = "Hga " + new Date().getTime()
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
                            wallet_number: wallet_number,
                        })
                        return res.status(201).json({mess: "Register success!"})
                    }
                } else {
                    return res.status(403).json({error: "Your are not admin!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        EditProfile: async (req, res) => {
            const {id} = req.query
            const {displayName, fullName, phone, adress, email} = req.body

            try {
                const admin = await Users.findOne({
                    where: {
                        id: id,
                    },
                    include: [{model: Imgs}],
                })
                if (admin) {
                    if (req.file) {
                        const baseURL = req.protocol + "://" + req.get("host")
                        const pathImage =
                            baseURL + "/img/avatar/" + req.file.filename
                        const oldAvatar = await Imgs.findOne({
                            where: {
                                id: admin.avatar,
                            },
                        })
                        if (oldAvatar) {
                            const unLoad = path.join(
                                __dirname,
                                "../../../../../public/img/avatar/"
                            )
                            fs.unlink(
                                unLoad + oldAvatar.fileName,
                                async err => {
                                    if (err) {
                                        return res.status(500).json(err)
                                    } else {
                                        oldAvatar.path = pathImage
                                        oldAvatar.fileName = req.file.filename
                                        await oldAvatar.save()

                                        admin.displayName = displayName
                                        admin.fullName = fullName
                                        admin.phone = phone
                                        admin.adress = adress
                                        admin.avatar = oldAvatar.id
                                        admin.email = email
                                        await admin.save()

                                        const adminResult = await Users.findOne(
                                            {
                                                where: {
                                                    id: id,
                                                },
                                                include: [{model: Imgs}],
                                            }
                                        )
                                        adminResult.pass = null
                                        adminResult.pass2 = null
                                        return res.status(200).json({
                                            mess: "Update success!",
                                            User: adminResult,
                                        })
                                    }
                                }
                            )
                        } else {
                            const Avatar = await Imgs.create({
                                fileName: req.file.filename,
                                path: pathImage,
                            })

                            admin.displayName = displayName
                            admin.fullName = fullName
                            admin.phone = phone
                            admin.adress = adress
                            admin.avatar = Avatar.id
                            admin.email = email
                            await admin.save()

                            const adminResult = await Users.findOne({
                                where: {
                                    id: id,
                                },
                                include: [{model: Imgs}],
                            })
                            adminResult.pass = null
                            adminResult.pass2 = null
                            return res.status(200).json({
                                mess: "Update success!",
                                User: adminResult,
                            })
                        }
                    } else {
                        admin.displayName = displayName
                        admin.fullName = fullName
                        admin.phone = phone
                        admin.adress = adress
                        admin.email = email
                        await admin.save()
                        const adminResult = await Users.findOne({
                            where: {
                                id: id,
                            },
                            include: [{model: Imgs}],
                        })
                        adminResult.pass = null
                        adminResult.pass2 = null
                        return res.status(200).json({
                            mess: "Update success!",
                            User: adminResult,
                        })
                    }
                } else {
                    return res.status(404).json({error: "Admin not found!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Logout: async (req, res) => {},
    },
    Prices: {
        Update: async (req, res) => {
            try {
                await axios({
                    method: "GET",
                    url: "https://doithe1s.vn/chargingws/v2/getfee?partner_id=6155991561",
                })
                    .then(async responsive => {
                        const data = responsive.data
                        for (let index = 0; index < data.length; index++) {
                            const telcoData = data[index].telco
                            const valueData = data[index].value
                            const feesChangeData = data[index].fees

                            const card = await Cards.findOne({
                                where: {
                                    telco: telcoData,
                                },
                            })
                            const value = await Values.findOne({
                                where: {
                                    name: valueData,
                                },
                            })
                            const oldPrice = await Prices.findOne({
                                where: {
                                    [Op.and]: [
                                        {idCard: card.id},
                                        {idValue: value.id},
                                    ],
                                },
                            })
                            const discount = process.env.NEXT_PUBLIC_DISCOUNT
                            if (oldPrice) {
                                oldPrice.feesChange =
                                    parseFloat(feesChangeData) +
                                    parseFloat(discount)
                                await oldPrice.save()
                            } else {
                                await Prices.create({
                                    idCard: card.id,
                                    idValue: value.id,
                                    feesChange:
                                        parseFloat(feesChangeData) +
                                        parseFloat(discount),
                                })
                            }
                        }
                        const listPrice = await Prices.findAll({
                            include: [{model: Cards}, {model: Values}],
                        })
                        return res.status(200).json({
                            Prices: listPrice,
                            mess: "Update success!",
                        })
                    })
                    .catch(err => {
                        return res.status(500).json(err)
                    })
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        EditFeesBuy: async (req, res) => {
            const {id} = req.query
            const {feesBuy} = req.body
            try {
                const price = await Prices.findOne({
                    where: {
                        id: id,
                    },
                })
                if (price) {
                    price.feesBuy = feesBuy
                    await price.save()
                    return res.status(200).json({mess: "Update success!"})
                } else {
                    return res.status(404).json({error: "Price not found!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Add: async (req, res) => {
            const {idCard, idValue, feesChange, feesBuy} = req.body
            try {
                const oldPrice = await Prices.findOne({
                    where: {
                        [Op.and]: [{idCard: idCard}, {idValue: idValue}],
                    },
                })
                if (oldPrice) {
                    return res.status(400).json({
                        error: "Price already exits! Please choose update price",
                    })
                } else {
                    await Prices.create({
                        idCard: idCard,
                        idValue: idValue,
                        feesChange: feesChange,
                        feesBuy: feesBuy,
                    })
                    return res.status(201).json({mess: "Add success!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
    },
    Cards: {
        Add: async (req, res) => {
            try {
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Delete: async (req, res) => {
            const {id} = req.query
            try {
                const card = await Cards.findOne({
                    where: {
                        id: id,
                    },
                })
                if (card) {
                    const price = await Prices.findOne({
                        where: {
                            idCard: card.id,
                        },
                    })
                    if (price) {
                        await Products.destroy({
                            where: {
                                idPrice: price.id,
                            },
                        })
                        await Prices.destroy({
                            where: {
                                idCard: card.id,
                            },
                        })
                        await card.destroy()
                        return res.status(200).json({mess: "Delete success!"})
                    } else {
                        await card.destroy()
                        return res
                            .status(200)
                            .json({mess: "Delete success!", price})
                    }
                } else {
                    return res.status(404).json({error: "Card not found!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Edit: async (req, res) => {
            const {id} = req.query
            const {telco, change} = req.body
            try {
                const card = await Cards.findOne({
                    where: {
                        id: id,
                    },
                    include: [{model: Imgs}, {model: TypeCards}],
                })
                if (card) {
                    if (req.file) {
                        const baseURL = req.protocol + "://" + req.get("host")
                        const pathImage =
                            baseURL + "/img/logo/" + req.file.filename
                        const oldImg = await Imgs.findOne({
                            where: {
                                id: card.img,
                            },
                        })
                        if (oldImg) {
                            //Có ảnh củ = > xóa ảnh => thêm mới ảnh = > save
                            const unLoad = path.join(
                                __dirname,
                                "../../../../../../public/img/logo/"
                            )
                            fs.unlink(unLoad + oldImg.fileName, async err => {
                                if (err) {
                                    return res.status(500).json(err)
                                } else {
                                    oldImg.fileName = req.file.filename
                                    oldImg.path = pathImage
                                    await oldImg.save().then(async newImg => {
                                        card.telco = telco
                                        card.img = newImg.id
                                        card.change = change
                                        await card.save().then(newCard => {
                                            return res.status(200).json({
                                                mess: "Update success!",
                                                Card: newCard,
                                                Img: newImg,
                                            })
                                        })
                                    })
                                }
                            })
                        } else {
                            const newImg = await Imgs.create({
                                fileName: req.file.filename,
                                path: pathImage,
                            })
                            card.telco = telco
                            card.img = newImg.id
                            card.change = change
                            await card.save()
                            return res.status(200).json({
                                mess: "Update success!",
                                Card: card,
                                Img: newImg,
                            })
                        }
                    } else {
                        card.telco = telco
                        card.change = change
                        await card.save().then(newCard => {
                            return res.status(200).json({
                                mess: "Update success!",
                                Card: newCard,
                            })
                        })
                    }
                } else {
                    return res.status(404).json({error: "Cards not found!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
    },
    Data: {
        GetAll: async (req, res) => {
            try {
                const listUsers = await Users.findAll({
                    where: {
                        admin: false,
                    },
                })
                const listChangeCards = await Products.findAll({
                    where: {
                        command: "change",
                    },
                    include: [
                        {model: Users},
                        {
                            model: Prices,
                            include: [{model: Cards}, {model: Values}],
                        },
                    ],
                })

                const listBuyCards = await Products.findAll({
                    where: {
                        command: "buy",
                    },
                    include: [
                        {model: Users},
                        {
                            model: Prices,
                            include: [{model: Cards}, {model: Values}],
                        },
                    ],
                })

                return res.status(200).json({
                    Users: listUsers,
                    ChangeCards: listChangeCards,
                    BuyCards: listBuyCards,
                })
            } catch (error) {
                return res.status(500).json(error)
            }
        },
    },
    Banks: {
        Add: async (req, res) => {
            const {name, sign} = req.body
            try {
                const oldBank = await Banks.findOne({
                    where: {
                        [Op.and]: [{name: name}, {sign: sign}],
                    },
                })
                if (oldBank) {
                    return res.status(400).json({error: "Bank already exits!"})
                } else {
                    await Banks.create({
                        name: name,
                        sign: sign,
                    })
                    return res.status(201).json({mess: "Add success!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Edit: async (req, res) => {
            const {id} = req.query
            const {name, sign} = req.body
            try {
                const bank = await Banks.findOne({
                    where: {
                        id: id,
                    },
                })
                if (bank) {
                    bank.name = name
                    bank.sign = sign
                    await bank.save()
                    return res.status(200).json({mess: "Edit success!"})
                } else {
                    return res.status(404).json({error: "Bank not found!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Delete: async (req, res) => {
            const {id} = req.query
            try {
                const bank = await Banks.findOne({
                    where: {
                        id: id,
                    },
                })
                if (bank) {
                    await BankOfUsers.destroy({
                        where: {
                            idBank: bank.id,
                        },
                    })
                    await bank.destroy()
                    return res.status(200).json({mess: "Delete success!"})
                } else {
                    return res.status(404).json({error: "Bank not found!"})
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
    },
}
