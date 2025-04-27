import SearchBar from "../search-bar/SearchBar";

interface MobileSearchBarProps {
  isOpen: boolean;
}

const MobileSearchBar = ({ isOpen }: MobileSearchBarProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="lg:hidden p-4 bg-white border-b border-gray-200 animate-fadeIn">
      <SearchBar />
    </div>
  );
};

export default MobileSearchBar;
