import { Events } from "data/db/models";
import { Op } from "sequelize";

export const EventsAdminController = {
    Create: async (req, res) => {
        const { name, discount, timeStart, timeEnd } = req.body;

        try {
            const [event, created] = await Events.findOrCreate({
                where: {
                    [Op.and]: [
                        { name: name },
                        { timeStart: timeStart },
                        { timeEnd: timeEnd }
                    ]
                }
            });

            if (!created) {
                return res.status(400).json({ error: "Sự kiện đã tồn tại!" });
            } else {
                const e = new Date(timeEnd);

                event.set({
                    name: name,
                    discount: discount,
                    timeStart: timeStart,
                    timeEnd: e.getTime()
                });
                await event.save().then(async () => {
                    const list = await Events.findAll();
                    return res.status(201).json({ mess: "Thêm mới thành công!", Events: list, timeStart: timeStart });
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}