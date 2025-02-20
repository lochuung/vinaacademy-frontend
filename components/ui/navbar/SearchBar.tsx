import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    return (
        <div className="relative flex items-center w-1/3">
            <input
                type="text"
                placeholder="Tìm khóa học..."
                className="w-full px-4 py-2 border border-black bg-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            <FaSearch className="absolute right-3 text-black" />
        </div>
    );
};
export default SearchBar;