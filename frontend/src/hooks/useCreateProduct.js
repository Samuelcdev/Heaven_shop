import { useState } from "react";
import Swal from "sweetalert2";
import { createProduct } from "../../api/products.api";

export default function useCreateProduct({ onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (data) => {
        const result = await Swal.fire({
            title: "¿Crear Producto?",
            text: "Se creara un nuevo producto en el sistema",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si, crear producto",
            cancelButtonText: "No, cancelar",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);
            setError(null);

            await createProduct(data);

            Swal.fire(
                "Creado",
                "El producto ha sido creado correctamente",
                "success"
            );

            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Error al crear el producto", err);
            setError(err);
            Swal.fire("Error", "El producto no se pudo crear", "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        createProduct: handleCreate,
        loading,
        error,
    };
}
