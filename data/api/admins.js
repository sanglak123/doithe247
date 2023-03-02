import { toast } from "react-toastify"
import { rootApi } from "./configApi"

export const ApiAdmins = {
    Cards: {
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
        Delete: async (idCard, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "DELETE",
                url: `/admin/cards/${idCard}`,
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
        Edit: async (idCard, telco, photo, change, axiosJwt, accessToken, dispatch, EditCardSuccess) => {
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("telco", telco);
            formData.append("change", change);
            await axiosJwt({
                method: "PUT",
                url: `/admin/cards/${idCard}`,
                data: formData,
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
    },
    Prices: {
        Update: async (dispatch, UpdatePriceSuccess, axiosJwt, accessToken) => {
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
        EditFeesBuy: async (idPrice, feesBuy, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "PUT",
                url: `/admin/prices/${idPrice}`,
                headers: {
                    token: "Bearner " + accessToken
                },
                data: {
                    feesBuy: feesBuy
                }
            }).then((res) => {
                dispatch(UpdateFeesBuySuccess({ id: idPrice, feesBuy: feesBuy }))
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Add: async (idCard, idValue, feesChange, feesBuy, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "POST",
                url: "/admin/prices",
                headers: {
                    token: "Bearner " + accessToken
                },
                data: {
                    idCard, idValue, feesChange, feesBuy
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
    },
    Authen: {

        EditProfile: async (id, displayName, fullName, phone, adress, photo, email, dispatch, EditProfileSuccess) => {
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("displayName", displayName);
            formData.append("fullName", fullName);
            formData.append("phone", phone);
            formData.append("adress", adress);
            formData.append("email", email);
            await rootApi({
                method: "PUT",
                url: `/admin/${id}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }).then((res) => {
                toast.success(res.data.mess);
                dispatch(EditProfileSuccess(res.data.User))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Data: {
        GetAll: async (dispatch, LoadingDataAdmin, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "GET",
                url: "/admin/data",
                headers: {
                    token: "Bearner " + accessToken
                }
            }).then((res) => {
                dispatch(LoadingDataAdmin(res.data))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Banks: {
        Add: async (name, sign, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "POST",
                url: "/admin/banks",
                headers: {
                    token: "Bearner " + accessToken
                },
                data: { name, sign }
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
        Edit: async (name, sign, id, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "PUT",
                url: `/admin/banks/${id}`,
                headers: {
                    token: "Bearner " + accessToken
                },
                data: { name, sign }
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
        Delete: async (id, axiosJwt, accessToken) => {
            await axiosJwt({
                method: "DELETE",
                url: `/admin/banks/${id}`,
                headers: {
                    token: "Bearner " + accessToken
                },
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
};

