import { CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion as QuestionType } from '@/types/lecture';

interface QuizQuestionProps {
    question: QuestionType;
    selectedAnswers: string[];
    textAnswer: string;
    onSelectOption: (optionId: string) => void;
    onTextChange: (text: string) => void;
    showCorrectAnswers: boolean;
}

export default function QuizQuestion({
    question,
    selectedAnswers,
    textAnswer,
    onSelectOption,
    onTextChange,
    showCorrectAnswers
}: QuizQuestionProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>

            {question.type === 'text' ? (
                <div>
                    <textarea
                        rows={5}
                        value={textAnswer}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder="Nhập câu trả lời của bạn"
                        className="shadow-sm bg-white focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                </div>
            ) : (
                <div className="space-y-2">
                    {question.options.map(option => {
                        const isSelected = selectedAnswers.includes(option.id);
                        const showCorrectness = showCorrectAnswers;

                        return (
                            <div
                                key={option.id}
                                className={`p-3 border rounded-md mb-2 cursor-pointer flex items-center ${isSelected
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                    } ${showCorrectness && option.isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : showCorrectness && isSelected && !option.isCorrect
                                            ? 'bg-red-50 border-red-500'
                                            : ''
                                    }`}
                                onClick={() => onSelectOption(option.id)}
                            >
                                <div className="mr-3">
                                    {question.type === 'multiple_choice' ? (
                                        <div
                                            className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected
                                                ? 'bg-black border-black'
                                                : 'border-gray-300'
                                                } ${showCorrectness && option.isCorrect
                                                    ? 'bg-green-500 border-green-500'
                                                    : ''
                                                }`}
                                        >
                                            {isSelected && <div className="w-3 h-3 bg-white"></div>}
                                        </div>
                                    ) : (
                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected
                                                ? 'bg-black border-black'
                                                : 'border-gray-300'
                                                } ${showCorrectness && option.isCorrect
                                                    ? 'bg-green-500 border-green-500'
                                                    : ''
                                                }`}
                                        >
                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    {option.text}
                                </div>
                                {showCorrectness && (
                                    <div className="ml-2">
                                        {option.isCorrect ? (
                                            <CheckCircle size={18} className="text-green-500" />
                                        ) : isSelected && !option.isCorrect ? (
                                            <XCircle size={18} className="text-red-500" />
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {showCorrectAnswers && question.explanation && (
                <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700">
                    <div className="font-medium mb-1">Giải thích:</div>
                    <div>{question.explanation}</div>
                </div>
            )}
        </div>
    );
}