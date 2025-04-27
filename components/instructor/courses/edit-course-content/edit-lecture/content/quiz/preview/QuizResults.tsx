import { CheckCircle, XCircle, AlertTriangle, BookOpen, ArrowLeft, RefreshCcw, Trophy, Zap, X, Circle, CheckSquare } from 'lucide-react';
import { Quiz, QuizQuestion as QuestionType } from '@/types/lecture';
import QuizQuestionView from './QuizQuestion';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface QuizResultsProps {
    quiz: Quiz;
    questions: QuestionType[];
    quizResults: {
        totalScore: number;
        maxScore: number;
        percentageScore: number;
        passed: boolean;
        results: Array<{
            questionId: string;
            correct: boolean | null;
            score: number;
            userAnswer: string[] | string;
        }>;
    };
    selectedAnswers: Record<string, string[]>;
    textAnswers: Record<string, string>;
    onReview: () => void;
    onRetake?: () => void;
    onClose: () => void;
}

export default function QuizResults({
    quiz,
    questions,
    quizResults,
    selectedAnswers,
    textAnswers,
    onReview,
    onRetake,
    onClose
}: QuizResultsProps) {
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    // Count statistics
    const correctCount = quizResults.results.filter(r => r.correct === true).length;
    const incorrectCount = quizResults.results.filter(r => r.correct === false).length;
    const textAnswerCount = quizResults.results.filter(r => r.correct === null).length;

    // Get color scheme based on score
    const getScoreColorScheme = () => {
        const percentage = quizResults.percentageScore;
        if (percentage >= 80) return 'bg-green-100 text-green-800 ring-green-600';
        if (percentage >= 60) return 'bg-blue-100 text-blue-800 ring-blue-600';
        if (percentage >= 40) return 'bg-yellow-100 text-yellow-800 ring-yellow-600';
        return 'bg-red-100 text-red-800 ring-red-600';
    };

    // Toggle question expansion
    const toggleQuestion = (questionId: string) => {
        setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="sticky top-0 z-10 px-8 py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center">
                        <Trophy size={24} className="text-yellow-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-800">Kết quả bài kiểm tra</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Score Summary Card */}
                    <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                        <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-blue-50">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 md:mb-0">Tổng quan kết quả</h3>
                                {quiz.settings.requirePassingScore && (
                                    <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
                                        quizResults.passed 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {quizResults.passed 
                                            ? <CheckCircle size={16} className="mr-1" />
                                            : <XCircle size={16} className="mr-1" />
                                        }
                                        {quizResults.passed
                                            ? "Đạt"
                                            : "Chưa đạt"
                                        } (yêu cầu {quiz.settings.passingScore}%)
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                    <div className={`relative inline-flex rounded-full ${getScoreColorScheme()}`}>
                                        <div className="absolute inset-0 rounded-full ring-4 ring-offset-4 ring-opacity-30"></div>
                                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold">
                                            {quizResults.percentageScore.toFixed(0)}%
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <div className="text-xl font-bold mb-2">
                                        Điểm số: {quizResults.totalScore}/{quizResults.maxScore}
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="bg-green-50 rounded-lg p-3 text-center">
                                            <div className="flex items-center justify-center mb-1 text-green-600">
                                                <CheckCircle size={18} />
                                            </div>
                                            <div className="text-lg font-bold text-green-700">{correctCount}</div>
                                            <div className="text-xs text-green-600">Đúng</div>
                                        </div>
                                        
                                        <div className="bg-red-50 rounded-lg p-3 text-center">
                                            <div className="flex items-center justify-center mb-1 text-red-600">
                                                <XCircle size={18} />
                                            </div>
                                            <div className="text-lg font-bold text-red-700">{incorrectCount}</div>
                                            <div className="text-xs text-red-600">Sai</div>
                                        </div>
                                        
                                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                                            <div className="flex items-center justify-center mb-1 text-gray-600">
                                                <Circle size={18} />
                                            </div>
                                            <div className="text-lg font-bold text-gray-700">{textAnswerCount}</div>
                                            <div className="text-xs text-gray-600">Tự luận</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Questions Review */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <BookOpen size={20} className="mr-2 text-blue-600" />
                            Xem lại câu trả lời
                        </h3>
                        
                        <div className="space-y-4">
                            {questions.map((question, index) => {
                                const result = quizResults.results.find(r => r.questionId === question.id);
                                const isCorrect = result ? result.correct : null;
                                const isExpanded = expandedQuestion === question.id;

                                return (
                                    <div 
                                        key={question.id} 
                                        className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                                            isCorrect === true 
                                                ? 'border-green-200'
                                                : isCorrect === false
                                                    ? 'border-red-200'
                                                    : 'border-gray-200'
                                        }`}
                                    >
                                        <div 
                                            className={`p-4 flex items-center justify-between cursor-pointer ${
                                                isCorrect === true 
                                                    ? 'bg-green-50'
                                                    : isCorrect === false
                                                        ? 'bg-red-50'
                                                        : 'bg-gray-50'
                                            }`}
                                            onClick={() => toggleQuestion(question.id)}
                                        >
                                            <div className="flex items-center">
                                                <div
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium mr-3 ${
                                                        isCorrect === true 
                                                            ? 'bg-green-500'
                                                            : isCorrect === false
                                                                ? 'bg-red-500'
                                                                : 'bg-gray-500'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                                <div className="font-medium line-clamp-1">{question.text}</div>
                                            </div>
                                            <div className="flex items-center">
                                                {isCorrect === true && (
                                                    <div className="flex items-center text-green-600">
                                                        <CheckCircle size={16} className="mr-1"/> 
                                                        <span className="mr-2">{result?.score} điểm</span>
                                                    </div>
                                                )}
                                                {isCorrect === false && (
                                                    <div className="flex items-center text-red-600">
                                                        <XCircle size={16} className="mr-1"/> 
                                                        <span className="mr-2">0 điểm</span>
                                                    </div>
                                                )}
                                                {isCorrect === null && (
                                                    <span className="text-gray-600 mr-2">Tự luận</span>
                                                )}
                                                
                                                <CheckSquare 
                                                    size={18} 
                                                    className={isExpanded ? 'text-indigo-600 transform rotate-180' : 'text-gray-400'}
                                                />
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="bg-white p-4 border-t"
                                            >
                                                <QuizQuestionView
                                                    question={question}
                                                    selectedAnswers={selectedAnswers[question.id] || []}
                                                    textAnswer={textAnswers[question.id] || ''}
                                                    onSelectOption={() => {}} // Disabled in results view
                                                    onTextChange={() => {}} // Disabled in results view
                                                    showCorrectAnswers={quiz.settings.showCorrectAnswers}
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                        <button
                            onClick={onReview}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Xem lại bài kiểm tra
                        </button>

                        {onRetake && (
                            <button
                                onClick={onRetake}
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                            >
                                <RefreshCcw size={20} className="mr-2" />
                                Làm lại bài kiểm tra
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}