import { Prices } from "data/db/models"

export const ApiConnectionController = {
    Price: {
        GetPrice: async () => {
            try {
                const list = await Prices.findAll();
                return resizeBy.status(200).json({ Prices: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}