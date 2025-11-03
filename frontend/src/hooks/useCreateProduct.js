import { useState } from "react";
import Swal from "sweetalert2";
import { createProduct } from "../../api/products.api";

export default function useCreateProduct({ onSuccess } = {}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (productData) => {
        try {
            setLoading(true);
            const data = await createProduct(productData);

            Swal.fire({
                icon: "success",
                title: "Producto creado",
                text: "El producto ha sido creado correctamente",
            });

            if (onSuccess) onSuccess(data);
        } catch (err) {
            console.err("Error al crear el producto");
            setError(err);
            Swal.fire("Error", "Error al crear el producto", "error");
        } finally {
            setLoading(false);
        }
    };

    return { createProduct: handleCreate, loading, error };
}
