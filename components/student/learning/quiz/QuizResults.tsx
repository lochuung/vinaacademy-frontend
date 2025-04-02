import { FC, useState } from 'react';
import { Quiz, QuizQuestion as QuizQuestionType } from '@/types/lecture';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import QuizQuestion from './QuizQuestion';

interface QuizResultsProps {
    quiz: Quiz;
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
    onRetake?: () => void;
}

const QuizResults: FC<QuizResultsProps> = ({
    quiz,
    quizResults,
    selectedAnswers,
    textAnswers,
    onRetake
}) => {
    const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

    // Toggle mở rộng câu hỏi
    const toggleExpandQuestion = (questionId: string) => {
        if (expandedQuestions.includes(questionId)) {
            setExpandedQuestions(expandedQuestions.filter(id => id !== questionId));
        } else {
            setExpandedQuestions([...expandedQuestions, questionId]);
        }
    };

    // Mở rộng tất cả câu hỏi
    const expandAllQuestions = () => {
        setExpandedQuestions(quiz.questions.map(q => q.id));
    };

    // Thu gọn tất cả câu hỏi
    const collapseAllQuestions = () => {
        setExpandedQuestions([]);
    };

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header kết quả */}
                <div className="p-8 bg-gray-50 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-center mb-4">Kết quả bài kiểm tra</h1>

                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold mb-2 text-blue-700">
                            {quizResults.totalScore}/{quizResults.maxScore}
                        </div>
                        <div className="text-xl text-gray-600 mb-4">
                            {quizResults.percentageScore.toFixed(1)}%
                        </div>

                        {quiz.settings.requirePassingScore && (
                            <div className={`py-2 px-4 rounded-full font-medium ${quizResults.passed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {quizResults.passed
                                    ? <span className="flex items-center"><CheckCircle size={18} className="mr-1" /> Bạn đã đạt điểm tối thiểu {quiz.settings.passingScore}%</span>
                                    : <span className="flex items-center"><XCircle size={18} className="mr-1" /> Bạn chưa đạt điểm tối thiểu {quiz.settings.passingScore}%</span>
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* Tóm tắt kết quả */}
                <div className="p-6 border-b border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-xs text-blue-700 uppercase font-semibold">Câu hỏi</div>
                            <div className="text-2xl font-bold">{quiz.questions.length}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-xs text-green-700 uppercase font-semibold">Đúng</div>
                            <div className="text-2xl font-bold">
                                {quizResults.results.filter(r => r.correct === true).length}
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <div className="text-xs text-red-700 uppercase font-semibold">Sai</div>
                            <div className="text-2xl font-bold">
                                {quizResults.results.filter(r => r.correct === false).length}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-xs text-gray-700 uppercase font-semibold">Tự luận</div>
                            <div className="text-2xl font-bold">
                                {quizResults.results.filter(r => r.correct === null).length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Điều khiển hiển thị */}
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-600">Chi tiết câu trả lời của bạn</div>
                    <div className="flex space-x-2">
                        <button
                            onClick={expandAllQuestions}
                            className="text-blue-600 text-sm flex items-center hover:text-blue-800"
                        >
                            <ChevronDown size={16} className="mr-1" /> Mở tất cả
                        </button>
                        <button
                            onClick={collapseAllQuestions}
                            className="text-blue-600 text-sm flex items-center hover:text-blue-800"
                        >
                            <ChevronUp size={16} className="mr-1" /> Thu gọn tất cả
                        </button>
                    </div>
                </div>

                {/* Danh sách chi tiết câu hỏi */}
                <div className="divide-y divide-gray-200">
                    {quiz.questions.map((question, index) => {
                        const result = quizResults.results.find(r => r.questionId === question.id);
                        const isExpanded = expandedQuestions.includes(question.id);

                        return (
                            <div key={question.id} className="p-4">
                                <button
                                    onClick={() => toggleExpandQuestion(question.id)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${result?.correct === true
                                            ? 'bg-green-100 text-green-700'
                                            : result?.correct === false
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium">{question.text}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {question.points} điểm
                                                {result?.correct === true && <span className="text-green-600 ml-2 inline-flex items-center"><CheckCircle size={14} className="mr-1" /> Đúng</span>}
                                                {result?.correct === false && <span className="text-red-600 ml-2 inline-flex items-center"><XCircle size={14} className="mr-1" /> Sai</span>}
                                                {result?.correct === null && <span className="text-gray-600 ml-2">Tự luận</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="mt-4 pl-9">
                                        <QuizQuestion
                                            question={question}
                                            selectedAnswers={selectedAnswers[question.id] || []}
                                            textAnswer={textAnswers[question.id] || ''}
                                            onSelectOption={() => { }} // Không cần xử lý vì đã nộp bài
                                            onTextChange={() => { }} // Không cần xử lý vì đã nộp bài
                                            showCorrectAnswers={quiz.settings.showCorrectAnswers}
                                            isSubmitted={true}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Quay lại bài học
                    </button>

                    {onRetake && (
                        <button
                            onClick={onRetake}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <RefreshCw size={16} className="mr-2" /> Làm lại bài kiểm tra
                        </button>
                    )}

                    <button
                        onClick={() => {
                            // Chuyển đến bài tiếp theo trong thực tế
                            window.history.back();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                    >
                        Bài tiếp theo <ArrowRight size={16} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;