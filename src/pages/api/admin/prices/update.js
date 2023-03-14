import { AdminPricesController } from "data/controller/admin/price"

export default async function ApiPrice(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Update prices" })
    } else if (req.method === "PUT") {
        await AdminPricesController.Update(req, res)
    }
}