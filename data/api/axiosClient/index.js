import axios from "axios";
import jwt from "jsonwebtoken";

const baseURL = "http://localhost:3000/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
axiosInstance.interceptors.request.use(async (config) => {
    const d = new Date();
    const decoToken = jwt.decode(user?.accesstoken)

    return config
}, err => {
    return Promise.reject(err)
});

axiosInstance.interceptors.response.use((responsive) => {
    console.log("sau reqquest");

    return responsive
}, err => {
    return Promise.reject(err)
});

export default axiosInstance;