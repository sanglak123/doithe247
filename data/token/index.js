const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const d = new Date()
const CreateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        admin: user.admin
    },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "300s" })
};

const CreateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        admin: user.admin
    },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "23h" })
};

const CreatePartnerID = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        privateKey: process.env.KEY_PARTNER_ID_VERIFY
    },
        process.env.KEY_PARTNER_ID
    )
}

module.exports = {
    CreateAccessToken,
    CreateRefreshToken,
    CreatePartnerID
}