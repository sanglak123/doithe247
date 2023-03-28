import multer from "multer"
import nextConnect from "next-connect"
import {UserPaymentController} from "../../../../../../../data/controller/user/payments"

const d = new Date()
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            return cb(null, "./public/img/payments")
        },
        filename: (req, file, cb) => {
            const fileName =
                "Hag_" +
                d.getTime() +
                "_" +
                file.originalname.toLowerCase().split(" ").join("-")
            cb(null, fileName)
        },
    }),
})
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
    const {id} = req.query
    return res.status(200).json({idUser: id, Action: `create_refills`})
})

apiRoute.use(upload.single("photo"))
apiRoute.post(UserPaymentController.Refills.Create)

export default apiRoute

export const config = {
    api: {
        bodyParser: true,
    },
}
