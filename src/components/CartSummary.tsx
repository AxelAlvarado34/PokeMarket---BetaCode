import { usePokeStore } from '../store/poke-store';
import styles from '../styles/PayPage.module.css';

const TAX_RATE = 0.13;

export default function CartSummary() {
    const cart = usePokeStore((state) => state.marketplace.cart.items);

    const subtotal = cart.reduce((acc, item) => acc + item.pokemon.price * item.quantity, 0);

    const tax = subtotal * TAX_RATE;

    const total = subtotal + tax;

    return (
        <div className={styles.summary_box}>
            <h2 className={styles.summary_title}>Resumen de compra</h2>

            <div className={styles.summary_row}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.summary_row}>
                <span>Impuestos ({(TAX_RATE * 100).toFixed(0)}%):</span>
                <span>${tax.toFixed(2)}</span>
            </div>

            <div className={styles.summary_row_total}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <button className={styles.payButton} disabled={cart.length === 0}>
                Pagar
            </button>
        </div>
    );
}
