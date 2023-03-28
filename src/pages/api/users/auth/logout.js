import nextConnect from "next-connect"
import {UserControllerAuthen} from "../../../../../data/controller/user/auth"

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

apiRoute.get(UserControllerAuthen.Logout)

export default apiRoute

export const config = {
    api: {
        bodyParser: false,
    },
}
