import { useState, useEffect, useCallback } from "react";
import * as productsApi from "../../api/products.api";

export default function useProducts(initial = { page: 1, limit: 10 }) {
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await productsApi.fetchProducts({
                page,
                limit,
                search,
            });

            if (Array.isArray(data)) {
                setItems(data);
                setTotalItems(data.length);
                setTotalPages(1);
            } else {
                setItems(data.products || data.rows || data.items || []);
                setTotalItems(data.total || data.totalProducts || 0);
                setTotalPages(
                    data.totalPages || Math.ceil((data.total || 0) / limit)
                );
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        items,
        totalItems,
        totalPages,
        page,
        limit,
        loading,
        error,
        setPage,
        setLimit,
        setSearch,
        reload: load,
    };
}
