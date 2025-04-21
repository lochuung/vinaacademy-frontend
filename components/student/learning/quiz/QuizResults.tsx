import {FC, useState} from 'react';
import {Quiz, QuizQuestion as QuizQuestionType} from '@/types/lecture';
import {CheckCircle, XCircle, ArrowRight, RefreshCw, ChevronDown, ChevronUp} from 'lucide-react';
import QuizQuestion from './QuizQuestion';
import { QuizSubmissionResultDto, UserAnswerResultDto } from '@/types/quiz';

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
            explanation?: string;
            correctAnswers?: string[];
        }>;
        timeSpent?: number;
    };
    selectedAnswers: Record<string, string[]>;
    textAnswers: Record<string, string>;
    onRetake?: () => void;
    apiResult?: QuizSubmissionResultDto | null;
    showCorrectAnswers?: boolean;  // Add this prop
}

const QuizResults: FC<QuizResultsProps> = ({
                                               quiz,
                                               quizResults,
                                               selectedAnswers,
                                               textAnswers,
                                               onRetake,
                                               apiResult,
                                               showCorrectAnswers = false  // Add default value
                                           }) => {
    const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

    // Toggle question expansion
    const toggleExpandQuestion = (questionId: string) => {
        if (expandedQuestions.includes(questionId)) {
            setExpandedQuestions(expandedQuestions.filter(id => id !== questionId));
        } else {
            setExpandedQuestions([...expandedQuestions, questionId]);
        }
    };

    // Expand all questions
    const expandAllQuestions = () => {
        setExpandedQuestions(quiz.questions.map(q => q.id));
    };

    // Collapse all questions
    const collapseAllQuestions = () => {
        setExpandedQuestions([]);
    };

    // Format time duration
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Get answer result from API data
    const getAnswerResult = (questionId: string): UserAnswerResultDto | undefined => {
        if (!apiResult) return undefined;
        return apiResult.answers.find(a => a.questionId === questionId);
    };

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Results header */}
                <div className="p-8 bg-gray-50 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-center mb-4">Kết quả bài kiểm tra</h1>

                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold mb-2 text-blue-700">
                            {apiResult ? apiResult.score : quizResults.totalScore}/{apiResult ? apiResult.totalPoints : quizResults.maxScore}
                        </div>
                        <div className="text-xl text-gray-600 mb-4">
                            {apiResult 
                                ? ((apiResult.score / apiResult.totalPoints) * 100).toFixed(1) 
                                : quizResults.percentageScore.toFixed(1)}%
                        </div>

                        {quiz.settings.requirePassingScore && (
                            <div className={`py-2 px-4 rounded-full font-medium ${
                                (apiResult ? apiResult.isPassed : quizResults.passed)
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {(apiResult ? apiResult.isPassed : quizResults.passed)
                                    ? <span className="flex items-center">
                                        <CheckCircle size={18} className="mr-1"/> 
                                        Bạn đã đạt điểm tối thiểu {quiz.settings.passingScore}%
                                      </span>
                                    : <span className="flex items-center">
                                        <XCircle size={18} className="mr-1"/> 
                                        Bạn chưa đạt điểm tối thiểu {quiz.settings.passingScore}%
                                      </span>
                                }
                            </div>
                        )}
                        
                        {apiResult && apiResult.startTime && apiResult.endTime && (
                            <div className="mt-3 text-sm text-gray-600">
                                Thời gian làm bài: {
                                    new Date(apiResult.endTime).getTime() - new Date(apiResult.startTime).getTime() > 0
                                        ? Math.floor((new Date(apiResult.endTime).getTime() - new Date(apiResult.startTime).getTime()) / 1000 / 60) + ' phút ' +
                                          Math.floor(((new Date(apiResult.endTime).getTime() - new Date(apiResult.startTime).getTime()) / 1000) % 60) + ' giây'
                                        : '-'
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* Results summary */}
                <div className="p-6 border-b border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-xs text-blue-700 uppercase font-semibold">Câu hỏi</div>
                            <div className="text-2xl font-bold">{quiz.questions.length}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-xs text-green-700 uppercase font-semibold">Đúng</div>
                            <div className="text-2xl font-bold">
                                {apiResult 
                                    ? apiResult.answers.filter(a => a.isCorrect).length 
                                    : quizResults.results.filter(r => r.correct === true).length}
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <div className="text-xs text-red-700 uppercase font-semibold">Sai</div>
                            <div className="text-2xl font-bold">
                                {apiResult 
                                    ? apiResult.answers.filter(a => !a.isCorrect).length 
                                    : quizResults.results.filter(r => r.correct === false).length}
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

                {/* Display controls */}
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-600">Chi tiết câu trả lời của bạn</div>
                    <div className="flex space-x-2">
                        <button
                            onClick={expandAllQuestions}
                            className="text-blue-600 text-sm flex items-center hover:text-blue-800"
                        >
                            <ChevronDown size={16} className="mr-1"/> Mở tất cả
                        </button>
                        <button
                            onClick={collapseAllQuestions}
                            className="text-blue-600 text-sm flex items-center hover:text-blue-800"
                        >
                            <ChevronUp size={16} className="mr-1"/> Thu gọn tất cả
                        </button>
                    </div>
                </div>

                {/* Detailed questions list */}
                <div className="divide-y divide-gray-200">
                    {quiz.questions.map((question, index) => {
                        const result = quizResults.results.find(r => r.questionId === question.id);
                        const apiAnswer = apiResult?.answers.find(a => a.questionId === question.id);
                        const isExpanded = expandedQuestions.includes(question.id);

                        // Use API result if available, fallback to client-side result
                        const isCorrect = apiAnswer ? apiAnswer.isCorrect : result?.correct;
                        const earnedPoints = apiAnswer ? apiAnswer.earnedPoints : result?.score;

                        return (
                            <div key={question.id} className="p-4">
                                <button
                                    onClick={() => toggleExpandQuestion(question.id)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <div className="flex items-start">
                                        <div
                                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isCorrect === true
                                                ? 'bg-green-100 text-green-700'
                                                : isCorrect === false
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium">{question.text}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {apiAnswer?.points || question.points} điểm / Đạt: {earnedPoints || 0} điểm
                                                {isCorrect === true && <span
                                                    className="text-green-600 ml-2 inline-flex items-center"><CheckCircle
                                                    size={14} className="mr-1"/> Đúng</span>}
                                                {isCorrect === false && <span
                                                    className="text-red-600 ml-2 inline-flex items-center"><XCircle
                                                    size={14} className="mr-1"/> Sai</span>}
                                                {isCorrect === null &&
                                                    <span className="text-gray-600 ml-2">Tự luận</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {isExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="mt-4 pl-9">
                                        <QuizQuestion
                                            question={question}
                                            selectedAnswers={selectedAnswers[question.id] || []}
                                            textAnswer={textAnswers[question.id] || ''}
                                            onSelectOption={() => {}} // No-op as quiz is submitted
                                            onTextChange={() => {}} // No-op as quiz is submitted
                                            showCorrectAnswers={showCorrectAnswers}
                                            isSubmitted={true}
                                        />
                                        
                                        {/* Show explanation if available */}
                                        {showCorrectAnswers && (apiAnswer?.explanation || question.explanation) && (
                                            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                                                <h4 className="text-sm font-semibold text-blue-800 mb-1">Giải thích:</h4>
                                                <p className="text-blue-700">{apiAnswer?.explanation || question.explanation}</p>
                                            </div>
                                        )}
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
                            <RefreshCw size={16} className="mr-2"/> Làm lại bài kiểm tra
                        </button>
                    )}

                    <button
                        onClick={() => {
                            // Navigate to next lesson in real implementation
                            window.history.back();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                    >
                        Bài tiếp theo <ArrowRight size={16} className="ml-2"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;