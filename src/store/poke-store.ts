import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { Pokemon } from "../models/Pokemon";
import { PokemonDetailSchema, PokemonListSchema } from "../schemas/pokemon-schema";
import { generatePrice, generateStock } from "../helpers/poke-helpers";
import { Marketplace } from "../models/MarketPlace";
import { loadCart, updateMarketplace } from "../helpers/cart.helper";

type UsePokeStoreProps = {
    pokemons: Pokemon[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    getPokemons: () => Promise<void>;
    addToCart: (pokemon: Pokemon) => void;
    incrementQuantity: (pokemonId: number) => void;
    decrementQuantity: (pokemonId: number) => void;
    marketplace: Marketplace;
};

const API_URL = import.meta.env.VITE_API_URL;

export const usePokeStore = create<UsePokeStoreProps>()(
    devtools((set, get) => ({
        pokemons: [],
        searchTerm: "",
        setSearchTerm: (term: string) => set({ searchTerm: term }),
        marketplace: new Marketplace([]),

        addToCart: (pokemon: Pokemon) => {
            const store = get();
            store.marketplace.cart.addToCart(pokemon);
            updateMarketplace(set, store.pokemons, store.marketplace.cart);
        },

        incrementQuantity: (pokemonId: number) => {
            const store = get();
            const item = store.marketplace.cart.items.find(i => i.pokemon.id === pokemonId);
            if (item) item.increaseQuantity();
            updateMarketplace(set, store.pokemons, store.marketplace.cart);
        },

        decrementQuantity: (pokemonId: number) => {
            const store = get();
            const item = store.marketplace.cart.items.find(i => i.pokemon.id === pokemonId);
            if (item) {
                item.decreaseQuantity();
                if (item.quantity === 0) store.marketplace.cart.removeItem(pokemonId);
            }
            updateMarketplace(set, store.pokemons, store.marketplace.cart);
        },

        getPokemons: async () => {
            try {
                const response = await axios.get(API_URL);
                const parsedList = PokemonListSchema.parse(response.data);

                const storedPokemons = localStorage.getItem("pokemons");
                let detailedPokemons: Pokemon[];

                if (storedPokemons) {
                    detailedPokemons = JSON.parse(storedPokemons);
                } else {
                    detailedPokemons = await Promise.all(
                        parsedList.results.map(async (poke) => {
                            const detailRes = await axios.get(poke.url);
                            const detail = PokemonDetailSchema.parse(detailRes.data);

                            return new Pokemon(
                                detail.id,
                                detail.name,
                                detail.sprites.other?.["official-artwork"]?.front_default ??
                                detail.sprites.front_default ?? "",
                                detail.types.map((t) => t.type.name),
                                generatePrice(),
                                generateStock()
                            );
                        })
                    );
                    localStorage.setItem("pokemons", JSON.stringify(detailedPokemons));
                }

                const cart = loadCart();
                updateMarketplace(set, detailedPokemons, cart);

                set({ pokemons: detailedPokemons });
            } catch (error) {
                console.log(error);
            }
        },
    }))
);
