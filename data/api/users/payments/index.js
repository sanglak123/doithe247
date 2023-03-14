import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { toast } from "react-toastify";

export const UserPaymentsApi = {
    BankOfUser: {
        Add: async (idBank, number, owner, branch, idUser, dispatch, AddBankOfUserSuccess, accessToken, axiosJwt) => {
            await axiosJwt({
                method: "POST",
                url: "/users/banks",
                headers: {
                    token: "Bearner " + accessToken
                },
                data: { idBank, number, owner, branch, idUser }
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
        },
        Edit: async (idBank, number, owner, branch, idUser, accessToken, axiosJwt, dispatch, RefreshBankOfUserSuccess) => {
            await axiosJwt({
                method: "PUT",
                url: `/users/banks/${idBank}`,
                headers: {
                    token: "Bearner " + accessToken
                },
                data: { number, owner, branch, idUser }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.mess);
                    dispatch(RefreshBankOfUserSuccess(res.data.BankOfUsers))
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (idBank, idUser, dispatch, RefreshBankOfUserSuccess, accessToken, axiosJwt) => {
            await axiosJwt({
                method: "DELETE",
                url: `/users/banks/${idBank}`,
                headers: {
                    token: "Bearner " + accessToken
                },
                data: { idUser }
            }).then((res) => {
                toast.success(res.data.mess);
                dispatch(RefreshBankOfUserSuccess(res.data.BankOfUsers));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Refills: {
        Create: async (accessToken, dispatch, idUser, amount, idbankOfUser, idBankPublic, photo) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
            const sign = "Refills" + idUser + "_" + new Date().getTime();
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("amount", amount);
            formData.append("idbankOfUser", idbankOfUser);
            formData.append("idBankPublic", idBankPublic);
            formData.append("sign", sign);
            await axiosJwt({
                method: "POST",
                url: `/users/payments/refill/${idUser}}`,
                data: formData,
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
        },
        GetAll: async (accessToken, dispatch, idUser, UpdateRefillSuccess) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
            await axiosJwt({
                method: "GET",
                url: `/users/payments/refill/${idUser}}`,
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(UpdateRefillSuccess(res.data));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (accessToken, dispatch, idRefill) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
            await axiosJwt({
                method: "Delete",
                url: `/users/payments/refill/${idRefill}}`,
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(UpdateRefillSuccess(res.data));
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
        Create: async (accessToken, dispatch, idUser, amount, idBankUser) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
            const sign = "Withdraw_" + idUser + "_" + new Date().getTime();
            await axiosJwt({
                method: "POST",
                url: `/users/payments/withdraw/${idUser}}`,
                data: {
                    amount, sign, idBankUser
                },
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
        },
        GettAll: async (accessToken, dispatch, idUser, UpdateWithdrawSuccess) => {
            const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
            await axiosJwt({
                method: "GET",
                url: `/users/payments/withdraw/${idUser}}`,
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(UpdateWithdrawSuccess(res.data.Withdraws))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },

}