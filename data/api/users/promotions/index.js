import { toast } from "react-toastify";

export const UserPromotionsApi = {
    Create: async (accessToken, axiosJwt, idEvent, idUser) => {
        await axiosJwt({
            method: "POST",
            url: `/users/promotions/${idUser}`,
            headers: {
                token: "Bearner " + accessToken
            },
            data: { idEvent }
        }).then((res) => {
            toast.success(res.data.mess);
            dispatch(AddBankOfUserSuccess(res.data));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}