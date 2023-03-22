import { CreateAxiosInstance } from "data/api/axiosClient/createAxiosInstance";
import { rootApi } from "data/api/configApi";
import { toast } from "react-toastify"

const AdminAutheApi = {
    Login: async (userName, pass, pass2, keyAdmin, dispatch, LoginSuccess, router) => {
        const idToast = toast.loading("Please wait...")
        await rootApi({
            method: "POST",
            url: "/admin/auth/login",
            data: {
                userName, pass, pass2, keyAdmin
            }
        }).then((res) => {
            toast.update(idToast, { render: res.data.mess, type: "success", isLoading: false });
            dispatch(LoginSuccess(res.data));
            router.replace("/admin/dashboard")
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
    },
    ChangeAvatar: async (accessToken, dispatch, photo) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken, idUser);
        await axiosJwt({
            method: "PUT",
            url: `/users/${idUser}/change_avatar`,
            data: formData
        }).then((res) => {
            toast.success(res.data.mess);
            dispatch(RefreshUserSuccess(res.data.User))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    EditProfile: async (accessToken, dispatch, idUser, displayName, fullName, phone, adress, photo, email, RefreshUserSuccess) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
        const formData = new FormData();
        formData.append("displayName", displayName);
        formData.append("fullName", fullName);
        formData.append("phone", phone);
        formData.append("adress", adress);
        formData.append("photo", photo);
        formData.append("email", email);

        await axiosJwt({
            method: "PUT",
            url: "",
            data: formData
        }).then((res) => {
            toast.success(res.data.mess);
            dispatch(RefreshUserSuccess(res.data.User))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })

    }
};

export default AdminAutheApi;