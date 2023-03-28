import nextConnect from "next-connect"
import {DataAdminController} from "../../../../../data/controller/admin/data"

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

apiRoute.get(DataAdminController.LoadingData)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
