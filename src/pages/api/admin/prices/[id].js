import { ControllAdmin } from "data/controller/admin";
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

apiRoute.get((req, res) => {
    const { id } = req.query;
    return res.status(200).json({ mess: `Edit FeesBuy ID: ${id}` })
});

apiRoute.put(ControllAdmin.Prices.EditFeesBuy)

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};