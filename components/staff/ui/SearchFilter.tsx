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

type SearchFilterProps = {
  onSearchChange: (search: string) => void;
  onDepartmentChange: (department: string) => void;
  oldValue: string;
};

const SearchFilter = ({
  onSearchChange,
  onDepartmentChange,
  oldValue
}: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(oldValue || ""); 
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); 

  useEffect(() => {
    onSearchChange(debouncedSearchTerm); // Call the search change handler with the debounced value
  }, [debouncedSearchTerm]);

    useEffect(() => {
        setSearchTerm(oldValue); // Update the search term when oldValue changes
    }, [oldValue]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleDepartmentChange = (value: string) => {
    onDepartmentChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm kiếm theo tên khóa học hoặc giảng viên..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      <Select onValueChange={handleDepartmentChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tất cả danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>
          <SelectItem value="computer-science">Computer Science</SelectItem>
          <SelectItem value="mathematics">Mathematics</SelectItem>
          <SelectItem value="physics">Physics</SelectItem>
          <SelectItem value="biology">Biology</SelectItem>
          <SelectItem value="chemistry">Chemistry</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="philosophy">Philosophy</SelectItem>
          <SelectItem value="english">English</SelectItem>
        </SelectContent>
      </Select>
      
    </div>
    
  );
};

export default SearchFilter;
