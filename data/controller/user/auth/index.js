import CryptoJS from "crypto-js"
import fs from "fs"
import path from "path"
import {serialize} from "cookie"
import db from "../../../db/models"
import {smtpTransport} from "../../../sendMail"
import {CreateAccessToken, CreateRefreshToken} from "../../../token"

const {
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
    Events,
    Payments,
    Promotions,
    ReceiveBanks,
} = db
const bcryptjs = require("bcryptjs")

export const UserControllerAuthen = {
    Login: async (req, res) => {
        const {userName, pass} = req.body
        try {
            const user = await Users.findOne({
                where: {
                    userName: userName,
                },
                include: [{model: Imgs}],
            })
            if (user) {
                if (bcryptjs.compareSync(pass, user.pass)) {
                    const newAccessToken = CreateAccessToken(user)
                    const newRefreshToken = CreateRefreshToken(user)

                    const [refreshtoken, created] =
                        await RefreshTokens.findOrCreate({
                            where: {
                                idUser: user.id,
                            },
                        })
                    if (!created) {
                        refreshtoken.refreshToken = newRefreshToken
                        await refreshtoken.save()
                        res.setHeader(
                            "Set-Cookie",
                            serialize("refreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: "strict",
                                maxAge: 60 * 1000 * 60 * 24,
                            })
                        )

                        user.pass = null
                        user.pass2 = null
                        const str = user.wallet_number.split(" ")[1]
                        user.wallet_number = str
                        return res.status(200).json({
                            User: user,
                            accessToken: newAccessToken,
                            Online: true,
                            mess: "Login success!",
                        })
                    } else {
                        refreshtoken.set({
                            idUser: user.id,
                            refreshToken: newRefreshToken,
                        })
                        await refreshtoken.save()
                        user.pass = null
                        user.pass2 = null
                        res.setHeader(
                            "Set-Cookie",
                            serialize("refreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: "strict",
                                maxAge: 60 * 1000 * 60 * 24,
                            })
                        )
                        return res.status(200).json({
                            User: user,
                            accessToken: newAccessToken,
                            Online: true,
                            mess: "Login success!",
                        })
                    }
                } else {
                    return res.status(404).json({error: "Pass wrong!"})
                }
            } else {
                return res.status(404).json({error: "User not found!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    Register: async (req, res) => {
        const {userName, pass, pass2, phone, email} = req.body
        try {
            if (userName !== "" || pass !== "") {
                const [user, created] = await Users.findOrCreate({
                    where: {
                        userName: userName,
                    },
                })
                if (!created) {
                    return res.status(400).json({error: "Username đã tồn tại!"})
                } else {
                    const salt = bcryptjs.genSaltSync(10)
                    const salt2 = bcryptjs.genSaltSync(11)
                    const newPass = bcryptjs.hashSync(pass, salt)
                    const newPass2 = bcryptjs.hashSync(pass2, salt2)
                    const wallet_number = "Hga " + new Date().getTime()

                    user.set({
                        phone: phone + "$$block",
                        email: email + "$$block",
                        pass: newPass,
                        pass2: newPass2,
                        wallet_number: wallet_number,
                    })
                    await user.save()
                    const partner_key = CreatePartnerID(user)
                    user.partner_key = partner_key
                    await user.save()
                    user.pass = null
                    user.pass2 = null
                    user.wallet_number = str
                    return res
                        .status(201)
                        .json({mess: "Register success", user: user})
                }
            } else {
                return res.status(400).json({error: "No data"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    Logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken")
            return res.end()
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    RefreshUser: async (req, res) => {
        const {id} = req.query
        try {
            const user = await Users.findOne({
                where: {
                    id: id,
                },
                include: [{model: Imgs}],
            })
            if (user) {
                user.pass = null
                user.pass2 = null
                return res.status(200).json({User: user})
            } else {
                return res.status(404).json({error: "User không tồn tại!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    SendAuthEmail: async (req, res) => {
        const {id} = req.query
        try {
            const user = await Users.findOne({
                where: {
                    id: id,
                },
            })
            if (user) {
                // SendEmail
                const hashEmail = CryptoJS.AES.encrypt(
                    user.email,
                    process.env.NEXT_PUBLIC_KEY_EMAIL
                )
                const mailOptions = {
                    from: process.env.NEXT_PUBLIC_OWNER_EMAIL,
                    to: user.email.split("$$")[0],
                    subject: "XÁC THỰC EMAIL DOITHE247",
                    generateTextFromHTML: true,
                    html: `
                    <!DOCTYPE html>
                    <html>
                    
                    <head>
                        <style>
                            .colored {
                                color: white;
                            }
                    
                            #body {
                                font-size: 16px;
                                position: relative;          
                            }
                    
                            .mail_content {
                                width: 35%;           
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, 100%);
                                background-color: #000000d2;
                                padding: 20px;
                                border-radius: 7px;
                                color: white;
                            }
                    
                            .logo {
                                text-align: center;
                                transform: scale(0.95);
                                transition: 0.5s;
                            }
                    
                            .logo:hover {
                                transform: scale(1);
                            }
                    
                            .logo_name {
                                font-family: "Anton";
                                padding: 0;
                                margin-bottom: -10px;
                                font-size: 30px;
                                line-height: 40px;
                                letter-spacing: 5px;
                                text-transform: uppercase;
                                background: linear-gradient(to right, #30CFD0 0%, #330867 100%);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }
                    
                            .logo_web {
                                text-align: center;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                font-weight: 700;
                                font-size: 14px;
                                font-style: italic;
                                letter-spacing: 2px;
                                font-weight: 200;
                                color: rgb(121, 121, 121);
                            }
                    
                            .logo_small {
                                font-size: 20px;
                                font-weight: bold;
                            }
                            .sign{
                                background-color: #330867;
                                color: white;
                                padding: 15px;
                            }
                        </style>
                    </head>
                    
                    <body>
                        <div id='body'>
                            <div class="mail_content">
                                <div class="logo">
                                    <h1 class="logo_name">DOITHE247</h1>
                                    <span class="logo_web">www.doithe247.com.vn</span>
                                </div>
                                <p>Xác thực email tại <span class="logo_small">DOITHE247</span></p>
                                <p class='colored'>Mã Xác thực: <span class="sign">${hashEmail}</span></p>          
                            </div>
                    
                        </div>
                    </body>
                    
                    </html>
                        `,
                }
                smtpTransport.sendMail(mailOptions, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: `Địa chỉ email ${email} không hợp lệ !`,
                            email: user.email.split("$$")[0],
                        })
                    } else {
                        return res.status(200).json({
                            mess: "Email xác thực đã được gửi đi. Vui lòng kiểm tra hòm thư.",
                            data: result,
                        })
                    }
                })
            } else {
                return res.status(404).json({error: "User không tồn tại!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    AccessAuthEmail: async (req, res) => {
        const {email} = req.query
        try {
            var decrypted = CryptoJS.AES.decrypt(
                email,
                process.env.NEXT_PUBLIC_KEY_EMAIL
            )
            const rightEmail = decrypted.toString(CryptoJS.enc.Utf8)
            const user = await Users.findOne({
                where: {
                    email: rightEmail,
                },
            })
            if (user) {
                const auth = rightEmail.split("$$")
                if (auth === "block") {
                    user.email = rightEmail.split("$$")[0] + "$$active"
                    await user.save().then(() => {
                        return res
                            .status(200)
                            .json({mess: "Xác thực thành công!", user: user})
                    })
                } else {
                    return res
                        .status(400)
                        .json({error: "Email đã được xác thực."})
                }
            } else {
                return res
                    .status(404)
                    .json({error: "Địa chỉ email không tồn tại trên hệ thống!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    //Profile
    ChangeAvatar: async (req, res) => {
        const {id} = req.query
        try {
            if (req.file) {
                const baseURL = req.protocol + "://" + req.get("host")
                const pathImage = baseURL + "/img/avatar/" + req.file.filename
                const user = await Users.findOne({
                    where: {
                        id: id,
                    },
                })
                if (user) {
                    const oldImg = await Imgs.findOne({
                        where: {
                            id: user.avatar,
                        },
                    })
                    if (oldImg) {
                        const unLoad = path.join(
                            __dirname,
                            "../../../../../../../public/img/avatar/"
                        )
                        fs.unlink(unLoad + oldImg.fileName, async err => {
                            if (err) {
                                return res.status(500).json(err)
                            } else {
                                oldImg.fileName = req.file.filename
                                oldImg.path = pathImage
                                await oldImg.save()
                                return res
                                    .status(201)
                                    .json({mess: "Cập nhật thành công!"})
                            }
                        })
                    } else {
                        const newImg = await Imgs.create({
                            fileName: req.file.filename,
                            path: pathImage,
                        })
                        user.avatar = newImg.id
                        await user.save()
                        return res
                            .status(201)
                            .json({mess: "Cập nhật thành công!"})
                    }
                } else {
                    return res.status(404).json({error: "User không tồn tại!"})
                }
            } else {
                return res
                    .status(400)
                    .json({error: "Không tìm thấy file đính kèm!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    ChangeInfomation: async (req, res) => {
        try {
        } catch (error) {}
    },
}
