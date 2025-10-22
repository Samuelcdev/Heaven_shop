import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AdminLayout>
                            <Dashboard />
                        </AdminLayout>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}
