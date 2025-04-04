import { Plus } from 'lucide-react';
import { QuizQuestion } from '@/types/lecture';
import QuestionItem from './QuestionItem';

interface QuestionListProps {
    questions: QuizQuestion[];
    expandedQuestion: string;
    setExpandedQuestion: (id: string) => void;
    onAddQuestion: () => void;
    onRemoveQuestion: (id: string) => void;
    onDuplicateQuestion: (id: string) => void;
    onUpdateQuestionText: (id: string, text: string) => void;
    onUpdateQuestionType: (id: string, type: QuizQuestion['type']) => void;
    onAddOption: (id: string) => void;
    onRemoveOption: (questionId: string, optionId: string) => void;
    onUpdateOptionText: (questionId: string, optionId: string, text: string) => void;
    onToggleOptionCorrect: (questionId: string, optionId: string) => void;
    onUpdateExplanation: (id: string, explanation: string) => void;
    onUpdatePoints: (id: string, points: number) => void;
    onToggleRequired: (id: string) => void;
    onMoveQuestion: (id: string, direction: 'up' | 'down') => void;
}

export default function QuestionList({
    questions,
    expandedQuestion,
    setExpandedQuestion,
    onAddQuestion,
    onRemoveQuestion,
    onDuplicateQuestion,
    onUpdateQuestionText,
    onUpdateQuestionType,
    onAddOption,
    onRemoveOption,
    onUpdateOptionText,
    onToggleOptionCorrect,
    onUpdateExplanation,
    onUpdatePoints,
    onToggleRequired,
    onMoveQuestion
}: QuestionListProps) {
    return (
        <div>
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <QuestionItem
                        key={question.id}
                        question={question}
                        index={index}
                        isExpanded={expandedQuestion === question.id}
                        onToggleExpand={() => setExpandedQuestion(expandedQuestion === question.id ? '' : question.id)}
                        totalQuestions={questions.length}
                        onRemove={onRemoveQuestion}
                        onDuplicate={onDuplicateQuestion}
                        onUpdateText={onUpdateQuestionText}
                        onUpdateType={onUpdateQuestionType}
                        onAddOption={onAddOption}
                        onRemoveOption={onRemoveOption}
                        onUpdateOptionText={onUpdateOptionText}
                        onToggleOptionCorrect={onToggleOptionCorrect}
                        onUpdateExplanation={onUpdateExplanation}
                        onUpdatePoints={onUpdatePoints}
                        onToggleRequired={onToggleRequired}
                        onMove={onMoveQuestion}
                    />
                ))}
            </div>

            {/* Add question button */}
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={onAddQuestion}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    <Plus size={16} className="mr-2" /> Thêm câu hỏi
                </button>
            </div>
        </div>
    );
}