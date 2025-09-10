import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { Pokemon } from "../models/Pokemon";
import { PokemonDetailSchema, PokemonListSchema } from "../schemas/pokemon-schema";
import { generatePrice, generateStock } from "../helpers/poke-helpers";

type UsePokeStoreProps = {
    pokemons: Pokemon[];
    getPokemons: () => Promise<void>;
};

const API_URL = import.meta.env.VITE_API_URL;

export const usePokeStore = create<UsePokeStoreProps>()(
    devtools((set) => ({
        pokemons: [],

        getPokemons: async () => {
            try {
                const response = await axios.get(API_URL);
                const parsedList = PokemonListSchema.parse(response.data);

                const detailedPokemons: Pokemon[] = await Promise.all(
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

                set({ pokemons: detailedPokemons });
            } catch (error) {
                console.log(error);
            }
        },
    }))
);
