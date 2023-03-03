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
    },
    LoadingDataUser: async (dispatch, axiosJwt, accessToken, idUser, LoadingDataUserSuccess) => {
        await axiosJwt({
            method: "GET",
            url: `/users/${idUser}`,
            headers: {
                token: "Bearner " + accessToken
            },
        }).then((res) => {
            dispatch(LoadingDataUserSuccess(res.data))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}