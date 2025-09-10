import { HiOutlineSearch } from "react-icons/hi";

type SearchBarProps = {
    onSearch: (term: string) => void;
    fullWidth?: boolean;
};

export default function SearchBar({ onSearch, fullWidth = false }: SearchBarProps) {
    return (
        <div className={`flex items-center bg-gray-100 rounded-full px-4 py-2 ${fullWidth ? "w-full" : "w-80"}`}>
            <HiOutlineSearch className="text-gray-500 text-lg" />
            <input
                type="text"
                placeholder="Buscar Pokémon por su nombre..."
                className="bg-transparent outline-none px-2 w-full text-sm"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}
