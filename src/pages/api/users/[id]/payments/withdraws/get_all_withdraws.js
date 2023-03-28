import nextConnect from "next-connect"
import {UserPaymentController} from "../../../../../../../data/controller/user/payments"

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

apiRoute.get(UserPaymentController.Withdraws.GetAll)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
