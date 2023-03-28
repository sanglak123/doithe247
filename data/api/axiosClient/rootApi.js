import axios from "axios"

export const baseURL = process.env.NEXT_PUBLIC_HOST + "/api"
// export const baseURL = "https://doithe247.vercel.app/api";

export const rootApi = axios.create({
    baseURL: baseURL,
})
