// NoResultsFound.tsx
"use client";

import {Button} from "@/components/ui/button";

export default function NoResultsFound() {
    return (
        <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-xl text-gray-600 mb-4">Không tìm thấy khóa học phù hợp</p>
            <p className="text-gray-500 mb-6">Vui lòng thử từ khóa khác hoặc điều chỉnh bộ lọc</p>
            <Button onClick={() => window.history.back()} variant="outline">
                Quay lại
            </Button>
        </div>
    );
}