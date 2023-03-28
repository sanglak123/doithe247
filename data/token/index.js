const jwt = require("jsonwebtoken")

export const CreateAccessToken = user => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            admin: user.admin,
        },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
        {expiresIn: "300s"}
    )
}

export const CreateRefreshToken = user => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            admin: user.admin,
        },
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY,
        {expiresIn: "23h"}
    )
}

export const CreatePartnerID = user => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            privateKey: process.env.NEXT_PUBLIC_KEY_PARTNER_ID_VERIFY,
        },
        process.env.NEXT_PUBLIC_KEY_PARTNER_ID
    )
}
