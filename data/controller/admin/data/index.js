import { BankOfUsers, Banks, Cards, Imgs, Payments, Prices, Products, ReceiveBanks, Users, Values, Events, Promotions } from "data/db/models";

export const DataAdminController = {
    LoadingData: async (req, res) => {
        try {

            const listUsers = await Users.findAll({
                include: [{ model: Imgs }]
            });


            const listChangeCards = await Products.findAll({
                where: {
                    command: "change"
                },
                include: [{ model: Users }, { model: Prices, include: [{ model: Cards }, { model: Values }] }]
            });

            const listBuyCards = await Products.findAll({
                where: {
                    command: "buy"
                },
                include: [{ model: Users }, { model: Prices, include: [{ model: Cards }, { model: Values }] }]
            });

            const listPayments = await Payments.findAll({
                order: [
                    ["id", "desc"]
                ],
                include: [
                    { model: Users },
                    { model: BankOfUsers, include: [{ model: Banks }] },
                    { model: ReceiveBanks, include: [{ model: Banks }] },
                    { model: Imgs }
                ]
            });
            return res.status(200).json({
                Users: listUsers,
                ChangeCards: listChangeCards,
                BuyCards: listBuyCards,
                Payments: listPayments
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    GetDataAdminByType: async (req, res) => {
        const { type } = req.query;
        try {
            switch (type) {
                case "Refills_Admin": {
                    const listRefills = await Payments.findAll({
                        where: {
                            command: "refill"
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
                    return res.status(200).json({ Refills: listRefills })
                }

                default:
                    break;
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}