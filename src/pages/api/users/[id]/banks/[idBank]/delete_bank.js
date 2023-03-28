import nextConnect from "next-connect"
import {UserPaymentController} from "../../../../../../../data/controller/user/payments"
import {CheckLogin} from "../../../../../../../data/middleware"

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
    const {id, idBank} = req.query
    return res.status(200).json({IdUser: id, idBank: idBank, Action: "Delete"})
})

apiRoute.put(CheckLogin, UserPaymentController.BankOfUsers.Delete)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
