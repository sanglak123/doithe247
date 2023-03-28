import {toast} from "react-hot-toast"
import {CreateAxiosInstance} from "../../axiosClient/createAxiosInstance"
import {rootApi} from "../../axiosClient/rootApi"

export const AdminApiCards = {
    Add: async (axiosJwt, accessToken) => {
        await axiosJwt({
            method: "POST",
            url: "/admin/prices/update",
            headers: {
                token: "Bearner " + accessToken,
            },
        })
            .then(res => {
                toast.success(res.data.mess)
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
    Delete: async idCard => {
        await rootApi({
            method: "DELETE",
            url: `/admin/cards/delete/${idCard}`,
        })
            .then(res => {
                toast.success(res.data.mess)
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
    Edit: async (idCard, telco, photo, change, dispatch, accessToken) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("telco", telco)
        formData.append("change", change)
        await axiosJwt({
            method: "PUT",
            url: `/admin/cards/edit/${idCard}`,
            headers: {
                token: "Bearner " + accessToken,
            },
            data: formData,
        })
            .then(res => {
                toast.success(res.data.mess)
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
    ChangeType: async (
        accessToken,
        dispatch,
        idCard,
        ChangeTypeCardSuccess
    ) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        await axiosJwt({
            method: "POST",
            url: `/admin/cards/${idCard}`,
            headers: {
                token: "Bearner " + accessToken,
            },
        })
            .then(res => {
                dispatch(ChangeTypeCardSuccess(res.data.Card))
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
    Edit_Icon: async (accessToken, dispatch, idAdmin, idCard, photo) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        const formData = new FormData()
        formData.append("photo", photo)
        await axiosJwt({
            method: "PUT",
            url: `/admin/${idAdmin}/cards/${idCard}/edit_icon`,
            data: formData,
            headers: {
                token: "Bearner " + accessToken,
            },
        })
            .then(res => {
                toast.success(res.data.mess)
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
