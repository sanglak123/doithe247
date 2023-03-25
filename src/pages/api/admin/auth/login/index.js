import { AdminAuthController } from "data/controller/admin/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await AdminAuthController.Authen.Login(req, res);
    }
}