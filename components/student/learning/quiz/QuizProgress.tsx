import {FC} from 'react';
import {QuizQuestion} from '@/types/lecture';

interface QuizProgressProps {
    currentQuestion: number;
    totalQuestions: number;
    questions: QuizQuestion[];
    selectedAnswers: Record<string, string[]>;
    textAnswers: Record<string, string>;
    onSelectQuestion: (index: number) => void;
}

const QuizProgress: FC<QuizProgressProps> = ({
                                                 currentQuestion,
                                                 totalQuestions,
                                                 questions,
                                                 selectedAnswers,
                                                 textAnswers,
                                                 onSelectQuestion
                                             }) => {
    // Kiểm tra xem câu hỏi đã được trả lời chưa
    const isQuestionAnswered = (questionId: string, type: QuizQuestion['type']) => {
        if (type === 'text') {
            return textAnswers[questionId]?.trim().length > 0;
        } else {
            return selectedAnswers[questionId]?.length > 0;
        }
    };

    // Số câu hỏi đã trả lời
    const answeredCount = questions.reduce((count, question) => {
        return isQuestionAnswered(question.id, question.type) ? count + 1 : count;
    }, 0);

    // Tính phần trăm hoàn thành
    const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Hoàn thành: {answeredCount}/{totalQuestions} câu hỏi</span>
                <span>{completionPercentage}%</span>
            </div>

            {/* Thanh tiến trình */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{width: `${completionPercentage}%`}}
                ></div>
            </div>

            {/* Danh sách câu hỏi dạng nút */}
            <div className="flex flex-wrap gap-2 my-4">
                {questions.map((question, index) => {
                    const isActive = index + 1 === currentQuestion;
                    const isAnswered = isQuestionAnswered(question.id, question.type);
                    const isRequired = question.isRequired;

                    return (
                        <button
                            key={question.id}
                            onClick={() => onSelectQuestion(index)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                                ${isActive
                                ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                                : isAnswered
                                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }
                                ${isRequired && !isAnswered ? 'outline outline-offset-1 outline-red-300' : ''}
                            `}
                            title={`Câu hỏi ${index + 1}${isRequired ? ' (Bắt buộc)' : ''}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            {/* Chú thích */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-100 rounded-full mr-1"></div>
                    <span>Đã trả lời</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-100 rounded-full mr-1"></div>
                    <span>Chưa trả lời</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 outline outline-1 outline-red-300 bg-gray-100 rounded-full mr-1"></div>
                    <span>Bắt buộc</span>
                </div>
            </div>
        </div>
    );
};

export default QuizProgress;