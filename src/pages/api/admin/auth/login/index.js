import nextConnect from "next-connect"
import {AdminAuthController} from "../../../../../../data/controller/admin/auth"

const handler = nextConnect()

handler.get((req, res) => {
    return res.status(200).json({mess: "Hello from API"})
})

handler.post(AdminAuthController.Authen.Login)

export const config = {
    api: {
        bodyParser: true,
    },
}

export default handler
