import { BankOfUsers, Banks, Cards, Imgs, Payments, Prices, Products, ReceiveBanks, Users, Values, Events, Promotions } from "data/db/models";
import { Op } from "sequelize";

export const DataAdminController = {
    LoadingData: async (req, res) => {
        try {          

            const listUsers = await Users.findAll();

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
                include: [
                    { model: Users },
                    { model: ReceiveBanks, include: [{ model: Banks }] },
                    { model: BankOfUsers, include: [{ model: Banks }] },
                    { model: Imgs }
                ],
                order: [
                    ["id", "desc"]
                ]
            })

            return res.status(200).json({
                Users: listUsers,
                ChangeCards: listChangeCards,
                BuyCards: listBuyCards,
                Payments: listPayments,              
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}