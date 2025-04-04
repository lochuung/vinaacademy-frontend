import { AlertCircle } from 'lucide-react';

export default function QuizTips() {
    return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-blue-700">
                        Mẹo: Tạo câu hỏi đa dạng để đánh giá mức độ hiểu bài của học viên. Nên thêm giải thích cho đáp án để giúp học viên hiểu rõ hơn khi làm sai.
                    </p>
                </div>
            </div>
        </div>
    );
}