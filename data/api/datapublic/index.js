import {toast} from "react-hot-toast"
import {rootApi} from "../axiosClient/rootApi"

export const DataPublicApi = {
    Cards: {
        GetAll: async (dispatch, UpdateCardSuccess) => {
            await rootApi({
                method: "GET",
                url: "/data/getcards",
            })
                .then(res => {
                    dispatch(UpdateCardSuccess(res.data.Cards))
                })
                .catch(err => {
                    if (err.response) {
                        toast.error(err.response.data.error)
                    } else {
                        toast.error(err)
                    }
                })
        },
    },
}
