import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { toast } from "react-toastify";

export const DataAdminApi = {
    LoadingDataAdmin: async (dispatch, LoadingDataAdminSuccess, accessToken) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
        await axiosJwt({
            method: "GET",
            url: "/data/admin",
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            dispatch(LoadingDataAdminSuccess(res.data))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    GetDataAdminByType: async (type, dispatch, accessToken, axiosJwt, RefreshRefillSuccess) => {
        await axiosJwt({
            method: "GET",
            url: `/admin/data/${type}`,
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            dispatch(RefreshRefillSuccess(res.data))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}