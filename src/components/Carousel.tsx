import { Swiper, SwiperSlide } from "swiper/react";
import { usePokeStore } from "../store/poke-store";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '../styles/CardPokemon.module.css'
import PokemonCard from "./PokemonCard";

export default function Carousel() {

    const pokemons = usePokeStore(state => state.pokemons);
    const firstPokemons = pokemons.slice(0, 9);

    console.log(firstPokemons);


    return (
        <section className={styles.carrousel_section}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {firstPokemons.map((poke) => (
                    <SwiperSlide key={poke.id} className="py-15 px-0">
                        <PokemonCard key={poke.id} pokemon={poke} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
