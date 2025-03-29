import { HelpCircle } from 'lucide-react';

export default function QuizEditor() {
    return (
        <div className="mt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Tính năng tạo bài kiểm tra đang được phát triển. Vui lòng quay lại sau.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}