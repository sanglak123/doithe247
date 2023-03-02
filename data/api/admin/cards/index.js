import { rootApi } from "data/api/configApi"
import { toast } from "react-toastify";

export const AdminApiCards = {
    Add: async (axiosJwt, accessToken) => {
        await axiosJwt({
            method: "POST",
            url: "/admin/prices/update",
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            toast.success(res.data.mess)
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    Delete: async (idCard) => {
        await rootApi({
            method: "DELETE",
            url: `/admin/cards/${idCard}`
        }).then((res) => {
            toast.success(res.data.mess);
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    Edit: async (idCard, telco, photo, change, dispatch, EditCardSuccess, accessToken, axiosJwt) => {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("telco", telco);
        formData.append("change", change);
        await axiosJwt({
            method: "PUT",
            url: `/admin/cards/${idCard}`,
            headers: {
                token: "Bearner " + accessToken
            },
            data: formData
        }).then((res) => {
            console.log(res.data.Card);
            dispatch(EditCardSuccess(res.data))
            toast.success(res.data.mess);
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
                console.log(err.response.data.error)
            } else {
                toast.error(err);
                console.log(err)
            }
        })
    },
    ChangeType: async (idCard, accessToken, dispatch, ChangeTypeCardSuccess, axiosJwt) => {
        await axiosJwt({
            method: "POST",
            url: `/admin/cards/${idCard}`,
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            toast.success(res.data.mess);
            dispatch(ChangeTypeCardSuccess(res.data.Card))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
}