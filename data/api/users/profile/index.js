import {toast} from "react-toastify"
import {CreateAxiosInstance} from "../../axiosClient/createAxiosInstance"

export const UserProfileApi = {
    ChangeAvatar: async (accessToken, dispatch, idUser, photo) => {
        const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
        const formData = new FormData()
        formData.append("photo", photo)

        await axiosJwt({
            method: "PUT",
            url: `/users/${idUser}/profiles/change_avatar`,
            data: formData,
            headers: {
                token: "Bearner " + accessToken,
            },
        })
            .then(res => {
                toast.success(res.data.mess)
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
    },
}
