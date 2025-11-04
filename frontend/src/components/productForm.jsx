import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import useCreateProduct from "../hooks/useCreateProduct";
import useCategories from "../hooks/useCategories";

export default function ProductForm({ onClose, onCreated }) {
    const { createProduct, loading } = useCreateProduct({
        onSuccess: onCreated,
    });
    const { categories, loading: loadingCategories } = useCategories();

    const [form, setForm] = useState({
        id_category: "",
        name_product: "",
        description_product: "",
        price_product: "",
        status_product: "active",
        image_product: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProduct(form);
        onClose();
    };

    return (
        <dialog open className="modal">
            <div className="modal-box max-w-lg p-6">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <FaBoxOpen className="text-primary" />
                    Crear producto
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <select
                        name="id_category"
                        className="select select-bordered- w-full"
                        value={form.id_category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {loadingCategories ? (
                            <option disabled>Cargando ...</option>
                        ) : (
                            categories.map((c) => (
                                <option
                                    key={c.id_category}
                                    value={c.id_category}
                                >
                                    {c.name_category}
                                </option>
                            ))
                        )}
                    </select>

                    <input
                        type="text"
                        name="name_product"
                        placeholder="Nombre del producto"
                        className="input input-bordered w-full"
                        value={form.name_product}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description_product"
                        placeholder="Descripción"
                        className="textarea textarea-bordered w-full"
                        value={form.description_product}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price_product"
                        placeholder="Precio"
                        className="input input-bordered w-full"
                        value={form.price_product}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="status_product"
                        className="select select-bordered w-full"
                        value={form.status_product}
                        onChange={handleChange}
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>

                    <input
                        type="text"
                        name="image_product"
                        placeholder="URL de imagen"
                        className="input input-bordered w-full"
                        value={form.image_product}
                        onChange={handleChange}
                    />

                    {form.image_product && (
                        <img
                            src={form.image_product}
                            alt="Vista previa"
                            className="w-full h-48 object-cover rounded-lg mt-2 shadow-md"
                        />
                    )}

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
