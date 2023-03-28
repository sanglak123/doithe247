import {Cards, Imgs, Prices, Products} from "../../../db/models"

const fs = require("fs")
const path = require("path")

export const AdminControllerCards = {
    Add: async (req, res) => {
        try {
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    Delete: async (req, res) => {
        const {id} = req.query
        try {
            const card = await Cards.findOne({
                where: {
                    id: id,
                },
            })
            if (card) {
                const price = await Prices.findOne({
                    where: {
                        idCard: card.id,
                    },
                })
                if (price) {
                    await Products.destroy({
                        where: {
                            idPrice: price.id,
                        },
                    })
                    await Prices.destroy({
                        where: {
                            idCard: card.id,
                        },
                    })
                    await card.destroy()
                    return res.status(200).json({mess: "Delete success!"})
                } else {
                    await card.destroy()
                    return res
                        .status(200)
                        .json({mess: "Delete success!", price})
                }
            } else {
                return res.status(404).json({error: "Card not found!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    Edit: async (req, res) => {
        const {id} = req.query
        const {telco, change} = req.body
        try {
            const card = await Cards.findOne({
                where: {
                    id: id,
                },
            })
            if (card) {
                if (req.file) {
                    const baseURL = req.protocol + "://" + req.get("host")
                    const pathImage = baseURL + "/img/logo/" + req.file.filename
                    const oldImg = await Imgs.findOne({
                        where: {
                            id: card.img,
                        },
                    })
                    if (oldImg) {
                        //Có ảnh củ = > xóa ảnh => thêm mới ảnh = > save
                        const unLoad = path.join(
                            __dirname,
                            "../../../../../../../public/img/logo/"
                        )
                        fs.unlink(unLoad + oldImg.fileName, async err => {
                            if (err) {
                                return res.status(500).json(err)
                            } else {
                                oldImg.fileName = req.file.filename
                                oldImg.path = pathImage
                                await oldImg.save()

                                card.telco = telco
                                card.img = oldImg.id
                                card.change = change
                                await card.save()
                                return res
                                    .status(200)
                                    .json({mess: "Update success!"})
                            }
                        })
                    } else {
                        const newImg = await Imgs.create({
                            fileName: req.file.filename,
                            path: pathImage,
                        })
                        card.telco = telco
                        card.img = newImg.id
                        card.change = change
                        await card.save()
                        return res.status(200).json({mess: "Update success!"})
                    }
                } else {
                    card.telco = telco
                    card.change = change
                    await card.save()
                    return res.status(200).json({mess: "Update success!"})
                }
            } else {
                return res.status(404).json({error: "Cards not found!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    OnOffChangeCard: async (req, res) => {
        const {id} = req.query
        try {
            const card = await Cards.findOne({
                where: {
                    id: id,
                },
            })
            if (card) {
                if (card.change) {
                    card.change = false
                } else {
                    card.change = true
                }
                await card.save()
                const result = await Cards.findOne({
                    where: {
                        id: card.id,
                    },
                    include: [{model: TypeCards}, {model: Imgs}],
                })
                return res.status(200).json({Card: result})
            } else {
                return res.status(404).json({error: "Card not found!"})
            }
        } catch (error) {}
    },
    Edit_Icon: async (req, res) => {
        const {id, idCard} = req.query
        try {
            const admin = await Users.findOne({
                where: {
                    id: id,
                },
            })
            if (admin) {
                const card = await Cards.findOne({
                    where: {
                        id: idCard,
                    },
                })
                if (card) {
                    if (req.file) {
                        const baseURL = req.protocol + "://" + req.get("host")
                        const pathImage =
                            baseURL + "/img/logo/" + req.file.filename

                        const [img, create] = await Imgs.findOrCreate({
                            where: {
                                id: card.img,
                            },
                        })
                        if (!create) {
                            img.fileName = req.file.filename
                            img.path = pathImage
                            await img.save()
                            return res
                                .status(200)
                                .json({mess: "Cập nhật thành công!"})
                        } else {
                            img.set({
                                fileName: req.file.filename,
                                path: pathImage,
                            })
                            await img.save()
                            card.img = img.id
                            await card.save()
                            return res
                                .status(201)
                                .json({mess: "Thêm mới thành công!"})
                        }
                    } else {
                        return res
                            .status(404)
                            .json({error: "Tệp đính kèm không khả dụng!"})
                    }
                } else {
                    //Xóa img load
                    const unLoad = path.join(
                        __dirname,
                        "../../../../../../../public/img/logo/"
                    )
                    fs.unlink(unLoad + req.file.filename, async err => {
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            return res
                                .status(404)
                                .json({error: "Loại thẻ không tồn tại!"})
                        }
                    })
                }
            } else {
                //Xóa img load
                const unLoad = path.join(
                    __dirname,
                    "../../../../../../../public/img/logo/"
                )
                fs.unlink(unLoad + req.file.filename, async err => {
                    if (err) {
                        return res.status(500).json(err)
                    } else {
                        return res
                            .status(404)
                            .json({error: "Admin không tồn tại!"})
                    }
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
