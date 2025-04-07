import {
    ChevronUp,
    ChevronDown,
    Copy,
    Trash2
} from 'lucide-react';
import {QuizQuestion} from '@/types/lecture';
import QuestionForm from './QuestionForm';
import QuestionOptions from './QuestionOptions';
import QuestionActions from './QuestionActions';

interface QuestionContentProps {
    question: QuizQuestion;
    index: number;
    totalQuestions: number;
    onUpdateText: (text: string) => void;
    onUpdateType: (type: QuizQuestion['type']) => void;
    onAddOption: () => void;
    onRemoveOption: (optionId: string) => void;
    onUpdateOptionText: (optionId: string, text: string) => void;
    onToggleOptionCorrect: (optionId: string) => void;
    onUpdateExplanation: (text: string) => void;
    onUpdatePoints: (points: number) => void;
    onToggleRequired: () => void;
    onDuplicate: () => void;
    onRemove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}

export default function QuestionContent({
                                            question,
                                            index,
                                            totalQuestions,
                                            onUpdateText,
                                            onUpdateType,
                                            onAddOption,
                                            onRemoveOption,
                                            onUpdateOptionText,
                                            onToggleOptionCorrect,
                                            onUpdateExplanation,
                                            onUpdatePoints,
                                            onToggleRequired,
                                            onDuplicate,
                                            onRemove,
                                            onMoveUp,
                                            onMoveDown
                                        }: QuestionContentProps) {
    return (
        <div className="p-4 space-y-4">
            {/* Question Form - Text & Type & Points */}
            <QuestionForm
                text={question.text}
                type={question.type}
                points={question.points}
                onUpdateText={onUpdateText}
                onUpdateType={onUpdateType}
                onUpdatePoints={onUpdatePoints}
            />

            {/* Question Options */}
            <QuestionOptions
                questionType={question.type}
                options={question.options}
                onAddOption={onAddOption}
                onRemoveOption={onRemoveOption}
                onUpdateOptionText={onUpdateOptionText}
                onToggleOptionCorrect={onToggleOptionCorrect}
            />

            {/* Question Explanation */}
            <div>
                <label htmlFor={`explanation-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Giải thích đáp án
                </label>
                <textarea
                    id={`explanation-${question.id}`}
                    value={question.explanation || ''}
                    onChange={(e) => onUpdateExplanation(e.target.value)}
                    rows={2}
                    className="shadow-sm focus:ring-black focus:border-black block w-full text-base p-2.5 border-gray-300 rounded-md bg-white"
                    placeholder="Nhập giải thích cho đáp án (hiển thị sau khi học viên trả lời)"
                />
            </div>

            {/* Required checkbox */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id={`required-${question.id}`}
                    checked={question.isRequired}
                    onChange={onToggleRequired}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor={`required-${question.id}`} className="ml-2 block text-sm text-gray-700">
                    Bắt buộc trả lời
                </label>
            </div>

            {/* Question Actions */}
            <QuestionActions
                index={index}
                totalQuestions={totalQuestions}
                onDuplicate={onDuplicate}
                onRemove={onRemove}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
            />
        </div>
    );
}