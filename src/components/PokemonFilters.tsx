import type { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { pokemonTypes } from "../data/pokeTypes.data";
import { sortOptions } from "../data/sortOptions.data";
import styles from "../styles/PokemonList.module.css";

interface PokemonFiltersProps {
    typeFilter: string;
    setTypeFilter: Dispatch<SetStateAction<string | "">>;
    priceRange: { min: number; max: number };
    setPriceRange: Dispatch<SetStateAction<{ min: number; max: number }>>;
    sortOption: "name" | "priceAsc" | "priceDesc" | "";
    setSortOption: Dispatch<SetStateAction<"name" | "priceAsc" | "priceDesc" | "">>;
}

export default function PokemonFilters({
    typeFilter,
    setTypeFilter,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption,
}: PokemonFiltersProps) {
    return (
        <div className={styles.filters}>
            <Select
                options={pokemonTypes}
                value={pokemonTypes.find((t) => t.value === typeFilter)}
                onChange={(selected) => setTypeFilter(selected?.value || "")}
                placeholder="Filtrar por tipo"
                isClearable
                classNamePrefix="pokemon-select"
            />

            <input
                type="number"
                placeholder="Precio mínimo"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className={styles.filterInput}
            />
            <input
                type="number"
                placeholder="Precio máximo"
                value={priceRange.max === Infinity ? "" : priceRange.max}
                onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value ? Number(e.target.value) : Infinity })
                }
                className={styles.filterInput}
            />

            <Select
                options={sortOptions}
                value={sortOptions.find((s) => s.value === sortOption)}
                onChange={(selected) => setSortOption((selected?.value as any) || "")}
                placeholder="Ordenar por"
                isClearable
                classNamePrefix="pokemon-select"
            />
        </div>
    );
}
