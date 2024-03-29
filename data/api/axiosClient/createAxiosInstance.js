import axios from "axios"
import jwt from "jwt-decode"
import {toast} from "react-toastify"
import {
    LogoutUserSuccess,
    RefreshTokenSuccess,
} from "../../../src/redux/slice/user"
import {baseURL} from "./rootApi"

const handleRefreshToken = async () => {
    try {
        const res = await axios({
            method: "POST",
            url: baseURL + "/token/refreshtoken",
            withCredentials: true,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const CreateAxiosInstance = (dispatch, accessToken) => {
    const instance = axios.create({
        baseURL: baseURL,
    })

    instance.interceptors.request.use(
        async config => {
            const d = new Date()
            if (accessToken) {
                const decoToken = jwt(accessToken)
                if (decoToken.exp - d.getTime() / 1000 < 0) {
                    const data = await handleRefreshToken()
                    dispatch(RefreshTokenSuccess(data.accessToken))
                    config.headers["token"] = "Bearner " + data.accessToken
                }
                return config
            } else {
                dispatch(LogoutUserSuccess())
                toast.error("Hết phiên đăng nhập!")
            }
        },
        err => {
            return Promise.reject(err)
        }
    )

    return instance
}
