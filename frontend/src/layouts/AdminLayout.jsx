import { useState, cloneElement } from "react";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar open={open} setOpen={setOpen} />

            <main className="flex-1 p-6">
                {cloneElement(children, { sidebarOpen: open })}
            </main>
        </div>
    );
}
