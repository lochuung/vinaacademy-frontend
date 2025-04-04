import { Plus } from 'lucide-react';
import { QuizQuestion, QuizOption } from '@/types/lecture';
import OptionItem from './OptionItem';

interface QuestionOptionsProps {
    questionType: QuizQuestion['type'];
    options: QuizOption[];
    onAddOption: () => void;
    onRemoveOption: (optionId: string) => void;
    onUpdateOptionText: (optionId: string, text: string) => void;
    onToggleOptionCorrect: (optionId: string) => void;
}

export default function QuestionOptions({
    questionType,
    options,
    onAddOption,
    onRemoveOption,
    onUpdateOptionText,
    onToggleOptionCorrect
}: QuestionOptionsProps) {
    // Nếu là câu hỏi tự luận, không hiển thị options
    if (questionType === 'text') {
        return null;
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Các lựa chọn
                {questionType === 'true_false' ? '' : <span className="text-red-500"> *</span>}
            </label>

            {options.map((option, optIndex) => (
                <OptionItem
                    key={option.id}
                    option={option}
                    optionIndex={optIndex}
                    questionType={questionType}
                    onRemove={onRemoveOption}
                    onUpdateText={(text) => onUpdateOptionText(option.id, text)}
                    onToggleCorrect={() => onToggleOptionCorrect(option.id)}
                    canRemove={questionType !== 'true_false' && options.length > 2}
                />
            ))}

            {/* Thêm lựa chọn button - chỉ hiển thị nếu không phải true/false */}
            {questionType !== 'true_false' && (
                <button
                    type="button"
                    onClick={onAddOption}
                    className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                    <Plus size={16} className="mr-1" /> Thêm lựa chọn
                </button>
            )}
        </div>
    );
}