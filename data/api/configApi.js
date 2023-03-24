import axios from "axios";

// const baseURL = "http://localhost:3000/api";
const baseURL = "https://doithe247.vercel.app/api";

export const rootApi = axios.create({
    baseURL: baseURL
});



