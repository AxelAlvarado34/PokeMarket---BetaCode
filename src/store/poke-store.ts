import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { Pokemon } from "../models/Pokemon";
import { PokemonDetailSchema, PokemonListSchema } from "../schemas/pokemon-schema";
import { generatePrice, generateStock } from "../helpers/poke-helpers";
import { Marketplace } from "../models/MarketPlace";
import { adjustStock, loadCart, saveCart, savePokemons, } from "../helpers/cart.helper";

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
            if (pokemon.stock <= 0) return;

            store.marketplace.cart.addToCart(pokemon);

            const updatedPokemons = adjustStock(store.pokemons, pokemon.id, 1);

            const updatedMarketplace = new Marketplace(updatedPokemons);
            updatedMarketplace.cart = store.marketplace.cart;

            set({
                pokemons: updatedPokemons,
                marketplace: updatedMarketplace
            });

            saveCart(store.marketplace.cart);
            savePokemons(updatedPokemons);
        },

        incrementQuantity: (pokemonId: number) => {
            const store = get();
            const item = store.marketplace.cart.items.find(i => i.pokemon.id === pokemonId);

            if (item && item.pokemon.stock > 0) item.increaseQuantity();

            const updatedPokemons = adjustStock(store.pokemons, pokemonId, 1)

            const updatedMarketplace = new Marketplace(updatedPokemons);
            updatedMarketplace.cart = store.marketplace.cart;

            set({
                pokemons: updatedPokemons,
                marketplace: updatedMarketplace,
            });

            saveCart(store.marketplace.cart);
            savePokemons(updatedPokemons);
        },

        decrementQuantity: (pokemonId: number) => {
            const store = get();
            const item = store.marketplace.cart.items.find(i => i.pokemon.id === pokemonId);
            if (item) {
                item.decreaseQuantity();
                if (item.quantity === 0) store.marketplace.cart.removeItem(pokemonId);
            }

            const updatedPokemons = adjustStock(store.pokemons, pokemonId, -1);

            const updatedMarketplace = new Marketplace(updatedPokemons);
            updatedMarketplace.cart = store.marketplace.cart;

            set({
                pokemons: updatedPokemons,
                marketplace: updatedMarketplace,
            });

            saveCart(store.marketplace.cart);
            savePokemons(updatedPokemons);
        },

        getPokemons: async () => {
            try {
                const response = await axios.get(API_URL);
                const parsedList = PokemonListSchema.parse(response.data);

                const storedPokemons = localStorage.getItem("pokemons");
                let detailedPokemons: Pokemon[];

                if (storedPokemons) {
                    detailedPokemons = JSON.parse(storedPokemons).map(
                        (p: any) =>
                            new Pokemon(p.id, p.name, p.image, p.types, p.price, p.stock)
                    );
                } else {
                    detailedPokemons = await Promise.all(
                        parsedList.results.map(async (poke) => {
                            const detailRes = await axios.get(poke.url);
                            const detail = PokemonDetailSchema.parse(detailRes.data);

                            return new Pokemon(
                                detail.id,
                                detail.name,
                                detail.sprites.other?.["official-artwork"]?.front_default ??
                                detail.sprites.front_default ??
                                "",
                                detail.types.map((t) => t.type.name),
                                generatePrice(),
                                generateStock()
                            );
                        })
                    );
                    savePokemons(detailedPokemons);
                }

                const cart = loadCart();

                const marketplace = new Marketplace(detailedPokemons);
                marketplace.cart = cart;

                set({
                    pokemons: detailedPokemons,
                    marketplace,
                });

            } catch (error) {
                console.log(error);
            }
        },
    }))
);
