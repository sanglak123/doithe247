import { UserControllerPayments } from "data/controller/user/payments";
import { CheckLogin } from "data/middleware";
import multer from "multer";
import nextConnect from "next-connect";

const d = new Date();
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            return cb(null, "./public/img/refill")
        },
        filename: (req, file, cb) => {
            const fileName = "Hag_" + d.getTime() + "_" + file.originalname.toLowerCase().split(' ').join('-');
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

apiRoute.use(upload.single("photo"));
apiRoute.post(CheckLogin, UserControllerPayments.Refill.Create)

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};