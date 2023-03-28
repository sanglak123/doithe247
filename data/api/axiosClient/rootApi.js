import axios from "axios"
export const baseURL = "https://doithe247.vercel.app/api"
// const baseURL = "http://localhost:3000/api"

export const rootApi = axios.create({
    baseURL: baseURL,
})
