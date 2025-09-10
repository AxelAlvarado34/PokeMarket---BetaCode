export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    price: number;
    stock: number;

    constructor(id: number, name: string, image: string, types: string[], price: number, stock: number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.types = types;
        this.price = price;
        this.stock = stock;
    }

    reduceStock(quantity: number = 1) {
        this.stock = Math.max(this.stock - quantity, 0);
    }
}
