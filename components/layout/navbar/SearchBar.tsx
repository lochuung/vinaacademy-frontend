import { FaSearch } from "react-icons/fa"; // Import icon FaSearch từ thư viện react-icons

// Định nghĩa component SearchBar
const SearchBar = () => {
    return (
        <div className="relative flex items-center w-1/3"> {/* Container của SearchBar */}
            <input
                type="text"
                placeholder="Tìm khóa học..."
                className="w-full px-4 py-2 border border-black bg-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black" // Định dạng cho input
            />
            <FaSearch className="absolute right-3 text-black" /> {/* Icon tìm kiếm */}
        </div>
    );
};

export default SearchBar; // Xuất component SearchBar để sử dụng ở nơi khác