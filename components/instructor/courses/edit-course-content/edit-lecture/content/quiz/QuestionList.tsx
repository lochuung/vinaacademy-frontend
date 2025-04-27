import {Plus, BookOpen} from 'lucide-react';
import {QuizQuestion} from '@/types/lecture';
import QuestionItem from './QuestionItem';
import {QuestionType} from '@/types/quiz';

interface QuestionListProps {
    questions: QuizQuestion[];
    expandedQuestion: string;
    setExpandedQuestion: (id: string) => void;
    onAddQuestion: () => void;
    onRemoveQuestion: (id: string) => void;
    onDuplicateQuestion: (id: string) => void;
    onUpdateQuestionText: (id: string, text: string) => void;
    onUpdateQuestionType: (id: string, type: QuestionType) => void;
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
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center border-b border-gray-200 pb-4">
                <BookOpen className="mr-2 h-5 w-5 text-blue-600"/>
                Danh sách câu hỏi
            </h3>

            {questions.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {questions.map((question, index) => question.id !== undefined && (
                        <QuestionItem
                            key={question.id}
                            question={question}
                            index={index}
                            isExpanded={expandedQuestion === question.id}
                            onToggleExpand={() => setExpandedQuestion(expandedQuestion === question.id ? '' : (question.id || ''))}
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
            )}

            {/* Add question button */}
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={onAddQuestion}
                    className="inline-flex items-center px-6 py-3 border border-blue-300 shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                    <Plus size={18} className="mr-2"/> Thêm câu hỏi mới
                </button>
            </div>
        </div>
    );
}