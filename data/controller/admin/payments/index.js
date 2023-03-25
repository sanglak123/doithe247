import { BankOfUsers, Banks, Imgs, Payments, ReceiveBanks, Users } from "data/db/models";

export const PaymentAdminController = {
    HandlePayment: async (req, res) => {
        const { id } = req.query;
        const { status } = req.body;
        try {
            const payment = await Payments.findOne({
                where: {
                    id: id
                },
                include: [
                    { model: Users },
                    { model: BankOfUsers, include: [{ model: Banks }] },
                    { model: ReceiveBanks, include: [{ model: Banks }] },
                ]
            });
            if (payment) {
                if (payment.status === "Pending") {
                    const user = await Users.findOne({
                        where: {
                            id: payment.idUser
                        }
                    });
                    if (user) {
                        payment.status = status;
                        await payment.save().then(async () => {
                            if (status === "Success") {
                                user.surplus = Number(payment.amount) + Number(user.surplus);
                                await user.save()
                                return res.status(200).json({ mess: "Xác nhận thành công!" })
                            } else if (status === "Error") {
                                return res.status(200).json({ mess: "Hủy lệnh thành công!" })
                            }
                        })
                    } else {
                        return res.status(404).json({ error: "User not found!" })
                    }
                } else {
                    return res.status(400).json({ error: "Lệnh đã được xác nhận trước đó!" })
                }

            } else {
                return res.status(404).json({ error: "Không tìm thấy lệnh trên hệ thống!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Refills: {
        GetAll: async (req, res) => {
            try {
                const list = await Payments.findAll({
                    where: {
                        command: "refill"
                    },
                    include: [
                        { model: ReceiveBanks, include: [{ model: Banks }] },
                        { model: BankOfUsers, include: [{ model: Banks }] },
                        { model: Users },
                        { model: Imgs }
                    ],
                    order: [["id", "desc"]]
                });
                return res.status(200).json({ Refills: list });
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Withdraws: {
        GetAll: async (req, res) => {
            try {
                const list = await Payments.findAll({
                    where: {
                        command: "withdraw"
                    },
                    include: [
                        { model: ReceiveBanks, include: [{ model: Banks }] },
                        { model: BankOfUsers, include: [{ model: Banks }] },
                        { model: Users },
                        { model: Imgs }
                    ],
                    order: [["id", "desc"]]
                });
                return res.status(200).json({ Withdraws: list });
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        PayWithdraw: async (req, res) => {
            const { id } = req.query;
            try {
                const withdraw = await Payments.findOne({
                    where: {
                        id: id
                    }
                });
                if (withdraw) {
                    if (withdraw.status === "Pending") {
                        withdraw.status = "Success";
                        await withdraw.save();
                        return res.status(200).json({ mess: "Cập nhật thành công!" });
                    } else {
                        return res.status(400).json({ error: "Lệnh rút tiền đã được xác thực!" })
                    }
                } else {
                    return res.status(404).json({ error: "Lệnh rút tiền không tồn tại!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Banks: {
        Edit: async (req, res) => {

        },
        Delete: async (req, res) => {

        }
    }
}

