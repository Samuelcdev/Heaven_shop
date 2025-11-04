import {
    FaSearch,
    FaPencilRuler,
    FaRegTrashAlt,
    FaPlus,
    FaSync,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import useDeleteProduct from "../hooks/useDeleteProduct.js";
import useProducts from "../hooks/useProducts.js";
import ProductCard from "./ProductCard.jsx";
import ProductForm from "./productForm.jsx";

export default function ProductsList() {
    const {
        items,
        totalItems,
        totalPages,
        page,
        status,
        loading,
        error,
        setPage,
        setStatus,
        setSearch,
        reload,
    } = useProducts({ page: 1, limit: 10 });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const { deleteProduct: handleDelete, loading: deleting } = useDeleteProduct(
        {
            onSuccess: reload,
        }
    );

    useEffect(() => {
        document.title = `Productos ${totalItems}`;
    }, [totalItems]);

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <label className="input w-sm">
                        <FaSearch />
                        <input
                            type="text"
                            required
                            placeholder="Nombre del producto"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </label>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="select"
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>
                <div className="flex gap-3">
                    <button
                        className="btn btn-md bg-blue-400/50"
                        onClick={() => setShowCreate(true)}
                    >
                        <FaPlus />
                        Crear producto
                    </button>
                    <button className="btn btn-md" onClick={reload}>
                        <FaSync />
                        Actualizar
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Cargando...</div>
            ) : error ? (
                <div className="text-red-500">Error: {error.message}</div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead className="text-center text-black bg-blue-400/50">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre del Producto</th>
                                    <th>Descripción</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock Variantes</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {items.map((p) => (
                                    <tr key={p.id_product ?? p.id}>
                                        <td>{p.id_product ?? p.id}</td>
                                        <td>{p.name_product}</td>
                                        <td>{p.description_product}</td>
                                        <td>
                                            {p.category?.name_category ?? "-"}
                                        </td>
                                        <td>
                                            $
                                            {Number(
                                                p.price_product ?? 0
                                            ).toFixed()}
                                        </td>
                                        <td>
                                            {p.stock_variant ??
                                                (p.variants?.length || "-")}
                                        </td>
                                        <td>
                                            <span
                                                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                                                    p.status_product ===
                                                    "active"
                                                        ? "bg-green-200 text-green-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                            >
                                                {p.status_product === "active"
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() => {
                                                        setSelectedProduct(p);
                                                    }}
                                                >
                                                    <FaPencilRuler />
                                                </button>
                                                <button
                                                    className="btn btn-error"
                                                    onClick={() =>
                                                        handleDelete(
                                                            p.id_product
                                                        )
                                                    }
                                                    disabled={deleting}
                                                >
                                                    <FaRegTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="join flex flex-row gap-5 mt-4">
                        <button
                            className="join-item btn btn-outline btn-sm"
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Anterior
                        </button>
                        <button
                            className="join-item btn btn-outline btn-sm"
                            disabled={page >= totalPages}
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {selectedProduct && (
                <ProductCard
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {showCreate && (
                <ProductForm
                    onClose={() => setShowCreate(false)}
                    onCreated={reload}
                />
            )}
        </div>
    );
}
