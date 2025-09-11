import { Pokemon } from "./Pokemon";
import { Cart } from "./Cart";

export class Marketplace {
    pokemons: Pokemon[];
    cart: Cart;

    constructor(pokemons: Pokemon[]) {
        this.pokemons = pokemons;
        this.cart = new Cart();
    }

    searchByName(name: string) {
        return this.pokemons.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    filterByType(type: string) {
        return this.pokemons.filter((p) => p.types.includes(type));
    }

    filterByPrice(min: number, max: number) {
        return this.pokemons.filter((p) => p.price >= min && p.price <= max);
    }

    sortBy(option: "name" | "priceAsc" | "priceDesc") {
        const sorted = [...this.pokemons];
        if (option === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (option === "priceAsc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (option === "priceDesc") {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    }

    updateStock(id: number, newStock: number) {
        const pokemon = this.pokemons.find((p) => p.id === id);
        if (pokemon) {
            pokemon.stock = newStock;
        }
    }
}
