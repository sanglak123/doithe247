import { toast } from "react-toastify";

export const PaymentAdminApi = {
    HandlePayment: async (accessToken, axiosJwt, dispatch, HandlePaymentSuccess, idPayment, status) => {
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
            dispatch(HandlePaymentSuccess(res.data.Payment));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}