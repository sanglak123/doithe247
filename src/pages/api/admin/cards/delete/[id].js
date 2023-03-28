import nextConnect from "next-connect"
import {CheckAdmin} from "../../../../../../data/middleware"
import {AdminControllerCards} from "../../../../../../data/controller/admin/cards"

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

apiRoute.delete(CheckAdmin, AdminControllerCards.Edit)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
