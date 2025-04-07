import { useRouter } from "next/navigation";
import { CategoryDto } from "@/types/category";

interface TopicsListProps {
    parentCategory: CategoryDto;
    subCategory: CategoryDto;
}

// Generate default trending topics based on the category data
const generateTrendingTopics = (parentCategory: CategoryDto, subCategory: CategoryDto) => {
    const topics = [
        {
            name: "Bestsellers",
            slug: "bestsellers",
            students: "10,000+"
        },
        {
            name: "New",
            slug: "new",
            students: "5,000+"
        },
        {
            name: "Popular",
            slug: "popular",
            students: "15,000+"
        }
    ];
    
    return topics;
};

const TopicsList = ({ parentCategory, subCategory }: TopicsListProps) => {
    const router = useRouter();
    const topics = generateTrendingTopics(parentCategory, subCategory);

    // Chuyển hướng đến trang chủ đề
    const handleTopicClick = (parentSlug: string, childSlug: string, topicSlug: string, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/categories/${parentSlug}/${childSlug}?topic=${topicSlug}`);
    };

    return (
        <div
            className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 -ml-2 transform-none opacity-100 visible"
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                    <span>Chủ đề thịnh hành</span>
                </div>
                <div className="space-y-1">
                    {topics.map((topic, topicIndex) => (
                        <a
                            key={topicIndex}
                            href={`/categories/${parentCategory.slug}/${subCategory.slug}?topic=${topic.slug}`}
                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                            onClick={(e) => handleTopicClick(parentCategory.slug, subCategory.slug, topic.slug, e)}
                        >
                            <span>{topic.name}</span>
                            <span className="text-sm text-gray-500">{topic.students}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopicsList;