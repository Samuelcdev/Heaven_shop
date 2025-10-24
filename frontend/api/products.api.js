import api from "./axios.js";

export const fetchProducts = async ({
    page = 1,
    limit = 10,
    search = "",
    category,
    status,
} = {}) => {
    const params = { page, limit };
    if (search) params.search = search;
    if (category) params.category = category;
    if (status) params.status = status;
    const res = await api.get("/product/", { params });
    return res.data;
};
