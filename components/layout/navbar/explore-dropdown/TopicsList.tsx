// components/ExploreDropdown/TopicsList.tsx
import { useRouter } from "next/navigation";
import { SubCategory } from "@/types/navbar";

interface TopicsListProps {
    subCategory: SubCategory;
    categoryLink: string;
}

const TopicsList = ({ subCategory, categoryLink }: TopicsListProps) => {
    const router = useRouter();

    // Chuyển hướng đến trang chủ đề
    const handleTopicClick = (topicLink: string, e: React.MouseEvent) => {
        e.preventDefault();
        const topicSlug = topicLink.split('/').pop();
        router.push(`${subCategory.link}?topic=${topicSlug}`);
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
                    {subCategory.trendingTopics.map((topic, topicIndex) => (
                        <a
                            key={topicIndex}
                            href={`${subCategory.link}?topic=${topic.link.split('/').pop()}`}
                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                            onClick={(e) => handleTopicClick(topic.link, e)}
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