import { ControllAdmin } from "data/controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Add banks" })
    } else if (req.method === "PUT") {
        await ControllAdmin.Banks.Edit(req, res)
    } else if (req.method === "DELETE") {
        await ControllAdmin.Banks.Delete(req, res)
    }
}