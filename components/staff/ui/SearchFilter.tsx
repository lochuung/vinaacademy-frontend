import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { getCategories } from "@/services/categoryService";
import { CategoryDto } from "@/types/category";

type SearchFilterProps = {
  onSearchChange: (search: string) => void;
  onCategoryChange: (slugcate: string) => void;
  oldValue: string;
};

const SearchFilter = ({
  onSearchChange,
  onCategoryChange,
  oldValue,
}: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(oldValue || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    onSearchChange(debouncedSearchTerm); // Call the search change handler with the debounced value
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    setSearchTerm(oldValue); // Update the search term when oldValue changes
  }, [oldValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm kiếm theo tên khóa học..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tất cả danh mục" />
        </SelectTrigger>
        
        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
          {/* <SelectItem value="all">Tất cả danh mục</SelectItem>
          <SelectItem value="computer-science">Computer Science</SelectItem>
          <SelectItem value="mathematics">Mathematics</SelectItem>
          <SelectItem value="physics">Physics</SelectItem>
          <SelectItem value="biology">Biology</SelectItem>
          <SelectItem value="chemistry">Chemistry</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="philosophy">Philosophy</SelectItem>
          <SelectItem value="english">English</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;
