import {toast} from "react-toastify"
import {CreateAxiosInstance} from "../../axiosClient/createAxiosInstance"
import {rootApi} from "../../axiosClient/rootApi"

export const UserDataApi = {
    LoadingData: async (dispatch, LoadingDataPublicSuccess) => {
        await rootApi({
            method: "GET",
            url: "/data",
        })
            .then(res => {
                dispatch(LoadingDataPublicSuccess(res.data))
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
    LoadingDataUser: async (
        dispatch,
        accessToken,
        idUser,
        LoadingDataUserSuccess
    ) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        await axiosJwt({
            method: "GET",
            url: `/users/${idUser}/load_data_user`,
            headers: {
                token: "Bearner " + accessToken,
            },
        })
            .then(res => {
                dispatch(LoadingDataUserSuccess(res.data))
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
    //Update
    UpdateBuyType: async (
        type,
        dispatch,
        axiosJwt,
        accessToken,
        idUser,
        ActionSuccess
    ) => {
        await axiosJwt({
            method: "GET",
            headers: {
                token: "Bearner " + accessToken,
            },
            url: `/data/${type}`,
            data: {
                idUser: idUser,
            },
        })
            .then(res => {
                dispatch(ActionSuccess(res.data))
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
}
