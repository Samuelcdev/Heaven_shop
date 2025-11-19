import {
    FaTh,
    FaFileAlt,
    FaUsers,
    FaLongArrowAltUp,
    FaBoxOpen,
} from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import MainCard from "../components/MainCard";
import useInventoryTotalValue from "../hooks/useTotalValueInventory";

export default function Dashboard() {
    const { sidebarOpen } = useOutletContext();
    const {value, reload} = useInventoryTotalValue();
    const services = [
        {
            title: "Productos",
            description:
                "Administra tu inventario, agrega nuevos artículos y controla existencias fácilmente.",
            onAction: "Gestionar",
            icon: FaTh,
        },
        {
            title: "Reportes",
            description:
                "Genera reportes detallados sobre tu inventario y valor total de productos.",
            onAction: "Ver Reportes",
            icon: FaFileAlt,
        },
        {
            title: "Usuarios",
            description:
                "Administra los usuarios, roles y permisos del sistema.",
            onAction: "Administrar",
            icon: FaUsers,
        },
    ];

    return (
        <div className="p-6 space-y-10">
            <header className="text-center md:text-left space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content">
                    Panel de Administración
                </h1>
                <p className="text-base-content/70 text-sm md:text-base">
                    Bienvenido 👋 Aquí podrás gestionar toda la información de
                    tu tienda de manera eficiente.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="flex flex-col justify-between bg-gradient-to-br from-green-400/80 to-green-600/70 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold uppercase tracking-wide">
                            Valor Total del Inventario
                        </h3>
                        <FaLongArrowAltUp className="text-3xl opacity-80" />
                    </div>
                    <p className="text-5xl md:text-6xl font-bold mt-4">
                        {"$ " + new Intl.NumberFormat().format(value)}
                    </p>
                    <span className="text-sm opacity-80 mt-2">
                        Última actualización: Hoy
                    </span>
                </article>

                <article className="flex flex-col justify-between bg-gradient-to-br from-yellow-400/80 to-yellow-600/70 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold uppercase tracking-wide">
                            Total de Productos
                        </h3>
                        <FaBoxOpen className="text-3xl opacity-80" />
                    </div>
                    <p className="text-5xl md:text-6xl font-bold mt-4">1234</p>
                    <span className="text-sm opacity-80 mt-2">
                        En inventario actualmente
                    </span>
                </article>
            </section>

            <section
                className={`grid gap-6 transition-all duration-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
            >
                {services.map((s, i) => (
                    <MainCard
                        key={i}
                        title={s.title}
                        description={s.description}
                        onAction={s.onAction}
                        icon={s.icon}
                        sidebarOpen={sidebarOpen}
                    />
                ))}
            </section>
        </div>
    );
}
