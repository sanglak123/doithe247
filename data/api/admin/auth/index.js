import { rootApi } from "data/api/configApi";
import { toast } from "react-toastify"

const AuthenAdminApi = {
    Login: async (idUser, axiosJwt, accessToken, pass2, key, router, dispatch, LoginAdminSuccess) => {
        const toastId =toast.loading("Please wait...")
        await axiosJwt({
            method: "POST",
            url: `/admin/auth/login/${idUser}`,
            data: {
                pass2: pass2, key: key
            },
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            toast.update(toastId, { render: res.data.mess, type: "success", isLoading: false });
            dispatch(LoginAdminSuccess(res.data.LoginAdmin));
            router.replace("/admin/dashboard");
            setTimeout(() => {
                toast.dismiss(toastId)
            }, 2000);
        }).catch((err) => {
            if (err.response) {
                toast.update(toastId, { render: err.response.data.error, type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 2000);
            } else {
                toast.update(toastId, { render: err, type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 2000);
            }
        })
    },
    Register: async (userName, displayName, fullName, adress, pass, pass2, email, phone, key, router) => {
        const toastId = toast.loading("Please wait...");
        await rootApi({
            method: "POST",
            url: "/admin/auth/register",
            data: {
                userName, displayName, fullName, adress, pass, pass2, email, phone, key
            }
        }).then((res) => {
            toast.update(toastId, { render: res.data.mess, type: "success", isLoading: false });
            router.push("/login")
            setTimeout(() => {
                toast.dismiss(toastId);
            }, 2000);
        }).catch((err) => {
            if (err.response) {
                toast.update(toastId, { render: err.response.data.error, type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 2000);
            } else {
                toast.update(toastId, { render: err, type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 2000);
            }
        })
    }
};

export default AuthenAdminApi;