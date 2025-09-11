import { useEffect, useState } from "react";
import { usePokeStore } from "../store/poke-store";
import { Marketplace } from "../models/MarketPlace";
import SearchBar from "../components/SearchBar";
import styles from "../styles/AdminPage.module.css";
import PokemonFilters from "../components/PokemonFilters";
import { useNavigate } from "react-router-dom";


const ITEMS_PER_PAGE = 9;

export default function AdminPage() {
    const marketplace = usePokeStore((state) => state.marketplace);
    const searchTerm = usePokeStore((state) => state.searchTerm);

    const [typeFilter, setTypeFilter] = useState<string | "">("");
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
    const [sortOption, setSortOption] = useState<"name" | "priceAsc" | "priceDesc" | "">("");
    const [currentPage, setCurrentPage] = useState(1);

    let filteredPokemons = marketplace.pokemons;

    if (searchTerm) filteredPokemons = marketplace.searchByName(searchTerm);
    if (typeFilter) filteredPokemons = filteredPokemons.filter((p) => marketplace.filterByType(typeFilter).includes(p));
    filteredPokemons = filteredPokemons.filter((p) => marketplace.filterByPrice(priceRange.min, priceRange.max).includes(p));
    if (sortOption) filteredPokemons = new Marketplace(filteredPokemons).sortBy(sortOption);

    const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPokemons = filteredPokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => { setCurrentPage(1); }, [searchTerm, filteredPokemons.length]);

    const updateStock = (id: number, newStock: number) => marketplace.updateStock(id, newStock);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const navigate = useNavigate();
    const handleLogout = () => {
        usePokeStore.getState().setSearchTerm("");
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoTitle}>
                    <img className={styles.pokeIcon} src="/pokeball.png" alt="poke-icon" />
                    <h1 className={styles.title}>Panel de Administrador</h1>
                </div>
                <button onClick={handleLogout} className={styles.btnLogout}>
                    Cerrar sesión
                </button>
            </div>


            <div className={styles.filters}>
                <div className={`${styles.filterItem} ${styles.searchBar}`}>
                    <SearchBar onSearch={usePokeStore.getState().setSearchTerm} fullWidth />
                </div>

                <PokemonFilters
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>Imagen</th>
                            <th className={styles.th}>Nombre</th>
                            <th className={styles.th}>Tipo</th>
                            <th className={styles.th}>Precio</th>
                            <th className={styles.th}>Stock</th>
                            <th className={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPokemons.map((poke) => (
                            <tr key={poke.id}>
                                <td className={styles.td}>
                                    <img src={poke.image} alt={poke.name} className="w-14 h-14 mx-auto" />
                                </td>
                                <td className={styles.td}>{poke.name}</td>
                                <td className={styles.td}>
                                    {poke.types.map((type) => (
                                        <span key={type} className={`${styles.pill} ${styles[`type-${type}`]}`}>
                                            {type}
                                        </span>
                                    ))}
                                </td>
                                <td className={styles.td}>${poke.price}</td>
                                <td className={styles.td}>
                                    <input
                                        type="number"
                                        value={poke.stock}
                                        onChange={(e) => updateStock(poke.id, Number(e.target.value))}
                                        className={styles.inputStock}
                                    />
                                </td>
                                <td className={styles.td}>
                                    <button onClick={() => updateStock(poke.id, poke.stock)} className={styles.btnSave}>
                                        Guardar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={styles.btnPage}>Anterior</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 1} className={styles.btnPage}>Siguiente</button>
            </div>
        </div>
    );
}
