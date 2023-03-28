import nextConnect from "next-connect"
import {UserControllerCards} from "../../../../../data/controller/user/cards"

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

apiRoute.get(UserControllerCards.GetAll)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
