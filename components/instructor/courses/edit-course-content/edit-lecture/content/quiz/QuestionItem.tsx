import {
    ChevronUp,
    ChevronDown,
    Copy,
    Trash2
} from 'lucide-react';
import {QuizQuestion} from '@/types/lecture';
import QuestionContent from './QuestionContent';

interface QuestionItemProps {
    question: QuizQuestion;
    index: number;
    isExpanded: boolean;
    onToggleExpand: () => void;
    totalQuestions: number;
    onRemove: (id: string) => void;
    onDuplicate: (id: string) => void;
    onUpdateText: (id: string, text: string) => void;
    onUpdateType: (id: string, type: QuizQuestion['type']) => void;
    onAddOption: (id: string) => void;
    onRemoveOption: (questionId: string, optionId: string) => void;
    onUpdateOptionText: (questionId: string, optionId: string, text: string) => void;
    onToggleOptionCorrect: (questionId: string, optionId: string) => void;
    onUpdateExplanation: (id: string, explanation: string) => void;
    onUpdatePoints: (id: string, points: number) => void;
    onToggleRequired: (id: string) => void;
    onMove: (id: string, direction: 'up' | 'down') => void;
}

export default function QuestionItem({
                                         question,
                                         index,
                                         isExpanded,
                                         onToggleExpand,
                                         totalQuestions,
                                         onRemove,
                                         onDuplicate,
                                         onUpdateText,
                                         onUpdateType,
                                         onAddOption,
                                         onRemoveOption,
                                         onUpdateOptionText,
                                         onToggleOptionCorrect,
                                         onUpdateExplanation,
                                         onUpdatePoints,
                                         onToggleRequired,
                                         onMove
                                     }: QuestionItemProps) {
    return (
        <div className="border border-gray-200 rounded-md overflow-hidden">
            {/* Question header */}
            <div className="bg-gray-50 p-3 flex items-center justify-between">
                <div className="flex items-center flex-1">
                    <div
                        className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-sm font-medium mr-3">
                        {index + 1}
                    </div>
                    <div className="flex-1 truncate font-medium">
                        {question.text ? question.text : <span className="text-gray-400">Câu hỏi chưa có tiêu đề</span>}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-xs px-2 py-1 bg-gray-200 rounded-full mr-2">
                        {question.points} điểm
                    </div>
                    <button
                        type="button"
                        onClick={onToggleExpand}
                        className="text-gray-500 hover:text-gray-700 p-1"
                    >
                        {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                </div>
            </div>

            {/* Question content (expanded) */}
            {isExpanded && (
                <QuestionContent
                    question={question}
                    index={index}
                    totalQuestions={totalQuestions}
                    onUpdateText={(text) => onUpdateText(question.id, text)}
                    onUpdateType={(type) => onUpdateType(question.id, type)}
                    onAddOption={() => onAddOption(question.id)}
                    onRemoveOption={(optionId) => onRemoveOption(question.id, optionId)}
                    onUpdateOptionText={(optionId, text) => onUpdateOptionText(question.id, optionId, text)}
                    onToggleOptionCorrect={(optionId) => onToggleOptionCorrect(question.id, optionId)}
                    onUpdateExplanation={(text) => onUpdateExplanation(question.id, text)}
                    onUpdatePoints={(points) => onUpdatePoints(question.id, points)}
                    onToggleRequired={() => onToggleRequired(question.id)}
                    onDuplicate={() => onDuplicate(question.id)}
                    onRemove={() => onRemove(question.id)}
                    onMoveUp={() => onMove(question.id, 'up')}
                    onMoveDown={() => onMove(question.id, 'down')}
                />
            )}
        </div>
    );
}