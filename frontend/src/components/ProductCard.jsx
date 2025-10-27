import { FaBoxOpen } from "react-icons/fa";

export default function ProductCard({ product, onClose }) {
    if (!product) return null;

    return (
        <>
            <dialog open className="modal">
                <div className="modal-box max-w-lg p-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <FaBoxOpen className="text-primary" />
                        {product.name_product}
                    </h3>

                    <div className="space-y-3 text-gray-700">
                        <p>
                            <span className="font-semibold">Descripción:</span>{" "}
                            {product.description_product || "Sin descripción"}
                        </p>

                        <p>
                            <span className="font-semibold">Categoría:</span>{" "}
                            {product.category?.name_category || "Sin categoría"}
                        </p>

                        <p>
                            <span className="font-semibold">Precio:</span> $
                            {Number(product.price_product || 0).toFixed(2)}
                        </p>

                        <p>
                            <span className="font-semibold">Estado:</span>{" "}
                            {product.status_product}
                        </p>
                    </div>

                    {product.image_product && (
                        <img
                            src={product.image_product}
                            alt={product.name_product}
                            className="w-full h-48 object-cover rounded-lg mt-4 shadow-md"
                        />
                    )}

                    <div className="modal-action">
                        <button className="btn" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
