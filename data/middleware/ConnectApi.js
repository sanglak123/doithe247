import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const CheckPartner = (req, res, next) => {
    const { partner_id } = req.headers;
    if (partner_id) {
        jwt.verify(partner_id, process.env.NEXT_PUBLIC_KEY_PARTNER_ID, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Partner_id không hợp lệ1!" })
            } else {
                if (user.privateKey === process.env.NEXT_PUBLIC_KEY_PARTNER_ID_VERIFY) {
                    next();
                } else {
                    return res.status(403).json({ error: "Partner_id không hợp lệ2!" })
                }
            }
        })
    } else {
        return res.status(401).json({ error: "Bạn chưa đăng nhập!" })
    }
};