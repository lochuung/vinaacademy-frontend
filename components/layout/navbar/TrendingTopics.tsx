import { Flame } from "lucide-react"; // Import icon Flame từ thư viện lucide-react
import { TrendingTopic } from "@/types/navbar"; // Import kiểu dữ liệu TrendingTopic từ thư mục types/navbar

// Định nghĩa component TrendingTopics với prop topics là một mảng các đối tượng TrendingTopic
const TrendingTopics = ({ topics }: { topics: TrendingTopic[] }) => {
    return (
        <div className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-300 -ml-2 z-50"> {/* Container của TrendingTopics */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                    <Flame className="w-4 h-4" /> {/* Icon Flame */}
                    <span>Chủ đề thịnh hành</span>
                </div>
                {topics.map((topic, index) => (
                    <a
                        key={index}
                        href={topic.link}
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                        <span>{topic.name}</span> {/* Tên của chủ đề thịnh hành */}
                        <span className="text-sm text-gray-500">{topic.students}</span> {/* Số lượng học viên */}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TrendingTopics; // Xuất component TrendingTopics để sử dụng ở nơi khác