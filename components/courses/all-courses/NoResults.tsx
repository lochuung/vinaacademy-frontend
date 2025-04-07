// components/NoResults.tsx
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface NoResultsProps {
    clearAllFilters: () => void;
}

export function NoResults({clearAllFilters}: NoResultsProps) {
    return (
        <div className="text-center py-12 border rounded-lg">
            <div className="mb-4">
                <Image
                    src="/no-results.svg"
                    alt="Không có kết quả"
                    width={150}
                    height={150}
                    className="mx-auto"
                />
            </div>
            <h3 className="text-xl font-bold mb-2">Không tìm thấy khóa học phù hợp</h3>
            <p className="text-gray-600 mb-6">Vui lòng thử với các bộ lọc khác</p>
            <Button
                onClick={clearAllFilters}
                className="bg-black hover:bg-gray-800 text-white"
            >
                Xóa tất cả bộ lọc
            </Button>
        </div>
    );
}