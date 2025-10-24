import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar open={open} setOpen={setOpen} />

            <main className="flex-1 p-6">
                <Outlet context={{ sidebarOpen: open }} />
            </main>
        </div>
    );
}
