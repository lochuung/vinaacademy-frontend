import { Eye, Save } from 'lucide-react';
import { useState } from 'react';
import { Lecture } from '@/types/lecture';
import { useToast } from '@/hooks/use-toast';

interface QuizHeaderProps {
    totalPoints: number;
    hasValidQuestions: boolean;
    onPreview: () => void;
    lecture: Lecture;
    sectionId: string;
    onSaved?: (updatedLecture: Lecture) => void;
}

export default function QuizHeader({
    totalPoints, 
    hasValidQuestions, 
    onPreview, 
    lecture, 
    onSaved,
    sectionId
}: QuizHeaderProps) {
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    return (
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Bài kiểm tra</h3>
            <div className="flex items-center">
                <div className="text-sm text-gray-500 mr-4">
                    Tổng điểm: {totalPoints}
                </div>
                <button
                    type="button"
                    onClick={onPreview}
                    disabled={!hasValidQuestions}
                    className={`inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm ${
                        hasValidQuestions
                        ? 'text-gray-700 hover:bg-gray-50'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={hasValidQuestions ? 'Xem trước bài kiểm tra' : 'Bạn cần thêm ít nhất một câu hỏi có nội dung'}
                >
                    <Eye size={16} className="mr-1"/> Xem trước
                </button>
            </div>
        </div>
    );
}