import { Fade } from "react-awesome-reveal";
import Carousel from "../components/Carousel";
import styles from '../styles/Home.module.css'
import PokemonList from "../components/PokemonList";

export default function HomePage() {
    return (
        <section className={styles.home}>
            <div className={styles.carousel}>
                <Fade direction="up" triggerOnce={true}>
                    <h1 className={styles.home_sales}>Mejores en Venta</h1>
                </Fade>
                <Carousel />
            </div>

            <div className={styles.poke_catalog}>
                <PokemonList />
            </div>

        </section>
    );
}
