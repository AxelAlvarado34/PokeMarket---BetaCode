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
}
