import { useEffect, useState } from "react";
import { usePokeStore } from "../store/poke-store";
import styles from "../styles/PokemonList.module.css";
import PokemonCard from "./PokemonCard";

const ITEMS_PER_PAGE = 9;

export default function PokemonList() {

    const marketplace = usePokeStore((state) => state.marketplace);
    const searchTerm = usePokeStore((state) => state.searchTerm);

    const filteredPokemons = searchTerm ? marketplace.searchByName(searchTerm) : marketplace.pokemons;

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
