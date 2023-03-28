import {Op} from "sequelize"
import db from "../../../db/models"
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

export const EventsAdminController = {
    Create: async (req, res) => {
        const {name, discount, timeStart, timeEnd} = req.body
        try {
            const [event, created] = await Events.findOrCreate({
                where: {
                    [Op.and]: [
                        {name: name},
                        {timeStart: timeStart},
                        {timeEnd: timeEnd},
                    ],
                },
            })

            if (!created) {
                return res.status(400).json({error: "Sự kiện đã tồn tại!"})
            } else {
                event.set({
                    name: name,
                    discount: discount,
                    timeStart: timeStart,
                    timeEnd: timeEnd,
                })
                await event.save().then(async () => {
                    const list = await Events.findAll()
                    return res.status(201).json({
                        mess: "Thêm mới thành công!",
                        Events: list,
                        timeStart: timeStart,
                    })
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    Delete: async (req, res) => {
        const {id} = req.query
        try {
            const event = await Events.findOne({
                where: {
                    id: id,
                },
            })
            if (event) {
                await event.destroy().then(async () => {
                    const list = await Events.findAll()
                    return res
                        .status(200)
                        .json({mess: "Delete Success!", Events: list})
                })
            } else {
                return res.status(404).json({error: "Event not found!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
