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
        Edit: async (idBank, number, owner, branch, idUser, accessToken, axiosJwt, dispatch, EditBankOfUserSuccess) => {
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
                    dispatch(EditBankOfUserSuccess(res.data.Bank))
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (idBank, idUser, dispatch, DeleteBankOfUserSuccess, accessToken, axiosJwt) => {
            await axiosJwt({
                method: "DELETE",
                url: `/users/banks/${idBank}`,
                headers: {
                    token: "Bearner " + accessToken
                },
                data: { idUser }
            }).then((res) => {
                toast.success(res.data.mess);
                dispatch(DeleteBankOfUserSuccess(res.data.Bank));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Money: {
        CreateRefill: async (accessToken, axiosJwt, idUser, amount, idbankOfUser, idBankPublic, photo, dispatch, CreateRefillSuccess) => {
            const sign = "Refill_User_" + idUser + "_" + new Date().getTime();
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
                dispatch(CreateRefillSuccess(res.data))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Refresh: async (accessToken, axiosJwt, idUser, dispatch, RefreshRefillSuccess, RefreshUserSuccess) => {

            await axiosJwt({
                method: "GET",
                url: `/users/payments/${idUser}`,
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(RefreshRefillSuccess(res.data.Payments));
                dispatch(RefreshUserSuccess(res.data.User));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (accessToken, axiosJwt, idPayment) => {
            await axiosJwt({
                method: "DELETE",
                url: `/users/payments/${idPayment}`,
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
        CreateWithdraw: async (accessToken, axiosJwt, idUser, amount, idBankUser, dispatch, CreateWithdrawSuccess, RefreshUserSuccess) => {
            const sign = "Withdraw_User_" + idUser + "_" + new Date().getTime();
            await axiosJwt({
                method: "POST",
                url: `/users/payments/withdraw/${idUser}}`,
                data: {
                    amount, sign, idBankUser, sign
                },
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess);
                const newWithDraw = {
                    ...res.data.Payment,
                    BankOfUser: res.data.BankOfUser
                }
                dispatch(CreateWithdrawSuccess(newWithDraw));
                dispatch(RefreshUserSuccess(res.data.User))
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