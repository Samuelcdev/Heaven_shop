import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accesToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("accesToken");
        }
        return Promise.reject(err);
    }
);

export default api;
