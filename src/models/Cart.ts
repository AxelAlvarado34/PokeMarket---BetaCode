import { Pokemon } from "./Pokemon";

export class CartItem {
    pokemon: Pokemon;
    quantity: number;

    constructor(pokemon: Pokemon, quantity = 1) {
        this.pokemon = pokemon;
        this.quantity = quantity;
    }

    increaseQuantity() {
        this.quantity += 1;
    }

    decreaseQuantity() {
        this.quantity = Math.max(this.quantity - 1, 0);
    }

    getTotal() {
        return this.pokemon.price * this.quantity;
    }
}

export class Cart {
    items: CartItem[] = [];

    addToCart(pokemon: Pokemon) {
        const existing = this.items.find((item) => item.pokemon.id === pokemon.id);
        if (existing) existing.increaseQuantity();
        else this.items.push(new CartItem(pokemon));

        this.items = [...this.items];
    }

    removeItem(pokemonId: number) {
        this.items = this.items.filter((item) => item.pokemon.id !== pokemonId);
    }

    clearCart() {
        this.items = [];
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.getTotal(), 0);
    }

    checkout() {
        this.items.forEach((item) => item.pokemon.reduceStock(item.quantity));
        this.items = [];
    }
}
