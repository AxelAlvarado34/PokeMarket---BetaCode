import { usePokeStore } from '../store/poke-store';
import styles from '../styles/PayPage.module.css';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FiShoppingCart } from 'react-icons/fi';
import { CartItem } from "../models/Cart";

interface PokemonCardCartProps {
    item: CartItem;
}

const PokemonCardCart = ({ item }: PokemonCardCartProps) => {
    const removeFromCart = usePokeStore((state) => state.decrementQuantity);
    const pokemons = usePokeStore((state) => state.pokemons);

    const currentPokemon = pokemons.find(p => p.id === item.pokemon.id) || item.pokemon;

    return (
        <div className={styles.card}>
            <div className={`${styles.cardImageContainer} ${styles["cardImage-" + item.pokemon.types[0]]}`}>
                <img
                    src={item.pokemon.image}
                    alt={item.pokemon.name}
                    className={styles.cardImage}
                />
            </div>

            <div className={styles.cardBody}>
                <p className={styles.cardName}>{item.pokemon.name}</p>
                <p className={styles.cardPrice}>
                    <RiMoneyDollarCircleFill className={styles.cart_icon} /> {item.pokemon.price}
                    <FiShoppingCart className={styles.cart_icon} /> {item.quantity}
                </p>

                <p className={styles.cardStock}>Stock disponible: {currentPokemon.stock}</p>

                <div className={styles.cardTypes}>
                    {item.pokemon.types.map((t) => (
                        <span key={t} className={`${styles.typeBadge} ${styles["type-" + t]}`}>
                            {t}
                        </span>
                    ))}
                </div>

                <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.pokemon.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default PokemonCardCart;
