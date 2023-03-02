import { BankOfUsers, Banks, Payments, ReceiveBanks, Users } from "data/db/models";

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
                const user = await Users.findOne({
                    where: {
                        id: payment.idUser
                    }
                });
                if (user) {
                    payment.status = status;                   
                    await payment.save().then(async (newPayment) => {
                        if (status === "Success") {
                            user.surplus = Number(payment.amount) + Number(user.surplus);
                            await user.save()
                            return res.status(200).json({ mess: "Xác nhận thành công!", Payment: newPayment })
                        } else if (status === "Error") {
                            return res.status(200).json({ mess: "Hủy lệnh thành công!", Payment: newPayment })
                        }
                    })
                } else {
                    return res.status(404).json({ error: "User not found!" })
                }

            } else {
                return res.status(404).json({ error: "Không tìm thấy lệnh trên hệ thống!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}