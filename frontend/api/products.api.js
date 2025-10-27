import api from "./axios.js";

export const fetchProducts = async ({
    page = 1,
    search = "",
    status = "",
} = {}) => {
    const params = { page };
    if (search) params.search = search;
    if (status) params.status = status;
    const res = await api.get("/product/paginated", { params });
    return res.data;
};
