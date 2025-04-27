// components/HeroSection.tsx
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

interface HeroSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function HeroSection({
                                searchQuery,
                                setSearchQuery
                            }: HeroSectionProps) {
    return (
        <div className="bg-black py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Tất cả khóa học</h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Khám phá hàng nghìn khóa học chất lượng cao từ những chuyên gia hàng đầu trong nhiều lĩnh vực
                </p>
                <div className="max-w-lg mx-auto relative bg-white rounded-full shadow-md overflow-hidden">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm khóa học..."
                        className="pl-10 py-5 sm:py-6"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
            </div>
        </div>
    );
}