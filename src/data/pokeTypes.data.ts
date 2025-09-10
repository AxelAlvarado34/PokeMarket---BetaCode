export interface PokemonType {
    value: string;
    label: string;
}

export const pokemonTypes: PokemonType[] = [
    { value: "normal", label: "Normal" },
    { value: "fire", label: "Fuego" },
    { value: "water", label: "Agua" },
    { value: "electric", label: "Eléctrico" },
    { value: "grass", label: "Planta" },
    { value: "ice", label: "Hielo" },
    { value: "fighting", label: "Lucha" },
    { value: "poison", label: "Veneno" },
    { value: "ground", label: "Tierra" },
    { value: "flying", label: "Volador" },
    { value: "psychic", label: "Psíquico" },
    { value: "bug", label: "Bicho" },
    { value: "rock", label: "Roca" },
    { value: "ghost", label: "Fantasma" },
    { value: "dragon", label: "Dragón" }
];
