import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { rootApi } from "data/api/configApi";
import { toast } from "react-toastify";

export const UserCardsApi = {
    PostCards: async (accessToken, dispatch, telco, idValue, code, serial, idUser, ChangeCardSuccess, idToast) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
        await axiosJwt({
            method: "POST",
            url: `/users/changecard/${idUser}`,
            headers: {
                token: "Bearner " + accessToken
            },
            data: {
                telco, idValue, code, serial
            }
        }).then((res) => {
            toast.update(idToast, { render: res.data.mess, type: "success" });
            const Product = res?.data?.Product;
            setTimeout(async () => {
                await ApiCardsPublic.CheckCard(accessToken, Product.id, dispatch, ChangeCardSuccess, idToast)
            }, 3000);
        }).catch((err) => {
            if (err.response) {
                toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false })
                setTimeout(() => {
                    toast.dismiss(idToast);
                }, 2000);
            } else {
                toast.update(idToast, { render: err, type: "error", isLoading: false })
                setTimeout(() => {
                    toast.dismiss(idToast);
                }, 2000);
            }
        })
    },
    BuyCarrd: async (dispatch, accessToken, partner_id, idUser, store, email,) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)

        const request_id = idUser + "_" + new Date().getTime();
        await axiosJwt({
            method: "POST",
            url: "/buycard",
            headers: {
                token: "Bearner " + accessToken,
                partner_id: partner_id
            },
            data: {
                store, request_id, email, idUser
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    CheckCard: async (accessToken, idProduct, dispatch, ChangeCardSuccess, idToast) => {
        toast.update(idToast, { render: "Đang xử lý thẻ vui lòng chờ..." })
        await rootApi({
            method: "POST",
            url: `/users/products/${idProduct}`,
            headers: {
                token: "Bearner " + accessToken
            }
        }).then(async (res) => {
            toast.update(idToast, { render: res.data.mess, type: "success", isLoading: false });
            dispatch(ChangeCardSuccess(res.data.Product));
            setTimeout(async () => {
                toast.dismiss(idToast);
            }, 2000);
        }).catch(async (err) => {
            if (err.response) {
                toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false });
                setTimeout(async () => {
                    dispatch(ChangeCardSuccess(err.response.data.Product))
                    toast.dismiss(idToast);
                }, 2000);
            } else {
                toast.update(idToast, { render: err, type: "error", isLoading: false });
                setTimeout(async () => {
                    dispatch(ChangeCardSuccess(err.response.data.Product));
                    toast.dismiss(idToast);
                }, 2000);
            }
        })
    }
}