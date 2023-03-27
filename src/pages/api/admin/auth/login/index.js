// import { AdminAuthController } from "data/controller/admin/auth";
// import nextConnect from "next-connect";

// const apiRoute = nextConnect({
//     onError(error, req, res) {
//         res
//             .status(501)
//             .json({ error: `Sorry something Happened! ${error.message}` });
//     },
//     onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
// });

// apiRoute.post(AdminAuthController.Authen.Login);

// export default apiRoute;

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

import { AdminAuthController } from "data/controller/admin/auth";
import nc from "next-connect";

const handler = nc()
    .put(AdminAuthController.Authen.Login)
    .patch(async (req, res) => {
        throw new Error("Throws me around! Error can be caught and handled.");
    });

export default handler;

