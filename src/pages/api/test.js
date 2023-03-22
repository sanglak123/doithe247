import { Products } from "data/db/models";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const list = await Products.findAll({
                where: {
                    command: "buy"
                },
                attributes: ["sign"],
                group: ["sign"]
            });
            const result = [];

            for (let index = 0; index < list.length; index++) {
                const l = await Products.findAll({
                    where: {
                        sign: list[index].sign
                    }
                });
                const newObj = {
                    sign: list[index].sign,
                    data: l
                }
                result.push(newObj)
            }

            return res.status(200).json({ Products: result })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}