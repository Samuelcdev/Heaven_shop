import api from "./axios.js";

export const totalValueInventory = async () => {
    const res = await api.get("/report/inventory/");
    return res.data
}

