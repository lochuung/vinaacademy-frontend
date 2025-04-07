import { useRouter } from "next/navigation";
import { CategoryDto } from "@/types/category";
import { ChevronRight } from "lucide-react";

interface TopicsListProps {
    parentCategory: CategoryDto;
    subCategory: CategoryDto;
}

const TopicsList = ({ parentCategory, subCategory }: TopicsListProps) => {
    const router = useRouter();

    // Function to navigate to the topic/third-level category
    const handleTopicClick = (grandParentSlug: string, parentSlug: string, childSlug: string, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/categories/${grandParentSlug}/${parentSlug}/${childSlug}`);
    };

    return (
        <div
            className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 -ml-2 transform-none opacity-100 visible"
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                    <span>{subCategory.name} Subcategories</span>
                </div>
                <div className="space-y-1">
                    {subCategory.children && subCategory.children.map((topic) => (
                        <a
                            key={topic.id}
                            href={`/categories/${parentCategory.slug}/${subCategory.slug}/${topic.slug}`}
                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                            onClick={(e) => handleTopicClick(parentCategory.slug, subCategory.slug, topic.slug, e)}
                        >
                            <span>{topic.name}</span>
                            {/* Display indicator for fourth level if available */}
                            {topic.children && topic.children.length > 0 && (
                                <span className="text-xs text-blue-600">+{topic.children.length}</span>
                            )}
                        </a>
                    ))}

                    {/* If there are no children, show message */}
                    {(!subCategory.children || subCategory.children.length === 0) && (
                        <div className="text-sm text-gray-500 px-3 py-2">
                            No subcategories found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopicsList;