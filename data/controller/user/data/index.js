import { BankOfUsers, Banks, Cards, Events, Imgs, Payments, Prices, Products, ReceiveBanks, TypeCards, Users, Values } from "data/db/models";
import { Op } from "sequelize";

export const UserControllerDatas = {
    LoadingData: async (req, res) => {
        try {

            const d = new Date();
            //Events
            const listEvents = await Events.findAll({
                where: {
                    [Op.and]: [
                        {
                            timeStart: {
                                [Op.lte]: d.getTime()

                            }
                        },
                        {
                            timeEnd: {
                                [Op.gte]: d.getTime()
                            }
                        }
                    ]
                }
            });
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
            const listWithdraw = await Payments.findAll({
                where: {
                    command: "withdraw"
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

            const listRefill = await Payments.findAll({
                where: {
                    command: "refill"
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

            return res.status(200).json({
                BankOfUsers: listBankOfUser,
                Products: listProducts,
                Withdraws: listWithdraw,
                Refills: listRefill
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}