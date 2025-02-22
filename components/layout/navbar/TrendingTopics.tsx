import { Flame } from "lucide-react";
import { TrendingTopic } from "@/types/navbar";

const TrendingTopics = ({ topics }: { topics: TrendingTopic[] }) => {
    return (
        <div className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-300 -ml-2 z-50">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                    <Flame className="w-4 h-4" />
                    <span>Chủ đề thịnh hành</span>
                </div>
                {topics.map((topic, index) => (
                    <a
                        key={index}
                        href={topic.link}
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                        <span>{topic.name}</span>
                        <span className="text-sm text-gray-500">{topic.students}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TrendingTopics;