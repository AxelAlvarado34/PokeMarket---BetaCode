import { CartItem } from "../models/Cart";
import PokemonCartItem from "./PokemonCartItem";
import { NavLink } from "react-router-dom";

type CartDropdownProps = {
    cartItems: CartItem[];
    isOpen: boolean;
    onClose: () => void;
};

export default function CartDropdown({ cartItems, isOpen, onClose }: CartDropdownProps) {
    if (!isOpen) return null;

    return (
        <div
            className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 z-50"
            onClick={(e) => e.stopPropagation()}
        >
            {cartItems.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">Tu carrito está vacío</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <PokemonCartItem key={item.pokemon.id} item={item} />
                    ))}

                    <div className="p-5">
                        <NavLink
                            to="/pay"
                            className="block w-full bg-white border border-black px-4 py-2 text-sm font-bold uppercase tracking-wide text-black text-center hover:bg-black hover:text-white transition rounded-none"
                            onClick={onClose}
                        >
                            PAGAR
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
}
