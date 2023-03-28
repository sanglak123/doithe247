import nextConnect from "next-connect"
import {UserDataController} from "../../../../data/controller/user/data"

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

apiRoute.get(UserDataController.LoadingData)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
