import { CategoryDto } from "@/types/category";
import Link from "next/link";

interface MobileCategoriesProps {
  categories: CategoryDto[];
  isLoading: boolean;
  onClose: () => void;
}

const MobileCategories = ({ categories, isLoading, onClose }: MobileCategoriesProps) => {
  return (
    <div className="pb-3 border-b border-gray-200">
      <h3 className="font-bold text-lg mb-3">Khám phá</h3>
      <div className="pl-2 space-y-2">
        {!isLoading && categories.slice(0, 6).map((category) => (
          <Link 
            href={`/categories/${category.slug}`} 
            key={category.id}
            className="block py-2 text-gray-700 hover:text-black font-medium"
            onClick={onClose}
          >
            {category.name}
          </Link>
        ))}
        <Link 
          href="/categories" 
          className="block py-2 text-blue-600 hover:underline"
          onClick={onClose}
        >
          Tất cả danh mục
        </Link>
      </div>
    </div>
  );
};

export default MobileCategories;
