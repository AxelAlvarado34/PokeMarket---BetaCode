import { CartItem } from "../models/Cart";

type PokemonCartItemProps = {
    item: CartItem;
};

export default function PokemonCartItem({ item }: PokemonCartItemProps) {
    const { pokemon, quantity } = item;

    return (
        <div className="flex items-center gap-3 p-2 border-b border-gray-200 last:border-none">
            <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
                <p className="text-sm font-medium">{pokemon.name}</p>
                <p className="text-xs text-gray-500">${pokemon.price} x {quantity}</p>
            </div>
        </div>
    );
}
