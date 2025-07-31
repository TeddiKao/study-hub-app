import { ACCESS_TOKEN_KEY } from "@auth/constants";
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error);
    }
)

export default api;