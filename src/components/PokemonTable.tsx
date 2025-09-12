import type { Pokemon } from "../models/Pokemon";
import styles from "../styles/AdminPage.module.css";
import PokemonRow from "./PokemonRow";

type PokemonTableProps = {
    pokemons: Pokemon[];
    updateStock: (id: number, newStock: number) => void;
};

const PokemonTable: React.FC<PokemonTableProps> = ({ pokemons, updateStock }) => (
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
            {pokemons.map((poke) => (
                <PokemonRow key={poke.id} poke={poke} updateStock={updateStock} />
            ))}
        </tbody>
    </table>
);

export default PokemonTable;
