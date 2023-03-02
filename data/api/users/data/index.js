import { toast } from "react-toastify";
import { rootApi } from "../../configApi";

export const UserDataApi = {
    LoadingData: async (dispatch, LoadingDataPublicSuccess) => {
        await rootApi({
            method: "GET",
            url: "/data"
        }).then((res) => {
            dispatch(LoadingDataPublicSuccess(res.data))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}