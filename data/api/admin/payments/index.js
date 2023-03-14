import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { toast } from "react-toastify";

export const AdminPaymentApi = {
    HandlePayment: async (accessToken, dispatch, RefreshRefillSuccess, idPayment, status) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        await axiosJwt({
            method: "PUT",
            url: `/admin/payments/${idPayment}`,
            data: {
                status: status
            },
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            toast.success(res.data.mess)
            dispatch(RefreshRefillSuccess(res.data.Refills));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    Refills: {
        GetAll: async (accessToken, dispatch, RefreshRefillSuccess) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
            await axiosJwt({
                method: "GET",
                url: "/admin/payments/refills/getAll",
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(RefreshRefillSuccess(res.data.Refills));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Withdraws: {
        GetAll: async (accessToken, dispatch, RefreshWithdrawSuccess) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
            await axiosJwt({
                method: "GET",
                url: "/admin/payments/withdraws/getAll",
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(RefreshWithdrawSuccess(res.data.Withdraws));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        PayWithdraw: async (accessToken, dispatch, idWithdraw) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
            await axiosJwt({
                method: "PUT",
                url: `/admin/payments/withdraws/${idWithdraw}`,
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    }
}