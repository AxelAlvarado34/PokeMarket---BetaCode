import { FaBox } from "react-icons/fa6";
import styles from "../styles/CardPokemon.module.css";
import type { Pokemon } from "../models/Pokemon";


interface PokemonCardProps {
    pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className={styles.card}>
            <div
                className={`${styles.cardImageContainer} ${styles[`cardImage-${pokemon.types[0]}`] || styles.cardImage_default}`}
            >
                <img src={pokemon.image} alt={pokemon.name} className={styles.cardImage} />
            </div>

            <div
                className={`${styles.cardBody} ${styles[`cardBody-${pokemon.types[0]}`] || styles.cardBody_default}`}
            >
                <p className={styles.cardName}>{pokemon.name}</p>
                <p className={styles.cardPrice}>${pokemon.price}</p>
                <div className={styles.stock_sec}>
                    <FaBox className={styles.stock_icon} />
                    <span className={styles.cardStock}>Stock: {pokemon.stock}</span>
                </div>
                <div className={styles.cardTypes}>
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className={`${styles.typeBadge} ${styles[`type-${type}`] || styles.type_default}`}
                        >
                            {type}
                        </span>
                    ))}
                </div>
                <button className={styles.addButton}>Agregar al carrito</button>
            </div>
        </div>
    );
}
