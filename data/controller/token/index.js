import jwt from "jsonwebtoken"
import db from "../../db/models"
import {CreateAccessToken, CreateRefreshToken} from "../../token"

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
export const TokenController = {
    RefreshToken: async (req, res) => {
        const {refreshToken} = req.cookies

        try {
            if (!refreshToken) {
                return res.status(401).json({error: "Bạn chưa đăng nhập!"})
            } else {
                const oldRefreshToken = await RefreshTokens.findOne({
                    where: {
                        refreshToken: refreshToken,
                    },
                })
                if (oldRefreshToken) {
                    jwt.verify(
                        oldRefreshToken.refreshToken,
                        process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY,
                        async (err, user) => {
                            if (err) {
                                return res.status(500).json(err)
                            } else {
                                const newAccessToken = CreateAccessToken(user)
                                const newRefreshToken = CreateRefreshToken(user)

                                oldRefreshToken.refreshToken = newRefreshToken
                                await oldRefreshToken.save()
                                res.cookie("refreshToken", newRefreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    path: "/",
                                    sameSite: "strict",
                                    maxAge: 60 * 1000 * 60 * 24,
                                })

                                return res
                                    .status(200)
                                    .json({accessToken: newAccessToken})
                            }
                        }
                    )
                } else {
                    return res
                        .status(403)
                        .json({error: "Refresh Token is not valid!"})
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
