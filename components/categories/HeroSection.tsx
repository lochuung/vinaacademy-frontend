import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

interface HeroSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function HeroSection({searchQuery, setSearchQuery}: HeroSectionProps) {
    return (
        <div className="bg-black text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Khám phá tất cả danh mục khóa học
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                    Tìm kiếm khóa học phù hợp từ hàng nghìn lựa chọn trong các lĩnh vực khác nhau
                </p>
                <div className="max-w-md mx-auto relative">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        className="pl-10 py-6 text-gray-900 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                    />
                </div>
            </div>
        </div>
    );
}