import type z from "zod";
import type { PokemonDetailSchema, PokemonListSchema } from "../schemas/pokemon-schema";


export type LoginFormData = {
    email: string,
    password: string
}

export type PokemonStoreType = {
    id: number;
    name: string;
    image: string;
    types: string[];
    price: number;
    stock: number;
};

export type PokemonListType = z.infer<typeof PokemonListSchema>;
export type PokemonDetailType = z.infer<typeof PokemonDetailSchema>