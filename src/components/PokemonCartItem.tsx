import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { CartItem } from "../models/Cart";
import { usePokeStore } from "../store/poke-store";
import { FiShoppingCart } from "react-icons/fi";

type PokemonCartItemProps = {
    item: CartItem;
};

export default function PokemonCartItem({ item }: PokemonCartItemProps) {
    const { pokemon, quantity } = item;
    const incrementQuantity = usePokeStore((state) => state.incrementQuantity);
    const decrementQuantity = usePokeStore((state) => state.decrementQuantity);

    return (
        <div className="flex items-center gap-3 p-2 border-b border-gray-200 last:border-none">
            <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
                <p className="text-sm font-medium">{pokemon.name}</p>
                <p className="text-xs text-gray-500 flex gap-1 mt-1 items-center">
                    <RiMoneyDollarCircleFill className={``} />{pokemon.price}
                    <FiShoppingCart className={``} />{quantity}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => decrementQuantity(pokemon.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                    −
                </button>
                <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                <button
                    onClick={() => incrementQuantity(pokemon.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                    +
                </button>
            </div>
        </div>
    );
}
