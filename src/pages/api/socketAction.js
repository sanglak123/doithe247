export default (req, res) => {
    if (req.method === "POST") {
        const { action, fromUser, toUser } = req.body;

        res?.socket?.server?.io?.emit("Events", {
            action: action, //Success_Refills
            fromUser: fromUser, //User yêu cầu action
            toUser: toUser //User cần thực hiện action
        });
        res.status(201).json({ mess: `Events-${action}-${toUser}` });
    }
};
