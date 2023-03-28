import db from "data/db/models"
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

export const UserControllerPromotions = {
    Create: async (req, res) => {
        const {id} = req.query
        const {idEvent} = req.body
        try {
            const user = await Users.findOne({
                where: {
                    id: id,
                },
            })
            if (user) {
                const event = await Events.findOne({
                    where: {
                        id: idEvent,
                    },
                })
                if (event) {
                    // 2023-03-31 22:57:00
                    const timeEnd = new Date(event.timeEnd)

                    if (timeEnd > new Date()) {
                        return res
                            .status(201)
                            .json({
                                mess: "Thành công",
                                TimeEnd: timeEnd,
                                event: event,
                            })
                    } else {
                        return res
                            .status(400)
                            .json({error: "Sự kiện đã kết thúc!"})
                    }
                } else {
                    return res
                        .status(404)
                        .json({error: "Sự kiện không tồn tại!"})
                }
            } else {
                return res.status(404).json({error: "User không tồn tại!"})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
