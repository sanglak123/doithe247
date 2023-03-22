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
                for (let index = 0; index < result.data.length; index++) {
                    const card = await Cards.findOne({
                        where: {
                            telco: result.data[index].telco
                        }
                    });
                    if (card) {
                        const value = await Values.findOne({
                            where: {
                                name: result.data[index].value
                            }
                        });
                        if (value) {
                            const price = await Prices.findOne({
                                where: {
                                    [Op.and]: [
                                        { idCard: card.id },
                                        { idValue: value.id }
                                    ]
                                }
                            });
                            if (price) {
                                price.feesChange = parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT);
                                price.feesBuy = 1;
                                await price.save();
                            } else {
                                await Prices.create({
                                    idCard: card.id,
                                    idValue: value.id,
                                    feesChange: parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT),
                                    feesBuy: 1
                                })
                            }
                        } else {
                            const newValue = await Values.create({
                                name: result.data[index].value
                            });
                            const price = await Prices.findOne({
                                where: {
                                    [Op.and]: [
                                        { idCard: card.id },
                                        { idValue: newValue.id }
                                    ]
                                }
                            });
                            if (price) {
                                price.feesChange = parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT);
                                price.feesBuy = 1;
                                await price.save();
                            } else {
                                await Prices.create({
                                    idCard: card.id,
                                    idValue: newValue.id,
                                    feesChange: parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT),
                                    feesBuy: 1
                                })
                            }
                        }
                    } else {
                        const newCard = await Cards.create({
                            telco: result.data[index].telco,
                            change: true
                        });
                        const value = await Values.findOne({
                            where: {
                                name: result.data[index].value
                            }
                        });
                        if (value) {
                            const price = await Prices.findOne({
                                where: {
                                    [Op.and]: [
                                        { idCard: newCard.id },
                                        { idValue: value.id }
                                    ]
                                }
                            });
                            if (price) {
                                price.feesChange = parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT);
                                price.feesBuy = 1;
                                await price.save();
                            } else {
                                await Prices.create({
                                    idCard: newCard.id,
                                    idValue: value.id,
                                    feesChange: parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT),
                                    feesBuy: 1
                                })
                            }
                        } else {
                            const newValue = await Values.create({
                                name: result.data[index].value
                            });
                            const price = await Prices.findOne({
                                where: {
                                    [Op.and]: [
                                        { idCard: newCard.id },
                                        { idValue: newValue.id }
                                    ]
                                }
                            });
                            if (price) {
                                price.feesChange = parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT);
                                price.feesBuy = 1;
                                await price.save();
                            } else {
                                await Prices.create({
                                    idCard: newCard.id,
                                    idValue: newValue.id,
                                    feesChange: parseFloat(result.data[index].fees) + parseFloat(process.env.DISCOUNT),
                                    feesBuy: 1
                                })
                            }
                        }
                    }
                };             

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
    },
    Edit: async (req, res) => {

    }
}