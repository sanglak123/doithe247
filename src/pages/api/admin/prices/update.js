import { ControllAdmin } from "data/controller/admin"

export default async function ApiPrice(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Update prices" })
    } else if (req.method === "PUT") {
        await ControllAdmin.Prices.Update(req, res)
    }
}