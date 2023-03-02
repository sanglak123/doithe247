import { Cards, Imgs, Prices, Products, TypeCards } from "data/db/models";
import fs from "fs";

export const AdminControllerCards = {
    Add: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Delete: async (req, res) => {
        const { id } = req.query;
        try {
            const card = await Cards.findOne({
                where: {
                    id: id
                }
            });
            if (card) {
                const price = await Prices.findOne({
                    where: {
                        idCard: card.id
                    }
                });
                if (price) {
                    await Products.destroy({
                        where: {
                            idPrice: price.id
                        }
                    });
                    await Prices.destroy({
                        where: {
                            idCard: card.id
                        }
                    });
                    await card.destroy();
                    return res.status(200).json({ mess: "Delete success!" })
                } else {
                    await card.destroy();
                    return res.status(200).json({ mess: "Delete success!", price })
                }
            } else {
                return res.status(404).json({ error: "Card not found!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Edit: async (req, res) => {
        const { id } = req.query;
        const { telco, change } = req.body;
        try {

            const card = await Cards.findOne({
                where: {
                    id: id
                }
            });
            if (card) {
                if (req.file) {
                    const baseURL = req.protocol + '://' + req.get('host');
                    const pathImage = baseURL + '/img/logo/' + req.file.filename;
                    const oldImg = await Imgs.findOne({
                        where: {
                            id: card.img
                        }
                    });
                    if (oldImg) {
                        //Có ảnh củ = > xóa ảnh => thêm mới ảnh = > save
                        const unLoad = path.join(__dirname, "../../../../../../public/img/logo/");
                        fs.unlink(unLoad + oldImg.fileName, async (err) => {
                            if (err) {
                                return res.status(500).json(err);
                            } else {
                                oldImg.fileName = req.file.filename;
                                oldImg.path = pathImage;
                                await oldImg.save();

                                card.telco = telco;
                                card.img = oldImg.id;
                                card.change = change;
                                await card.save();
                                return res.status(200).json({ mess: "Update success!" });
                            }
                        })
                    } else {
                        const newImg = await Imgs.create({
                            fileName: req.file.filename,
                            path: pathImage
                        });
                        card.telco = telco;
                        card.img = newImg.id;
                        card.change = change;
                        await card.save();
                        return res.status(200).json({ mess: "Update success!" })
                    }
                } else {
                    card.telco = telco;
                    card.change = change;
                    await card.save();
                    return res.status(200).json({ mess: "Update success!" })
                }
            } else {
                return res.status(404).json({ error: "Cards not found!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    OnOffChangeCard: async (req, res) => {
        const { id } = req.query;
        try {
            const card = await Cards.findOne({
                where: {
                    id: id
                }
            });
            if (card) {
                if (card.change) {
                    card.change = false;
                } else {
                    card.change = true;
                };
                await card.save();
                const result = await Cards.findOne({
                    where: {
                        id: card.id
                    },
                    include: [{ model: TypeCards }, { model: Imgs }]
                });
                return res.status(200).json({ mess: "Update success!", Card: result })
            } else {
                return res.status(404).json({ error: "Card not found!" })
            }
        } catch (error) {

        }
    }
}