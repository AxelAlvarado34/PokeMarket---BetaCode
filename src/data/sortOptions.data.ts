export interface SortType {
    value: string;
    label: string;
}

export const sortOptions: SortType[] = [
    { value: "name", label: "Nombre A→Z" },
    { value: "priceAsc", label: "Precio: menor a mayor" },
    { value: "priceDesc", label: "Precio: mayor a menor" },
];