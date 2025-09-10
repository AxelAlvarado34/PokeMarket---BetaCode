import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketLayout from "../layouts/MarketLayout";
import HomePage from "../pages/HomePage";
import PayPage from "../pages/PayPage";
import { usePokeStore } from "../store/poke-store";
import { useEffect } from "react";

export default function AppRouter() {

    const getPokemons = usePokeStore(state => state.getPokemons);

    useEffect(() => {
        getPokemons()
    }, [getPokemons])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MarketLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/pay" element={<PayPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
