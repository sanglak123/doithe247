import { EventsAdminController } from "data/controller/admin/events";
import { CheckAdmin } from "data/middleware";
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
    return res.status(200).json({ mess: "Create Events" })
});

apiRoute.post(CheckAdmin, EventsAdminController.Create)


export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};