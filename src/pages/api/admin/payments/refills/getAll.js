import nextConnect from "next-connect"
import {PaymentAdminController} from "../../../../../../data/controller/admin/payments"
import {CheckAdmin} from "../../../../../../data/middleware"

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

apiRoute.get(CheckAdmin, PaymentAdminController.Refills.GetAll)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
