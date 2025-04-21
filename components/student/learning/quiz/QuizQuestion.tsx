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
    // Helper function for option container classes
    const getOptionClasses = (isSelected: boolean, isOptionCorrect: boolean, showCorrectness: boolean) => {
        let classes = 'p-4 border rounded-md cursor-pointer transition-all';
        classes += isSubmitted ? ' cursor-default' : ' hover:border-blue-300 hover:bg-blue-50';
        classes += isSelected ? ' border-blue-500 bg-blue-50' : ' border-gray-200';
        
        if (showCorrectness) {
            classes += isOptionCorrect
                ? ' bg-green-50 border-green-500'
                : isSelected ? ' bg-red-50 border-red-500' : '';
        }
        
        return classes;
    };

    // Helper function for checkbox/radio button classes
    const getSelectionIndicatorClasses = (isSelected: boolean, isOptionCorrect: boolean, showCorrectness: boolean, isMultipleChoice: boolean) => {
        let classes = `w-5 h-5 ${isMultipleChoice ? 'rounded' : 'rounded-full'} border flex items-center justify-center`;
        
        classes += isSelected ? ' bg-blue-500 border-blue-500' : ' border-gray-300';
        if (showCorrectness && isOptionCorrect) {
            classes += ' bg-green-500 border-green-500';
        }
        
        return classes;
    };

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
                        const isOptionCorrect = isCorrectAnswer || option.isCorrect;
                        const isMultipleChoice = question.type === 'multiple_choice';

                        return (
                            <div
                                key={option.id}
                                className={getOptionClasses(isSelected, isOptionCorrect, showCorrectness)}
                                onClick={() => !isSubmitted && onSelectOption(option.id)}
                            >
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        <div className={getSelectionIndicatorClasses(isSelected, isOptionCorrect, showCorrectness, isMultipleChoice)}>
                                            {isSelected && <div className={`${isMultipleChoice ? 'w-3 h-3' : 'w-2 h-2 rounded-full'} bg-white`}></div>}
                                        </div>
                                    </div>
                                    <div className="flex-grow text-gray-800">{option.text}</div>

                                    {showCorrectness && (
                                        <div className="ml-3">
                                            {isOptionCorrect ? (
                                                <CheckCircle size={20} className="text-green-500" />
                                            ) : isSelected ? (
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