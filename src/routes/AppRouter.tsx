import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketLayout from "../layouts/MarketLayout";
import HomePage from "../pages/HomePage";
import PayPage from "../pages/PayPage";
import { usePokeStore } from "../store/poke-store";
import { useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import { Bounce, ToastContainer } from "react-toastify";
import AdminPage from "../pages/AdminPage";

export default function AppRouter() {

    const getPokemons = usePokeStore(state => state.getPokemons);

    useEffect(() => {
        getPokemons()
    }, [getPokemons])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminPage />} />

                    <Route element={<MarketLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/pay" element={<PayPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
