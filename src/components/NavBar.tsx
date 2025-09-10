import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { HiOutlineMenu, HiOutlineSearch } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { usePokeStore } from "../store/poke-store";
import { CartItem } from "../models/Cart";
import PokemonCartItem from "./PokemonCartItem";

export default function NavBar() {

    const marketplace = usePokeStore((state) => state.marketplace);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const setSearchTerm = usePokeStore(state => state.setSearchTerm)

    const cartItems: CartItem[] = marketplace.cart.items;

    const cartCount = marketplace.cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Fade triggerOnce={true} className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <nav className="flex flex-col md:flex-row md:justify-between md:items-center py-5 px-10">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center gap-1">
                        <img className="w-10" src="/pokeball.png" alt="poke-icon" />
                        <img className="w-40" src="/pokeText.png" alt="poke-text" />
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <div className="relative cursor-pointer">
                            <HiOutlineShoppingBag
                                className="text-3xl hover:text-red-500 transition"
                                onClick={() => setIsCartOpen(!isCartOpen)}
                            />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                    {cartCount}
                                </span>
                            )}

                            {isCartOpen && (
                                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    {cartItems.length === 0 ? (
                                        <p className="p-4 text-sm text-gray-500">Tu carrito está vacío</p>
                                    ) : (
                                        cartItems.map((item) => (
                                            <PokemonCartItem key={item.pokemon.id} item={item} />
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <HiOutlineMenu className="text-3xl" />
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
                        <HiOutlineSearch className="text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Buscar Pokémon por su nombre..."
                            className="bg-transparent outline-none px-2 w-full text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                        <HiOutlineShoppingBag className="text-3xl hover:text-red-500 transition" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                {cartCount}
                            </span>
                        )}

                        {isCartOpen && (
                            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                {cartItems.length === 0 ? (
                                    <p className="p-4 text-sm text-gray-500">Tu carrito está vacío</p>
                                ) : (
                                    cartItems.map(item => (
                                        <PokemonCartItem key={item.pokemon.id} item={item} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="flex flex-col gap-4 mt-4 md:hidden">
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <HiOutlineSearch className="text-gray-500 text-lg" />
                            <input
                                type="text"
                                placeholder="Buscar Pokémon por su nombre..."
                                className="bg-transparent outline-none px-2 w-full text-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </nav>
        </Fade>
    );
}
