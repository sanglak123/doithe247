import { UserControllerAuthen } from "data/controller/user/auth";
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

apiRoute.get(UserControllerAuthen.RefreshUser);

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};