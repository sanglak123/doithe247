import { BankOfUsers, Banks, Imgs, Payments, ReceiveBanks, Users } from "data/db/models";
import { Op } from "sequelize";

export const UserPaymentController = {
    Refills: {
        Create: async (req, res) => {
            const { amount, idbankOfUser, idBankPublic, sign } = req.body;
            const { id } = req.query;
            try {
                const user = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                if (user) {
                    const bankUser = await BankOfUsers.findOne({
                        where: {
                            id: idbankOfUser
                        },
                        include: [{ model: Banks }]
                    });
                    if (bankUser) {
                        const bankPublic = await ReceiveBanks.findOne({
                            where: {
                                id: idBankPublic
                            },
                            include: [{ model: Banks }]
                        });
                        if (bankPublic) {
                            if (req.file) {
                                const baseURL = req.protocol + '://' + req.get('host');
                                const pathImage = baseURL + '/img/payment/' + req.file.filename;

                                const [img, createdImg] = await Imgs.findOrCreate({
                                    where: {
                                        path: pathImage
                                    }
                                });
                                if (!createdImg) {
                                    return res.status(400).json({ error: "Image đã tồn tại!", pathImage });
                                } else {
                                    img.set({
                                        fileName: req.file.filename,
                                        path: pathImage
                                    });
                                    await img.save().then(async (newImg) => {
                                        const [refill, created] = await Payments.findOrCreate({
                                            where: {
                                                sign: sign
                                            }
                                        });
                                        if (!created) {
                                            return res.status(400).json({ error: "Lệnh đã được gửi lên vui lòng không spam!" })
                                        } else {
                                            refill.set({
                                                idUser: user.id,
                                                idbankOfUser: idbankOfUser,
                                                idReceiveBank: idBankPublic,
                                                amount: amount,
                                                img: newImg.id,
                                                command: "refill",
                                                sign: sign,
                                                status: "Pending"
                                            });
                                            await refill.save().then(() => {
                                                return res.status(201).json({
                                                    mess: "Tạo lệnh thành công!"
                                                });
                                            })
                                        }
                                    })
                                }

                            } else {
                                return res.status(400).json({ error: "Hình ảnh xác minh không được để trống!" })
                            }

                        } else {
                            return res.status(400).json({ error: "Ngân hàng nhận tiền không chính xác!" })
                        }
                    }
                } else {
                    return res.status(404).json({ error: "User not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Get_All: async (req, res) => {
            const { id } = req.query;
            try {
                const user = await Users.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: Imgs }]
                });

                if (user) {
                    const list = await Payments.findAll({
                        where: {
                            [Op.and]: [
                                { idUser: user.id },
                                { command: "refill" }
                            ]
                        },
                        include: [
                            { model: BankOfUsers, include: [{ model: Banks }] },
                            { model: ReceiveBanks, include: [{ model: Banks }] },
                            { model: Imgs }
                        ],
                        order: [
                            ["id", "desc"]
                        ]
                    });
                    user.pass = null;
                    user.pass2 = null;
                    return res.status(200).json({ Refills: list, User: user });
                } else {
                    return res.status(404).json({ error: "User không tồn tại!" });
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Withdraws: {
        Create: async (req, res) => {
            const { id } = req.query;
            const { amount, sign, idBankUser } = req.body;
            try {
                const user = await Users.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: Imgs }]
                });
                if (user) {
                    const surplus = Number(user.surplus) - Number(amount)
                    if (surplus > 0) {
                        const bankUser = await BankOfUsers.findOne({
                            where: {
                                id: idBankUser
                            }
                        });
                        if (bankUser) {
                            const [payment, created] = await Payments.findOrCreate({
                                where: {
                                    sign: sign
                                }
                            });
                            if (!created) {
                                return res.status(400).json({ error: "Lệnh đã được gửi lên hệ thống! Vui lòng không spam." });
                            } else {
                                payment.set({
                                    idUser: user.id,
                                    idbankOfUser: idBankUser,
                                    amount: amount,
                                    command: "withdraw",
                                    sign: sign,
                                    status: "Pending"
                                });
                                await payment.save().then(async () => {
                                    user.surplus = surplus;
                                    await user.save();
                                    user.pass = null;
                                    user.pass2 = null;
                                    return res.status(201).json({
                                        mess: "Gửi lệnh thành công!"
                                    });
                                })
                            }
                        } else {
                            return res.status(404).json({ error: "Ngân hàng khách hàng không tồn tại!" });
                        }
                    } else {
                        return res.status(400).json({ error: "Số dư không đủ!" });
                    }
                } else {
                    return res.status(404).json({ error: "User not found!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        GetAll: async (req, res) => {
            const { id } = req.query;
            try {
                const user = await Users.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: Imgs }]
                });
                if (user) {
                    const list = await Payments.findAll({
                        where: {
                            [Op.and]: [
                                { idUser: user.id },
                                { command: "withdraw" }
                            ]
                        },
                        include: [
                            { model: BankOfUsers, include: [{ model: Banks }] },
                            { model: Users }
                        ],
                        order: [["id", "desc"]]
                    });
                    return res.status(200).json({ Withdraws: list });
                } else {
                    return res.status(404).json({ error: "User không tồn tại!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}