import { toast } from "react-toastify";
import { rootApi } from "../configApi";

export const AuthApi = {
    Login: async (userName, pass, dispatch, LoginSuccess, router) => {
        await rootApi({
            method: "POST",
            url: "/users/authen/login",
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
    Register: async (userName, pass, phone, email) => {
        await rootApi({
            method: "POST",
            url: "/users/authen/register",
            data: { userName, pass, phone, email }
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
            url: "/users/authen/logout",
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
    }
}