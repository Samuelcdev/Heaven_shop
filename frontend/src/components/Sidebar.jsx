import { FaTachometerAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
    return (
        <aside
            className={`${
                open ? "w-64" : "w-20"
            } bg-base-200 p-4 transition-all duration-300 flex flex-col shadow-lg`}
        >
            <div className="flex items-center justify-between mb-6">
                <h2
                    className={`font-bold text-2xl transition-all duration-300 ${
                        open ? "opacity-100" : "opacity-0 hidden"
                    }`}
                >
                    Heaven Shop
                </h2>
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <FaBars />
                </button>
            </div>
            <nav className="flex flex-col gap-3">
                <Link to="/" className="btn btn-ghost justify-start">
                    <FaTachometerAlt /> {open && <span>Dashboard</span>}
                </Link>
            </nav>
        </aside>
    );
}
