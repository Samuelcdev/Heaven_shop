import { useState } from "react";
import Swal from "sweetalert2";
import { deleteProduct } from "../../api/products.api";

export default function useDeleteProduct({ onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id_product) => {
        const result = await Swal.fire({
            title: "¿Estas seguro?",
            text: "Esta accion no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);
            setError(null);

            await deleteProduct(id_product);

            Swal.fire("Eliminado", "El producto ha sido eliminado", "success");

            if (onSuccess) onSuccess();
        } catch (err) {
            console.err("Error al eliminar", err);
            setError(err);
            Swal.fire("Error", "Error al eliminar el producto", "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteProduct: handleDelete,
        loading,
        error,
    };
}
