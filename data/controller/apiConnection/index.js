import db from "../../db/models"
const {
    Users,
    BankOfUsers,
    Banks,
    Cards,
    Imgs,
    Prices,
    Products,
    RefreshTokens,
    TypeCards,
    Values,
    Events,
    Payments,
    Promotions,
    ReceiveBanks,
} = db

export const ApiConnectionController = {
    Price: {
        GetPrice: async () => {
            try {
                const list = await Prices.findAll()
                return resizeBy.status(200).json({Prices: list})
            } catch (error) {
                return res.status(500).json(error)
            }
        },
    },
}
