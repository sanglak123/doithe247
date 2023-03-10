import { BankOfUsers, Banks, Imgs, Payments, ReceiveBanks, Users } from "data/db/models";
import { Op } from "sequelize";
import path from "path";
import fs from "fs"

export const UserControllerPayments = {
    Money: {
        CreateRefill: async (req, res) => {
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
                                            await refill.save().then((newRefill) => {
                                                return res.status(201).json({
                                                    mess: "Tạo lệnh thành công!",
                                                    Payment: newRefill,
                                                    BankOfUser: bankUser,
                                                    ReceiveBank: bankPublic,
                                                    Img: img,
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
        CreateWithdraw: async (req, res) => {
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

                                    const withdraws = await Payments.findAll({
                                        where: {
                                            [Op.and]: [
                                                { idUser: user.id },
                                                { command: "withdraw" }
                                            ]
                                        },
                                        include: [
                                            { model: BankOfUsers, include: [{ model: Banks }] },
                                            { model: Users }
                                        ]
                                    });
                                    const WithdrawPending = withdraws.filter(item => item.status === "Pending");
                                    const WithdrawHistory = withdraws.filter(item => item.status !== "Pending");
                                    return res.status(201).json({
                                        mess: "Gửi lệnh thành công!",
                                        WithdrawPending: WithdrawPending,
                                        WithdrawHistory: WithdrawHistory,
                                        User: user
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
        Refresh: async (req, res) => {
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
                            { model: Users },
                            { model: BankOfUsers, include: [{ model: Banks }] },
                            { model: ReceiveBanks, include: [{ model: Banks }] }
                        ],
                        order: [
                            ["id", "desc"]
                        ]
                    });
                    user.pass = null;
                    user.pass2 = null;
                    return res.status(200).json({ Payments: list, User: user, mess: "Cập nhật thành công!" });
                } else {
                    return res.status(404).json({ error: "Không tìm thấy user!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {
                const payment = await Payments.findOne({
                    where: {
                        id: id
                    }
                });
                if (payment) {
                    const img = await Imgs.findOne({
                        where: {
                            id: payment.img
                        }
                    });
                    if (img) {
                        const unLoad = path.join(__dirname, "../../../../../../public/img/payment/");
                        fs.unlink(unLoad + img.fileName, async (err) => {
                            if (err) {
                                return res.status(500).json(err);
                            } else {
                                await payment.destroy().then(async () => {
                                    await img.destroy().then(() => {
                                        return res.status(200).json({ Payment: payment, mess: "Xóa thành công!" });
                                    });
                                });


                            }
                        })
                    }
                } else {
                    return res.status(404).json({ error: "Lệnh không tồn tại!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Bank: {
        Add: async (req, res) => {
            const { idBank, number, owner, branch, idUser } = req.body;
            try {
                const user = await Users.findOne({
                    where: {
                        id: idUser
                    }
                });
                if (user) {
                    const typeBank = await Banks.findOne({
                        where: {
                            id: idBank
                        }
                    });
                    if (typeBank) {
                        const [bank, created] = await BankOfUsers.findOrCreate({
                            where: {
                                [Op.and]: [
                                    { idBank: idBank },
                                    { number: number },
                                    { owner: owner }
                                ]
                            },
                            include: [{ model: Banks }]
                        });
                        if (!created) {
                            return res.status(400).json({ error: "Ngân hàng đã tồn tại trên hệ thông!" });
                        } else {
                            bank.set({
                                idBank: idBank,
                                owner: owner,
                                branch: branch,
                                idUser: idUser,
                                number: number
                            });
                            await bank.save().then((newBank) => {

                                return res.status(201).json({ mess: "Thêm mới thành công!", Bank: newBank, TypeBank: typeBank })
                            })
                        }
                    } else {
                        return res.status(400).json({ error: "Ngân hàng không nằm trong hệ thống!" })
                    }

                } else {
                    return res.status(404).json({ error: "User not found!" });
                }

            } catch (error) {
                return res.status(500).json(error);
            }

        },
        Delete: async (req, res) => {
            const { id } = req.query;
            const { idUser } = req.body;

            try {
                const bank = await BankOfUsers.findOne({
                    where: {
                        [Op.and]: [
                            { id: id },
                            { idUser: idUser }
                        ]
                    }
                });
                if (bank) {
                    await bank.destroy();
                    const list = await BankOfUsers.findAll({
                        where: {
                            idUser: idUser
                        }
                    })
                    return res.status(200).json({ mess: "Xóa ngân hàng thành công!", BankOfUsers: list })
                } else {
                    return res.status(404).json({ error: "Ngân hàng không tồn tại!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }

        },
        Edit: async (req, res) => {
            const { number, owner, branch, idUser } = req.body;
            const { id } = req.query;
            try {
                const bank = await BankOfUsers.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: Banks }]
                });
                if (bank) {
                    bank.number = number;
                    bank.owner = owner;
                    bank.branch = branch;
                    await bank.save().then(async () => {
                        const list = await BankOfUsers.findAll({
                            where: {
                                idUser: idUser
                            }
                        })
                        return res.status(200).json({ mess: "Cập nhật thành công!", BankOfUsers: list })
                    })
                } else {
                    return res.status(404).json({ error: "Ngân hàng không tòn tại!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
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
                                            await refill.save().then((newRefill) => {
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
        GetAllByIdUser: async (req, res) => {
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