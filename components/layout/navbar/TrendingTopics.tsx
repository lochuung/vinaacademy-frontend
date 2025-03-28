import { Flame } from "lucide-react";
import { TrendingTopic } from "@/types/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TrendingTopicsProps {
    topics: TrendingTopic[];
    isVisible: boolean;
    categorySlug?: string; // Slug của danh mục cha
    subCategorySlug?: string; // Slug của danh mục con (nếu có)
}

const TrendingTopics = ({ topics, isVisible, categorySlug, subCategorySlug }: TrendingTopicsProps) => {
    const router = useRouter();

    // Xử lý khi nhấp vào chủ đề thịnh hành
    const handleTopicClick = (e: React.MouseEvent, topic: TrendingTopic) => {
        e.preventDefault();

        // Lấy topic slug từ đường dẫn topic
        const topicSlug = topic.link.split('/').pop();

        if (subCategorySlug) {
            // Nếu đang ở trang danh mục con, chuyển hướng đến trang con với tham số topic
            router.push(`/categories/${categorySlug}/${subCategorySlug}?topic=${topicSlug}`);
        } else if (categorySlug) {
            // Nếu đang ở trang danh mục chính, tìm danh mục con chứa chủ đề
            let subCatSlug;

            // Tìm trong URL của topic để trích xuất thông tin cần thiết
            // Logic này có thể cần điều chỉnh tùy theo cấu trúc dữ liệu của bạn
            if (topic.subCategory) {
                // Nếu có thông tin subCategory trong topic
                subCatSlug = topic.subCategory.toLowerCase().replace(/ /g, '-');
            } else {
                // Nếu cần tìm dựa vào topic.link
                // Đây là logic đơn giản, có thể cần điều chỉnh
                const parts = topic.link.split('/');
                if (parts.length > 2) {
                    subCatSlug = parts[parts.length - 2];
                }
            }

            if (subCatSlug) {
                router.push(`/categories/${categorySlug}/${subCatSlug}?topic=${topicSlug}`);
            } else {
                // Fallback: Sử dụng đường dẫn gốc của topic nếu không tìm được danh mục con
                router.push(topic.link);
            }
        } else {
            // Trường hợp mặc định: sử dụng đường dẫn gốc của topic
            router.push(topic.link);
        }
    };

    return (
        <div
            className={`absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 -ml-2 z-50 ${isVisible
                ? "transform-none opacity-100 visible"
                : "transform translate-x-2 opacity-0 invisible pointer-events-none"
                }`}
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                    <Flame className="w-4 h-4" />
                    <span>Chủ đề thịnh hành</span>
                </div>
                <div className="space-y-1">
                    {topics.map((topic, index) => (
                        <a
                            key={index}
                            href={topic.link}
                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                            onClick={(e) => handleTopicClick(e, topic)}
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

export default TrendingTopics;