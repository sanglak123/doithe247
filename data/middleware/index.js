import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const CheckAdmin = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        const accesstoken = token.split(" ")[1];      
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Token không hợp lệ!" })
            } else {
                if (user.admin) {
                    next();
                } else {
                    return res.status(401).json({ error: "Không có quyền truy câp!" })
                }

            }
        })
    } else {
        return res.status(401).json({ error: "Bạn chưa đăng nhập!" })
    }
}

export const CheckLogin = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        const accesstoken = token.split(" ")[1];
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Token không hợp lệ!" })
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        return res.status(401).json({ error: "Bạn chưa đăng nhập!" })
    }
};
