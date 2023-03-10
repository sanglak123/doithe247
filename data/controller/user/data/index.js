import { BankOfUsers, Banks, Cards, Events, Imgs, Payments, Prices, Products, ReceiveBanks, TypeCards, Users, Values, Promotions } from "data/db/models";

export const UserControllerDatas = {
    LoadingData: async (req, res) => {
        try {

            const d = new Date();
            //Events
            const listEvents = await Events.findAll();
            const listReceiveBank = await ReceiveBanks.findAll({
                include: [{ model: Banks }]
            });

            const listPrices = await Prices.findAll({
                include: [{ model: Cards, include: [{ model: Imgs }] }, { model: Values }]
            });

            const listTypeCards = await TypeCards.findAll();

            const listCards = await Cards.findAll({
                include: [{ model: TypeCards }, { model: Imgs }]
            });

            const listValues = await Values.findAll();

            const listBanks = await Banks.findAll();

            const listProduct = await Products.findAll({
                where: {
                    status: "Success"
                },
                include: [
                    { model: Users },
                    {
                        model: Prices,
                        include: [{ model: Cards }, { model: Values }]
                    }
                ],
                order: [
                    ["id", "desc"]
                ],
                limit: 10
            });

            return res.status(200).json(
                {
                    Prices: listPrices,
                    TypeCards: listTypeCards,
                    Cards: listCards,
                    Values: listValues,
                    Banks: listBanks,
                    News: listProduct,
                    ReceiveBanks: listReceiveBank,
                    Events: listEvents
                })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    LoadDingDataUser: async (req, res) => {
        const { id } = req.query;
        try {
            const user = await Users.findOne({
                where: {
                    id: id
                },
                include: [{ model: Imgs }]
            });
            if (user) {
                const listBankOfUser = await BankOfUsers.findAll({
                    where: {
                        idUser: id
                    },
                    include: [{ model: Banks }, { model: Users }]
                });

                const listProducts = await Products.findAll({
                    where: {
                        idUser: id
                    },
                    include: [{ model: Prices, include: [{ model: Cards }, { model: Values }] }, { model: Users }],
                    order: [
                        ["id", "desc"]
                    ]
                });
                const listPayments = await Payments.findAll({
                    where: {
                        idUser: id
                    },
                    order: [
                        ["id", "desc"]
                    ],
                    include: [
                        { model: Users },
                        { model: BankOfUsers, include: [{ model: Banks }] },
                        { model: ReceiveBanks, include: [{ model: Banks }] },
                    ]
                });

                const listPromotions = await Promotions.findAll({
                    where: {
                        idUser: id
                    },
                    include: [{ model: Events }]
                })
                user.pass = null;
                user.pass2 = null;
                return res.status(200).json({
                    BankOfUsers: listBankOfUser,
                    Products: listProducts,
                    Payments: listPayments,
                    Promotions: listPromotions,
                    User: user
                })
            } else {
                return res.status(404).json({ error: "User kh??ng t???n t???i!" })
            }


        } catch (error) {
            return res.status(500).json(error);
        }
    },
    GetDataByType: async (req, res) => {
        const { type, idUser } = req.query;
        try {
            const user = await Users.findOne({
                where: {
                    id: idUser
                },
                include: [{ model: Imgs }]
            });
            if (user) {
                switch (type) {
                    case "Prices": {
                        const listPrice = await Prices.findAll({
                            include: [
                                { model: Cards },
                                { model: Values }
                            ]
                        });
                        return res.status(200).json({ Prices: listPrice })
                    }
                    case "Refills": {
                        const listRefills = await Payments.findAll({
                            where: {
                                [Op.and]: [
                                    { idUser: idUser },
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
                        return res.status(200).json({ Refills: listRefills, User: user })
                    }
                    default:
                        break;
                }
            } else {
                return res.status(404).json({ error: "User kh??ng t???n t???i!" })
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}