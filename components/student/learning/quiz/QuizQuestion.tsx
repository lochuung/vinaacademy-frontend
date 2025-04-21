import { FC } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion as QuestionType } from '@/types/lecture';

interface QuizQuestionProps {
    question: QuestionType;
    selectedAnswers: string[];
    textAnswer: string;
    onSelectOption: (optionId: string) => void;
    onTextChange: (text: string) => void;
    showCorrectAnswers: boolean;
    isSubmitted: boolean;
    quizResults?: {
        questionId: string;
        correct: boolean | null;
        score: number;
        userAnswer: string[] | string;
        explanation?: string;
        correctAnswers?: string[];
    };
}

const QuizQuestion: FC<QuizQuestionProps> = ({
    question,
    selectedAnswers,
    textAnswer,
    onSelectOption,
    onTextChange,
    showCorrectAnswers,
    isSubmitted,
    quizResults
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{question.text}</h3>

            {question.type === 'text' ? (
                <div>
                    <textarea
                        rows={6}
                        value={textAnswer}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder="Nhập câu trả lời của bạn vào đây..."
                        disabled={isSubmitted}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 bg-white disabled:bg-gray-100 disabled:text-gray-500"
                    ></textarea>
                </div>
            ) : (
                <div className="space-y-3">
                    {question.options.map(option => {
                        const isSelected = selectedAnswers.includes(option.id);
                        const showCorrectness = showCorrectAnswers && isSubmitted;
                        const isCorrectAnswer = quizResults?.correctAnswers?.includes(option.id);

                        return (
                            <div
                                key={option.id}
                                className={`p-4 border rounded-md cursor-pointer transition-all ${isSubmitted ? 'cursor-default' : 'hover:border-blue-300 hover:bg-blue-50'
                                    } ${isSelected
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200'
                                    } ${showCorrectness && (isCorrectAnswer || option.isCorrect)
                                        ? 'bg-green-50 border-green-500'
                                        : showCorrectness && isSelected && !(isCorrectAnswer || option.isCorrect)
                                            ? 'bg-red-50 border-red-500'
                                            : ''
                                    }`}
                                onClick={() => !isSubmitted && onSelectOption(option.id)}
                            >
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        {question.type === 'multiple_choice' ? (
                                            <div
                                                className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-300'
                                                    } ${showCorrectness && (isCorrectAnswer || option.isCorrect)
                                                        ? 'bg-green-500 border-green-500'
                                                        : ''
                                                    }`}
                                            >
                                                {isSelected && <div className="w-3 h-3 bg-white"></div>}
                                            </div>
                                        ) : (
                                            <div
                                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-300'
                                                    } ${showCorrectness && (isCorrectAnswer || option.isCorrect)
                                                        ? 'bg-green-500 border-green-500'
                                                        : ''
                                                    }`}
                                            >
                                                {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow text-gray-800">{option.text}</div>

                                    {showCorrectness && (
                                        <div className="ml-3">
                                            {(isCorrectAnswer || option.isCorrect) ? (
                                                <CheckCircle size={20} className="text-green-500" />
                                            ) : isSelected && !(isCorrectAnswer || option.isCorrect) ? (
                                                <XCircle size={20} className="text-red-500" />
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Don't show explanation here if we're showing it from the quizResults */}
            {showCorrectAnswers && isSubmitted && !quizResults?.explanation && question.explanation && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Giải thích:</h4>
                    <p className="text-blue-700">{question.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default QuizQuestion;