import api from "./axios.js";

export const fetchCategories = async () => {
    const res = await api.get("/category");
    return res.data;
};
