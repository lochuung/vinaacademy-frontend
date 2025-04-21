// components/lecture/content/quiz/preview/QuizResults.tsx
import {CheckCircle, XCircle} from 'lucide-react';
import {Quiz, QuizQuestion as QuestionType} from '@/types/lecture';
import QuizQuestionView from './QuizQuestion';

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
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Kết quả bài kiểm tra</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-8 text-center">
                    <div className="text-2xl font-bold mb-2">
                        Điểm
                        số: {quizResults.totalScore}/{quizResults.maxScore} ({quizResults.percentageScore.toFixed(1)}%)
                    </div>

                    {quiz.settings.requirePassingScore && (
                        <div className={`text-sm ${quizResults.passed ? 'text-green-600' : 'text-red-600'}`}>
                            {quizResults.passed
                                ? `Chúc mừng! Bạn đã đạt điểm tối thiểu ${quiz.settings.passingScore}%`
                                : `Bạn chưa đạt điểm tối thiểu ${quiz.settings.passingScore}%`}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {questions.map((question, index) => {
                        const result = quizResults.results.find(r => r.questionId === question.id);
                        const isCorrect = result ? result.correct : null;

                        return (
                            <div key={question.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 p-3 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mr-3">
                                            {index + 1}
                                        </div>
                                        <div className="font-medium">{question.text}</div>
                                    </div>
                                    <div className="flex items-center">
                                        {isCorrect === true && (
                                            <span className="text-green-600 flex items-center">
                                                <CheckCircle size={16} className="mr-1"/> Đúng
                                            </span>
                                        )}
                                        {isCorrect === false && (
                                            <span className="text-red-600 flex items-center">
                                                <XCircle size={16} className="mr-1"/> Sai
                                            </span>
                                        )}
                                        {isCorrect === null && (
                                            <span className="text-gray-600">Tự luận</span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <QuizQuestionView
                                        question={question}
                                        selectedAnswers={selectedAnswers[question.id] || []}
                                        textAnswer={textAnswers[question.id] || ''}
                                        onSelectOption={() => {
                                        }} // Disabled in results view
                                        onTextChange={() => {
                                        }} // Disabled in results view
                                        showCorrectAnswers={quiz.settings.showCorrectAnswers}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-between">
                    <button
                        onClick={onReview}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Xem lại bài kiểm tra
                    </button>

                    {onRetake && (
                        <button
                            onClick={onRetake}
                            className="px-4 py-2 border border-transparent rounded-md text-white bg-black hover:bg-gray-800"
                        >
                            Làm lại bài kiểm tra
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}