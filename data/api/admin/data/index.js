import { toast } from "react-toastify";

export const DataAdminApi = {
    LoadingData: async (dispatch, LoadingDataAdmin, axiosJwt, accessToken) => {
        await axiosJwt({
            method: "GET",
            url: "/data/admin",           
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            dispatch(LoadingDataAdmin(res.data))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}