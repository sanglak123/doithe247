import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { rootApi } from "data/api/configApi";
import { toast } from "react-toastify";

export const UserAuthApi = {
    Login: async (userName, pass, dispatch, LoginSuccess, router) => {
        await rootApi({
            method: "POST",
            url: "/users/auth/login",
            data: { userName, pass }
        }).then((res) => {
            toast.success(res?.data?.mess)
            dispatch(LoginSuccess(res?.data));
            router.replace("/");
        }).catch((err) => {
            if (err.response) {
                toast.error(err?.response?.data?.error);
            } else {
                toast.error(err);
            }
        })
    },
    Register: async (userName, pass, pass2, phone, email) => {
        await rootApi({
            method: "POST",
            url: "/users/auth/register",
            data: { userName, pass, pass2, phone, email }
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
    Logout: async (dispatch, ActionSuccess, router) => {
        await rootApi({
            method: "GET",
            url: "/users/auth/logout",
        }).then((res) => {
            toast.success("Logout success!");
            dispatch(ActionSuccess());
            router.replace("/")
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    RefreshUser: async (dispatch, accessToken, idUser, RefreshUserSuccess) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
        await axiosJwt({
            method: "GET",
            url: `/users/auth/${idUser}`,
            headers: {
                token: "Bearner " + accessToken
            },
        }).then((res) => {
            dispatch(RefreshUserSuccess(res.data.User))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    SendAuthEmail: async (dispatch, accessToken, idUser) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
        await axiosJwt({
            method: "POST",
            url: `/users/auth/${idUser}`,
            headers: {
                token: "Bearner " + accessToken
            },
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
    SendKeyAuthEmail: async (accessToken, dispatch, hashEmail) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
        await axiosJwt({
            method: "POST",
            url: `/auth_email/${hashEmail}`,
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