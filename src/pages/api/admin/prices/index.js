import { AdminPricesController } from "data/controller/admin/price"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Add prices!" })
    } else if (req.method === "POST") {
        await AdminPricesController.Add(req, res)
    }
}