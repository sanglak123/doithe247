import {PaymentAdminController} from "../../../../../data/controller/admin/payments"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({mess: "Add banks"})
    } else if (req.method === "POST") {
        await PaymentAdminController.Banks.Add(req, res)
    }
}
