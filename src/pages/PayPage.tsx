import { usePokeStore } from '../store/poke-store'
import styles from '../styles/PayPage.module.css'
import PokemonCardCart from '../components/PokemonCardCart';
import CartSummary from '../components/CartSummary';

export default function PayPage() {

    const cart = usePokeStore((state) => state.marketplace.cart.items)

    return (
        <section className={styles.pay_section}>
            <div className={styles.pokemon_box}>
                <div className={styles.cart_list}>
                    {cart.length === 0 ? (
                        <p className={styles.empty}>Tu caja está vacía...</p>
                    ) : (
                        cart.map((item) => (
                            <PokemonCardCart key={item.pokemon.id} item={item} />
                        ))
                    )}
                </div>
            </div>

            <div className={styles.pokemon_calculate}>
                <CartSummary />
            </div>
        </section>
    )
}
