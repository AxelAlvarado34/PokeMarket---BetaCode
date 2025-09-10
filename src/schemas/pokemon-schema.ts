import { z } from 'zod'

export const PokemonListSchema = z.object({
    results: z.array(
        z.object({
            name: z.string(),
            url: z.string(),
        })
    ),
});


export const PokemonDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    sprites: z.object({
        front_default: z.string().nullable(),
        other: z
            .object({
                "official-artwork": z.object({
                    front_default: z.string().nullable(),
                }),
            })
            .optional(),
    }),
    types: z.array(
        z.object({
            slot: z.number(),
            type: z.object({
                name: z.string(),
                url: z.string(),
            }),
        })
    ),
});
