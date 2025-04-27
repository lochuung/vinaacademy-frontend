import { CheckCircle, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import { QuizQuestion as QuestionType } from '@/types/lecture';
import { motion } from 'framer-motion';

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
        <div className="space-y-5">
            <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>

            {question.type === 'text' ? (
                <div>
                    <textarea
                        rows={5}
                        value={textAnswer}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder="Nhập câu trả lời của bạn"
                        disabled={showCorrectAnswers}
                        className="bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg p-3 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {showCorrectAnswers && (
                        <div className="mt-3 flex items-start p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
                            <AlertTriangle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                            <p>Câu hỏi tự luận cần được giáo viên đánh giá thủ công.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    {question.options.map((option) => {
                        const isSelected = selectedAnswers.includes(option.id || '');
                        const showCorrectness = showCorrectAnswers;
                        const isCorrect = option.isCorrect === true;
                        const incorrectSelection = isSelected && !isCorrect && showCorrectness;
                        const correctSelection = isSelected && isCorrect && showCorrectness;
                        const missedCorrect = !isSelected && isCorrect && showCorrectness;

                        // Determine classes based on state
                        let containerClasses = "p-4 border rounded-lg transition-all duration-200 cursor-pointer relative overflow-hidden";
                        
                        if (incorrectSelection) {
                            containerClasses += " border-red-300 bg-red-50";
                        } else if (correctSelection) {
                            containerClasses += " border-green-300 bg-green-50";
                        } else if (missedCorrect) {
                            containerClasses += " border-blue-300 bg-blue-50";
                        } else if (isSelected) {
                            containerClasses += " border-indigo-300 bg-indigo-50";
                        } else {
                            containerClasses += " border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                        }

                        return (
                            <motion.div
                                key={option.id}
                                onClick={() => !showCorrectAnswers && onSelectOption(option.id || '')}
                                whileHover={!showCorrectAnswers ? { scale: 1.01 } : {}}
                                whileTap={!showCorrectAnswers ? { scale: 0.99 } : {}}
                                className={containerClasses}
                            >
                                <div className="flex items-center">
                                    {/* Radio or Checkbox */}
                                    <div className="mr-3">
                                        {question.type === 'multiple_choice' ? (
                                            <div
                                                className={`w-5 h-5 rounded border flex items-center justify-center ${
                                                    isSelected
                                                        ? 'bg-indigo-600 border-indigo-600'
                                                        : missedCorrect
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300'
                                                }`}
                                            >
                                                {(isSelected || missedCorrect) && <div className="w-2 h-2 bg-white rounded"></div>}
                                            </div>
                                        ) : (
                                            <div
                                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                    isSelected
                                                        ? 'bg-indigo-600 border-indigo-600' 
                                                        : missedCorrect
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300'
                                                }`}
                                            >
                                                {(isSelected || missedCorrect) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                            </div>
                                        )}
                                    </div>

                                    {/* Option Text */}
                                    <div className="flex-grow">
                                        {option.text}
                                    </div>

                                    {/* Correctness indicator */}
                                    {showCorrectness && (
                                        <div className="ml-3">
                                            {isCorrect && (
                                                <CheckCircle size={18} className="text-green-500" />
                                            )}
                                            {incorrectSelection && (
                                                <XCircle size={18} className="text-red-500" />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Background decoration for incorrect/correct answers */}
                                {incorrectSelection && (
                                    <div className="absolute top-0 right-0 h-0 w-0 border-t-[40px] border-t-red-200 border-l-[40px] border-l-transparent"></div>
                                )}
                                {correctSelection && (
                                    <div className="absolute top-0 right-0 h-0 w-0 border-t-[40px] border-t-green-200 border-l-[40px] border-l-transparent"></div>
                                )}
                                {missedCorrect && (
                                    <div className="absolute top-0 right-0 h-0 w-0 border-t-[40px] border-t-blue-200 border-l-[40px] border-l-transparent"></div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Explanation */}
            {showCorrectAnswers && question.explanation && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                    <div className="font-medium text-blue-700 mb-2 flex items-center">
                        <MessageSquare size={16} className="mr-2" />
                        Giải thích:
                    </div>
                    <div className="text-blue-800">{question.explanation}</div>
                </motion.div>
            )}
        </div>
    );
}