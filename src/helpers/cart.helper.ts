import { Cart, CartItem } from "../models/Cart";
import { Marketplace } from "../models/MarketPlace";
import { Pokemon } from "../models/Pokemon";

const CART_KEY = "cart";

export const POKEMONS_KEY = "pokemons";

export const savePokemons = (pokemons: Pokemon[]) => {
    localStorage.setItem(POKEMONS_KEY, JSON.stringify(pokemons));
};

export const saveCart = (cart: Cart) =>
    localStorage.setItem(CART_KEY, JSON.stringify(cart.items));

export const loadCart = (): Cart => {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return new Cart();

    let parsed: { pokemon: Pokemon; quantity: number }[] = [];
    try {
        parsed = JSON.parse(stored) || [];
    } catch {
        parsed = [];
    }

    const cart = new Cart();
    parsed.forEach(({ pokemon, quantity }) =>
        cart.items.push(
            new CartItem(
                new Pokemon(
                    pokemon.id,
                    pokemon.name,
                    pokemon.image,
                    pokemon.types,
                    pokemon.price,
                    pokemon.stock
                ),
                quantity
            )
        )
    );
    return cart;
};

export const updateMarketplace = (set: any, pokemons: Pokemon[], cart: Cart) => {
    saveCart(cart);
    set({ marketplace: Object.assign(new Marketplace(pokemons), { cart }) });
};

export const adjustStock = (pokemons: Pokemon[], pokemonId: number, amount: number): Pokemon[] => {
    return pokemons.map(p =>
        p.id === pokemonId ? new Pokemon(p.id, p.name, p.image, p.types, p.price, p.stock - amount) : p
    );
};
