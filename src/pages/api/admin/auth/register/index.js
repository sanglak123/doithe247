import nextConnect from "next-connect"
import {AdminAuthController} from "../../../../../../data/controller/admin/auth"

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        })
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`})
    },
})

apiRoute.get((req, res) => {
    return res.status(200).json({mess: "Edit Profile Admin"})
})

apiRoute.post(AdminAuthController.Authen.Register)

export default apiRoute

export const config = {
    api: {
        bodyParser: false,
    },
}
