import nextConnect from "next-connect"
import {ApiConnectionController} from "../../../../../data/controller/apiConnection"
import {CheckPartner} from "../../../../../data/middleware/ConnectApi"

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

apiRoute.get(CheckPartner, ApiConnectionController.Price.GetPrice)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
