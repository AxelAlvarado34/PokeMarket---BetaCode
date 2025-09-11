import { useState } from "react";
import type { Pokemon } from "../models/Pokemon";
import styles from "../styles/AdminPage.module.css";
import { notifyError, notifySucces } from "../helpers/notify";

interface PokemonTableProps {
    pokemons: Pokemon[];
    updateStock: (id: number, newStock: number) => void;
}

export default function PokemonTable({ pokemons, updateStock }: PokemonTableProps) {
    return (
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
                {pokemons.map((poke) => {
                    const [stock, setStock] = useState(poke.stock);

                    const handleSave = () => {
                        try {
                            if (stock < 0) throw new Error("El stock no puede ser negativo");
                            updateStock(poke.id, stock);
                            notifySucces(`Stock de ${poke.name} actualizado a ${stock}`);
                        } catch (error: any) {
                            notifyError(error.message || "Error al actualizar stock");
                        }
                    };

                    return (
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
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    className={styles.inputStock}
                                />
                            </td>
                            <td className={styles.td}>
                                <button onClick={handleSave} className={styles.btnSave}>
                                    Guardar
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
