'use client';

import { useState, useEffect } from 'react';
import { Quiz } from '@/types/lecture';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { quizDtoToQuiz } from '@/adapters/quizAdapter';
import { QuizDto } from '@/types/quiz';
import { Clock, AlertCircle, CheckCircle, X, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface QuizPreviewProps {
    quiz: Quiz | QuizDto;
    onClose: () => void;
}

export default function QuizPreview({ quiz, onClose }: QuizPreviewProps) {
    // Convert QuizDto to Quiz if needed
    const [quizData, setQuizData] = useState<Quiz>(() => {
        // Check if quiz is QuizDto and convert if needed
        if ('questions' in quiz && Array.isArray(quiz.questions) && 
            quiz.questions.length > 0 && 'questionText' in quiz.questions[0]) {
            return quizDtoToQuiz(quiz as QuizDto);
        }
        return quiz as Quiz;
    });
    
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
    const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState<number | null>(
        quizData.settings.timeLimit ? quizData.settings.timeLimit * 60 : null
    );
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

    const questions = quizData.questions;

    // Timer functionality
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || showResults) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev !== null && prev > 0) {
                    return prev - 1;
                }
                return prev;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [timeLeft, showResults]);
    
    // Auto-submit when time is up
    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft]);

    // Format time display
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Handle option selection for single/multiple choice questions
    const handleOptionSelect = (questionId: string, optionId: string) => {
        const question = questions.find(q => q.id === questionId);

        if (question?.type === 'single_choice' || question?.type === 'true_false') {
            // For single choice, replace any previous selection
            setSelectedAnswers({
                ...selectedAnswers,
                [questionId]: [optionId]
            });
        } else if (question?.type === 'multiple_choice') {
            // For multiple choice, toggle the selection
            const currentSelections = selectedAnswers[questionId] || [];
            const newSelections = currentSelections.includes(optionId)
                ? currentSelections.filter(id => id !== optionId)
                : [...currentSelections, optionId];

            setSelectedAnswers({
                ...selectedAnswers,
                [questionId]: newSelections
            });
        }
    };

    // Handle text answer input
    const handleTextAnswer = (questionId: string, text: string) => {
        setTextAnswers({
            ...textAnswers,
            [questionId]: text
        });
    };

    // Calculate score and check answers
    const calculateResults = () => {
        let totalScore = 0;
        let maxScore = 0;

        const results = questions.map(question => {
            maxScore += question.points;

            // For text answers, we can't automatically grade
            if (question.type === 'text') {
                return {
                    questionId: question.id,
                    correct: null, // Can't determine automatically
                    score: 0, // No automatic score
                    userAnswer: textAnswers[question.id] || ''
                };
            }

            const selectedOptionIds = selectedAnswers[question.id] || [];

            // Check if answers are correct
            if (question.type === 'single_choice' || question.type === 'true_false') {
                // For single choice, check if the selected option is correct
                const isCorrect = selectedOptionIds.length > 0 &&
                    question.options.find(o => o.id === selectedOptionIds[0])?.isCorrect === true;

                if (isCorrect) {
                    totalScore += question.points;
                }

                return {
                    questionId: question.id,
                    correct: isCorrect,
                    score: isCorrect ? question.points : 0,
                    userAnswer: selectedOptionIds
                };
            } else if (question.type === 'multiple_choice') {
                // For multiple choice, all correct options must be selected and no incorrect ones
                const correctOptionIds = question.options
                    .filter(o => o.isCorrect)
                    .map(o => o.id);

                const incorrectSelections = selectedOptionIds.filter(id => !correctOptionIds.includes(id));
                const missedCorrect = correctOptionIds.filter(id => !selectedOptionIds.includes(id || ''));

                const isFullyCorrect = incorrectSelections.length === 0 && missedCorrect.length === 0;

                // Partial credit: You get full credit only if all selections are correct
                let score = 0;
                if (isFullyCorrect) {
                    score = question.points;
                    totalScore += question.points;
                }

                return {
                    questionId: question.id,
                    correct: isFullyCorrect,
                    score,
                    userAnswer: selectedOptionIds
                };
            }

            return {
                questionId: question.id,
                correct: false,
                score: 0,
                userAnswer: []
            };
        });

        const percentageScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
        const passed = !quizData.settings.requirePassingScore || percentageScore >= quizData.settings.passingScore;

        return {
            totalScore,
            maxScore,
            percentageScore,
            passed,
            results
        };
    };

    const quizResults = calculateResults();
    
    // Submit quiz
    const handleSubmit = () => {
        setShowConfirmSubmit(false);
        setShowResults(true);
    };

    // Reset the quiz
    const resetQuiz = () => {
        setShowResults(false);
        setSelectedAnswers({});
        setTextAnswers({});
        setCurrentQuestionIndex(0);
        setTimeLeft(quizData.settings.timeLimit ? quizData.settings.timeLimit * 60 : null);
    };

    // Navigation functions
    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Check if current question is answered
    const isCurrentQuestionAnswered = () => {
        const question = questions[currentQuestionIndex];
        if (!question) return false;
        
        if (question.type === 'text') {
            return !!textAnswers[question.id] && textAnswers[question.id].trim() !== '';
        }
        
        return !!selectedAnswers[question.id] && selectedAnswers[question.id].length > 0;
    };

    // Jump to a specific question
    const jumpToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    };

    // If showing results, render the summary
    if (showResults) {
        return (
            <QuizResults
                quiz={quizData}
                questions={questions}
                quizResults={quizResults}
                selectedAnswers={selectedAnswers}
                textAnswers={textAnswers}
                onReview={resetQuiz}
                onRetake={quizData.settings.allowRetake ? resetQuiz : undefined}
                onClose={onClose}
            />
        );
    }

    // Count answered questions
    const answeredCount = questions.reduce((count, question) => {
        if (
            (selectedAnswers[question.id] && selectedAnswers[question.id].length > 0) ||
            (textAnswers[question.id] && textAnswers[question.id].trim() !== '')
        ) {
            return count + 1;
        }
        return count;
    }, 0);

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
                {/* Quiz Header */}
                <div className="px-8 py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Xem trước bài kiểm tra</h2>
                        <div className="text-sm text-gray-600 mt-1">Bạn đang trong chế độ xem trước</div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {timeLeft !== null && (
                            <div className={`flex items-center px-3 py-1.5 rounded-full ${
                                timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                                <Clock size={16} className="mr-2" />
                                <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                            </div>
                        )}
                        
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-100 h-1.5">
                    <div 
                        className="bg-blue-600 h-full transition-all duration-300 ease-out"
                        style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                    ></div>
                </div>

                <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
                    {/* Question Navigation Sidebar */}
                    <div className="w-full md:w-64 bg-gray-50 p-4 md:border-r border-gray-200 overflow-y-auto">
                        <div className="mb-4 text-center">
                            <div className="text-sm font-medium text-gray-700">
                                Đã trả lời: {answeredCount}/{questions.length}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all" 
                                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((question, idx) => {
                                const isAnswered = (selectedAnswers[question.id]?.length > 0) || 
                                                (textAnswers[question.id]?.trim().length > 0);
                                return (
                                    <button
                                        key={question.id}
                                        onClick={() => jumpToQuestion(idx)}
                                        className={`w-full aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-all
                                        ${idx === currentQuestionIndex 
                                            ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-600'
                                            : isAnswered
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Submit Button (Mobile) */}
                        <div className="mt-6 block md:hidden">
                            <button
                                onClick={() => setShowConfirmSubmit(true)}
                                className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                            >
                                Nộp bài
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Question Display */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestionIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                            {currentQuestionIndex + 1}
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {currentQuestion?.points && (
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full mr-2">
                                                    {currentQuestion.points} điểm
                                                </span>
                                            )}
                                            <span className="text-gray-500 text-sm">
                                                {currentQuestion?.type === 'single_choice' && 'Câu hỏi một lựa chọn'}
                                                {currentQuestion?.type === 'multiple_choice' && 'Câu hỏi nhiều lựa chọn'}
                                                {currentQuestion?.type === 'true_false' && 'Câu hỏi đúng/sai'}
                                                {currentQuestion?.type === 'text' && 'Câu hỏi tự luận'}
                                            </span>
                                        </h3>
                                    </div>

                                    {currentQuestion && (
                                        <QuizQuestion
                                            question={currentQuestion}
                                            selectedAnswers={selectedAnswers[currentQuestion.id] || []}
                                            textAnswer={textAnswers[currentQuestion.id] || ''}
                                            onSelectOption={(optionId) => handleOptionSelect(currentQuestion.id, optionId)}
                                            onTextChange={(text) => handleTextAnswer(currentQuestion.id, text)}
                                            showCorrectAnswers={false}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
                            <button
                                onClick={goToPrevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={`flex items-center px-4 py-2 rounded-lg ${
                                    currentQuestionIndex === 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                <ChevronLeft size={20} className="mr-1" />
                                Câu trước
                            </button>

                            <div className="hidden md:block">
                                <button
                                    onClick={() => setShowConfirmSubmit(true)}
                                    className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                                >
                                    Nộp bài
                                </button>
                            </div>

                            <button
                                onClick={goToNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className={`flex items-center px-4 py-2 rounded-lg ${
                                    currentQuestionIndex === questions.length - 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                Câu tiếp
                                <ChevronRight size={20} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Confirmation Modal */}
                <AnimatePresence>
                    {showConfirmSubmit && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                            >
                                <div className="text-center">
                                    <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100 mb-4">
                                        <AlertCircle className="h-8 w-8 text-yellow-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Nộp bài kiểm tra?</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Bạn đã hoàn thành {answeredCount} trên {questions.length} câu hỏi.
                                        {answeredCount < questions.length && " Các câu chưa trả lời sẽ được tính là không điểm."}
                                    </p>
                                    
                                    <div className="mt-5 flex justify-center gap-3">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
                                            onClick={() => setShowConfirmSubmit(false)}
                                        >
                                            Quay lại
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700"
                                            onClick={handleSubmit}
                                        >
                                            Nộp bài
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}