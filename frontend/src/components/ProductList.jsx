import React, { useEffect } from "react";
import useProducts from "../hooks/useProducts.js";

export default function ProductsList() {
    const {
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
        reload,
    } = useProducts({ page: 1, limit: 10 });

    useEffect(() => {
        document.title = `Productos ${totalItems}`;
    }, [totalItems]);

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="input input-sm"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="select select-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <button className="btn btn-sm" onClick={reload}>
                    Actualizar
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Cargando...</div>
            ) : error ? (
                <div className="text-red-500">Error: {error.message}</div>
            ) : (
                <>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock/Variantes</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((p) => (
                                <tr key={p.id_product ?? p.id}>
                                    <td>{p.id_product ?? p.id}</td>
                                    <td>{p.name_product}</td>
                                    <td>{p.category?.name_category ?? "-"}</td>
                                    <td>
                                        $
                                        {Number(p.price_product ?? 0).toFixed(
                                            2
                                        )}
                                    </td>
                                    <td>
                                        {p.stock_product ??
                                            (p.variants?.length || "-")}
                                    </td>
                                    <td>{p.status_product ?? "-"}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm mr-2">
                                            Ver
                                        </button>
                                        <button className="btn btn-ghost btn-sm">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            Página {page} de {totalPages} — {totalItems}{" "}
                            productos
                        </div>
                        <div className="btn-group">
                            <button
                                className="btn btn-sm"
                                disabled={page <= 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Anterior
                            </button>
                            <button
                                className="btn btn-sm"
                                disabled={page >= totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
