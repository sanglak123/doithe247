import nextConnect from "next-connect";
import multer from "multer";
import { ControllAdmin } from "data/controller/admin";
import { AdminControllerCards } from "data/controller/admin/cards";
import { CheckAdmin } from "data/middleware";

const d = new Date();
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            return cb(null, "./public/img/logo")
        },
        filename: (req, file, cb) => {
            const fileName = "HAG_" + d.getTime() + "_" + file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    }),
});

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
    return res.status(200).json({ mess: "Edit Profile Admin" })
});
apiRoute.post(CheckAdmin, AdminControllerCards.OnOffChangeCard);

apiRoute.delete(CheckAdmin, ControllAdmin.Cards.Delete);

apiRoute.use(upload.single("photo"));

apiRoute.put(CheckAdmin, ControllAdmin.Cards.Edit);

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};