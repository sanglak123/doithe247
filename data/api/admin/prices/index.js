import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { toast } from "react-toastify";

export const AdminPriceApi = {
    Update: async (dispatch, UpdatePriceSuccess, accessToken) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        const idToast = toast.loading("Please wait update...")
        await axiosJwt({
            method: "PUT",
            url: "/admin/prices/update",
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            toast.update(idToast, { render: res.data.mess, type: "success", isLoading: false });
            dispatch(UpdatePriceSuccess(res.data.Prices));
            setTimeout(() => {
                toast.dismiss(idToast)
            }, 2000);
        }).catch((err) => {
            if (err.response) {
                toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(idToast)
                }, 2000);
            } else {
                toast.update(idToast, { render: err, type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(idToast)
                }, 2000);
            }
        })
    },
}