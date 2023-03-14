import axios from "axios"
import { Cards, Prices, Values } from "data/db/models";
import { Op } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const AdminPricesController = {
    Update: async (req, res) => {
        try {
            await axios({
                method: "GET",
                url: "https://doithe1s.vn/chargingws/v2/getfee?partner_id=6155991561"
            }).then(async (result) => {
                result.data.map(async (item) => {
                    const [value, createdValue] = await Values.findOrCreate({
                        where: {
                            name: item.value
                        }
                    });
                    const [card, createdCard] = await Cards.findOrCreate({
                        where: {
                            telco: item.telco
                        }
                    });
                    if (!createdCard) {
                        if (!createdValue) {
                            value.name = item.value;
                            await value.save().then(async () => {
                                const [price, createdPrice] = await Prices.findOrCreate({
                                    where: {
                                        [Op.and]: [
                                            { idCard: card.id },
                                            { idValue: value.id }
                                        ]
                                    }
                                });
                                if (!createdPrice) {
                                    price.feesChange = parseFloat(item.fees) + parseFloat(process.env.DISCOUNT);
                                    await price.save();
                                } else {
                                    price.set({
                                        idCard: card.id,
                                        idValue: value.id,
                                        feesChange: parseFloat(item.fees) + parseFloat(process.env.DISCOUNT)
                                    });
                                    await price.save();
                                }
                            })
                        } else {
                            value.set({
                                name: item.value
                            });
                            await value.save().then(async () => {
                                const [price, createdPrice] = await Prices.findOrCreate({
                                    where: {
                                        [Op.and]: [
                                            { idCard: card.id },
                                            { idValue: value.id }
                                        ]
                                    }
                                });
                                if (!createdPrice) {
                                    price.feesChange = parseFloat(item.fees) + parseFloat(process.env.DISCOUNT);
                                    await price.save();
                                } else {
                                    price.set({
                                        idCard: card.id,
                                        idValue: value.id,
                                        feesChange: parseFloat(item.fees) + parseFloat(process.env.DISCOUNT)
                                    });
                                    await price.save();
                                }
                            })
                        }
                    } else {
                        card.set({
                            telco: item.telco
                        });
                        await card.save().then(async () => {
                            if (!createdValue) {
                                value.name = item.value;
                                await value.save().then(async () => {
                                    const [price, createdPrice] = await Prices.findOrCreate({
                                        where: {
                                            [Op.and]: [
                                                { idCard: card.id },
                                                { idValue: value.id }
                                            ]
                                        }
                                    });
                                    if (!createdPrice) {
                                        price.feesChange = parseFloat(item.fees) + parseFloat(process.env.DISCOUNT);
                                        await price.save();
                                    } else {
                                        price.set({
                                            idCard: card.id,
                                            idValue: value.id,
                                            feesChange: parseFloat(item.fees) + parseFloat(process.env.DISCOUNT)
                                        });
                                        await price.save();
                                    }
                                })
                            } else {
                                value.set({
                                    name: item.value
                                });
                                await value.save().then(async () => {
                                    const [price, createdPrice] = await Prices.findOrCreate({
                                        where: {
                                            [Op.and]: [
                                                { idCard: card.id },
                                                { idValue: value.id }
                                            ]
                                        }
                                    });
                                    if (!createdPrice) {
                                        price.feesChange = parseFloat(item.fees) + parseFloat(process.env.DISCOUNT);
                                        await price.save();
                                    } else {
                                        price.set({
                                            idCard: card.id,
                                            idValue: value.id,
                                            feesChange: parseFloat(item.fees) + parseFloat(process.env.DISCOUNT)
                                        });
                                        await price.save();
                                    }
                                })
                            }
                        })
                    }
                });
                const list = await Prices.findAll({
                    include: [
                        { model: Cards },
                        { model: Values }
                    ]
                });
                return res.status(200).json({ mess: "Cập nhật thành công!", Prices: list })
            }).catch((err) => {
                return res.status(500).json(err);
            })
        } catch (error) {
            return res.status(500).json(err);
        }
    }
}