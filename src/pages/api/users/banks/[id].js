import { UserControllerPayments } from "data/controller/user/payments";
import { CheckLogin } from "data/middleware";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.put(CheckLogin, UserControllerPayments.Bank.Edit);

apiRoute.delete(CheckLogin, UserControllerPayments.Bank.Delete);


export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};