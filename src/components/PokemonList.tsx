import { useEffect, useState } from "react";
import { usePokeStore } from "../store/poke-store";
import styles from "../styles/PokemonList.module.css";
import PokemonCard from "./PokemonCard";
import { pokemonTypes } from "../data/pokeTypes.data";
import Select from 'react-select'
import { Marketplace } from "../models/MarketPlace";
import { sortOptions } from "../data/sortOptions.data";


const ITEMS_PER_PAGE = 9;

export default function PokemonList() {

    const marketplace = usePokeStore((state) => state.marketplace);
    const searchTerm = usePokeStore((state) => state.searchTerm);

    const [typeFilter, setTypeFilter] = useState<string | "">("");
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });

    let filteredPokemons = marketplace.pokemons;
    const [sortOption, setSortOption] = useState<"name" | "priceAsc" | "priceDesc" | "">("");

    if (searchTerm) {
        filteredPokemons = marketplace.searchByName(searchTerm);
    }

    if (typeFilter) {
        filteredPokemons = filteredPokemons.filter(p => marketplace.filterByType(typeFilter).includes(p));
    }

    filteredPokemons = filteredPokemons.filter(p => marketplace.filterByPrice(priceRange.min, priceRange.max).includes(p));

    if (sortOption) {
        filteredPokemons = new Marketplace(filteredPokemons).sortBy(sortOption);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPokemons = filteredPokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filteredPokemons.length]);

    return (
        <div className={styles.poke_catalog}>
            <div className={styles.filters}>
                <Select
                    options={pokemonTypes}
                    value={pokemonTypes.find(t => t.value === typeFilter)}
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
                />
                <input
                    type="number"
                    placeholder="Precio máximo"
                    value={priceRange.max === Infinity ? "" : priceRange.max}
                    onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value ? Number(e.target.value) : Infinity })
                    }
                />

                <Select
                    options={sortOptions}
                    value={sortOptions.find(s => s.value === sortOption)}
                    onChange={(selected) => setSortOption(selected?.value as any || "")}
                    placeholder="Ordenar por"
                    isClearable
                    classNamePrefix="pokemon-select"
                />
            </div>
            <div className={styles.pokemon_grid}>
                {currentPokemons.map((poke) => (
                    <PokemonCard key={poke.id} pokemon={poke} />
                ))}
            </div>

            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 1}>
                    Siguiente
                </button>
            </div>
        </div>
    );

}
