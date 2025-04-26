'use client';

import { useState, useEffect } from 'react';
import { Quiz } from '@/types/lecture';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { quizDtoToQuiz } from '@/adapters/quizAdapter';
import { QuizDto } from '@/types/quiz';

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

    const questions = quizData.questions;

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
                const missedCorrect = correctOptionIds.filter(id => !selectedOptionIds.includes(id));

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
        setShowResults(true);
    };

    // Reset the quiz
    const resetQuiz = () => {
        setShowResults(false);
        setSelectedAnswers({});
        setTextAnswers({});
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
            (textAnswers[question.id] && textAnswers[question.id].length > 0)
        ) {
            return count + 1;
        }
        return count;
    }, 0);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Xem trước bài kiểm tra</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Đã trả lời: {answeredCount}/{questions.length}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {questions.map((question, index) => (
                            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="mb-4 text-sm text-gray-500 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mr-2">
                                            {index + 1}
                                        </div>
                                        <div>
                                            {question.points} điểm
                                            {question.isRequired && (
                                                <span className="ml-2 text-red-500">*</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        {question.type === 'single_choice' && 'Câu hỏi trắc nghiệm đơn'}
                                        {question.type === 'multiple_choice' && 'Câu hỏi trắc nghiệm nhiều đáp án'}
                                        {question.type === 'true_false' && 'Câu hỏi đúng/sai'}
                                        {question.type === 'text' && 'Câu hỏi tự luận'}
                                    </div>
                                </div>

                                <QuizQuestion
                                    question={question}
                                    selectedAnswers={selectedAnswers[question.id] || []}
                                    textAnswer={textAnswers[question.id] || ''}
                                    onSelectOption={(optionId) => handleOptionSelect(question.id, optionId)}
                                    onTextChange={(text) => handleTextAnswer(question.id, text)}
                                    showCorrectAnswers={false}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                        >
                            Nộp bài
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}