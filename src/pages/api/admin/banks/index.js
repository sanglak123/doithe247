import { ControllAdmin } from "data/controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Add banks" })
    } else if (req.method === "POST") {
        await ControllAdmin.Banks.Add(req, res)
    }
}