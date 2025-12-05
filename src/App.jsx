import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Layout } from "./layout";
import { Products } from "./pages/products/products";
import "./theme.css";
import { AddProduct } from "./pages/products/AddProduct";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/add-product" element={<AddProduct />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
