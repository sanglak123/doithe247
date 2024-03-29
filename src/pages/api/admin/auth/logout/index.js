import nextConnect from "next-connect"
import {AdminAuthController} from "../../../../../../data/controller/admin/auth"
import {CheckLogin} from "../../../../../../data/middleware"

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
    return res.status(200).json({mess: "Admin logout..."})
})
apiRoute.post(CheckLogin, AdminAuthController.Authen.Logout)

export default apiRoute

export const config = {
    api: {
        bodyParser: false,
    },
}
