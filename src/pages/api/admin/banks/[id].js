import {PaymentAdminController} from "../../../../../data/controller/admin/payments"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({mess: "Add banks"})
    } else if (req.method === "PUT") {
        await PaymentAdminController.Banks.Edit(req, res)
    } else if (req.method === "DELETE") {
        await PaymentAdminController.Banks.Delete(req, res)
    }
}
