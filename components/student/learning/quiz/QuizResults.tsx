import {FC, useState, useEffect} from 'react';
import {Quiz, QuizQuestion as QuizQuestionType} from '@/types/lecture';
import {CheckCircle, XCircle, ArrowRight, RefreshCw, ChevronDown, ChevronUp, History, X} from 'lucide-react';
import QuizQuestion from './QuizQuestion';
import { QuizSubmissionResultDto, UserAnswerResultDto } from '@/types/quiz';
import QuizSubmissionHistory from './QuizSubmissionHistory';
import { getSubmissionHistory } from '@/services/quizService';

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
    showCorrectAnswers?: boolean;
}

const QuizResults: FC<QuizResultsProps> = ({
    quiz,
    quizResults,
    selectedAnswers,
    textAnswers,
    onRetake,
    apiResult,
    showCorrectAnswers = false
}) => {
    const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [submissions, setSubmissions] = useState<QuizSubmissionResultDto[] | null>(null);
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);
    const [viewingSubmission, setViewingSubmission] = useState<QuizSubmissionResultDto | null>(null);

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
        setExpandedQuestions(quiz.questions.map(q => q.id || ''));
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

    // Fetch submission history when the modal is opened
    const handleOpenHistory = async () => {
        if (!apiResult) return;
        
        setShowHistory(true);
        setLoadingSubmissions(true);
        
        try {
            const history = await getSubmissionHistory(apiResult.quizId);
            setSubmissions(history);
        } catch (error) {
            console.error("Failed to fetch submission history:", error);
        } finally {
            setLoadingSubmissions(false);
        }
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
    };

    const handleSelectSubmission = (submission: QuizSubmissionResultDto) => {
        setViewingSubmission(submission);
        setShowHistory(false);
    };

    // Reset to current submission
    const handleResetToCurrentSubmission = () => {
        setViewingSubmission(null);
    };

    // Use viewing submission if available, otherwise use the apiResult
    const displayedResult = viewingSubmission || apiResult;

    return (
        <div className="container mx-auto max-w-4xl px-4 pb-8">
            {viewingSubmission && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                            <div className="text-blue-800 font-medium">Đang xem lịch sử làm bài</div>
                            <div className="text-sm text-blue-600">
                                Lần làm bài ngày {new Date(viewingSubmission.startTime).toLocaleDateString('vi-VN')}
                            </div>
                        </div>
                        <button 
                            onClick={handleResetToCurrentSubmission} 
                            className="text-blue-700 hover:text-blue-900 px-3 py-1.5 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
                        >
                            Quay lại kết quả hiện tại
                        </button>
                    </div>
                </div>
            )}
        
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Results header */}
                <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-200">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Kết quả bài kiểm tra</h1>

                    <div className="flex flex-col items-center">
                        <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-700">
                            {displayedResult ? displayedResult.score : quizResults.totalScore}/{displayedResult ? displayedResult.totalPoints : quizResults.maxScore}
                        </div>
                        <div className="text-xl text-gray-600 mb-4">
                            {displayedResult 
                                ? ((displayedResult.score / Math.max(displayedResult.totalPoints, 1)) * 100).toFixed(1) 
                                : quizResults.percentageScore.toFixed(1)}%
                        </div>

                        {quiz.settings.requirePassingScore && (
                            <div className={`py-2 px-4 rounded-full font-medium ${
                                (displayedResult ? displayedResult.isPassed : quizResults.passed)
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {(displayedResult ? displayedResult.isPassed : quizResults.passed)
                                    ? <span className="flex items-center">
                                        <CheckCircle size={18} className="mr-1.5"/> 
                                        Bạn đã đạt điểm tối thiểu {quiz.settings.passingScore}%
                                      </span>
                                    : <span className="flex items-center">
                                        <XCircle size={18} className="mr-1.5"/> 
                                        Bạn chưa đạt điểm tối thiểu {quiz.settings.passingScore}%
                                      </span>
                                }
                            </div>
                        )}
                        
                        {displayedResult && displayedResult.startTime && displayedResult.endTime && (
                            <div className="mt-3 text-sm text-gray-600">
                                Thời gian làm bài: {
                                    new Date(displayedResult.endTime).getTime() - new Date(displayedResult.startTime).getTime() > 0
                                        ? Math.floor((new Date(displayedResult.endTime).getTime() - new Date(displayedResult.startTime).getTime()) / 1000 / 60) + ' phút ' +
                                          Math.floor(((new Date(displayedResult.endTime).getTime() - new Date(displayedResult.startTime).getTime()) / 1000) % 60) + ' giây'
                                        : '-'
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* Results summary */}
                <div className="p-6 border-b border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="text-xs text-blue-700 uppercase font-semibold">Câu hỏi</div>
                            <div className="text-2xl font-bold">{quiz.questions.length}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="text-xs text-green-700 uppercase font-semibold">Đúng</div>
                            <div className="text-2xl font-bold">
                                {displayedResult 
                                    ? displayedResult.answers.filter(a => a.isCorrect).length 
                                    : quizResults.results.filter(r => r.correct === true).length}
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="text-xs text-red-700 uppercase font-semibold">Sai</div>
                            <div className="text-2xl font-bold">
                                {displayedResult 
                                    ? displayedResult.answers.filter(a => !a.isCorrect).length 
                                    : quizResults.results.filter(r => r.correct === false).length}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="text-xs text-gray-700 uppercase font-semibold">Tự luận</div>
                            <div className="text-2xl font-bold">
                                {quizResults.results.filter(r => r.correct === null).length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display controls */}
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
                    <div className="text-sm text-gray-600">Chi tiết câu trả lời của bạn</div>
                    <div className="flex space-x-2">
                        <button
                            onClick={expandAllQuestions}
                            className="text-blue-600 text-sm flex items-center hover:text-blue-800 bg-white px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                            <ChevronDown size={16} className="mr-1"/> Mở tất cả
                        </button>
                        <button
                            onClick={collapseAllQuestions}
                            className="text-blue-600 text-sm flex items-center hover:text-blue-800 bg-white px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                            <ChevronUp size={16} className="mr-1"/> Thu gọn tất cả
                        </button>
                    </div>
                </div>

                {/* Detailed questions list */}
                <div className="divide-y divide-gray-200">
                    {quiz.questions.map((question, index) => {
                        const result = quizResults.results.find(r => r.questionId === question.id);
                        const apiAnswer = displayedResult?.answers.find(a => a.questionId === question.id);
                        const isExpanded = expandedQuestions.includes(question.id || '');

                        // Use API result if available, fallback to client-side result
                        const isCorrect = apiAnswer ? apiAnswer.isCorrect : result?.correct;
                        const earnedPoints = apiAnswer ? apiAnswer.earnedPoints : result?.score;

                        return (
                            <div key={question.id || ''} className={`p-4 transition-colors ${isExpanded ? 'bg-gray-50' : ''}`}>
                                <button
                                    onClick={() => toggleExpandQuestion(question.id || '')}
                                    className="w-full flex items-center justify-between text-left transition-colors hover:bg-gray-50 p-2 rounded-md"
                                    aria-expanded={isExpanded}
                                    aria-controls={`question-${question.id}`}
                                >
                                    <div className="flex items-start">
                                        <div
                                            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-3 ${isCorrect === true
                                                ? 'bg-green-100 text-green-700'
                                                : isCorrect === false
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium line-clamp-2">{question.text}</div>
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
                                    <div className="flex-shrink-0">
                                        {isExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="mt-4 pl-5 md:pl-9" id={`question-${question.id}`}>
                                        <QuizQuestion
                                            question={question}
                                            selectedAnswers={selectedAnswers[question.id || ''] || []}
                                            textAnswer={textAnswers[question.id || ''] || ''}
                                            onSelectOption={() => {}} // No-op as quiz is submitted
                                            onTextChange={() => {}} // No-op as quiz is submitted
                                            showCorrectAnswers={showCorrectAnswers}
                                            isSubmitted={true}
                                            quizResults={result}
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
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-between gap-3">
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Quay lại bài học
                    </button>

                    <div className="flex flex-wrap gap-3">
                        {/* History button - only show if apiResult exists */}
                        {apiResult && (
                            <button
                                onClick={handleOpenHistory}
                                className="px-4 py-2 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 flex items-center transition-colors"
                            >
                                <History size={16} className="mr-2"/> Xem lịch sử
                            </button>
                        )}

                        {onRetake && (
                            <button
                                onClick={onRetake}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors"
                            >
                                <RefreshCw size={16} className="mr-2"/> Làm lại
                            </button>
                        )}

                        <button
                            onClick={() => {
                                // Navigate to next lesson in real implementation
                                window.history.back();
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center transition-colors"
                        >
                            Bài tiếp theo <ArrowRight size={16} className="ml-2"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quiz History Modal */}
            {showHistory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h3 className="text-lg font-medium">Lịch sử làm bài</h3>
                            <button 
                                onClick={handleCloseHistory}
                                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                                aria-label="Đóng"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-grow">
                            <QuizSubmissionHistory
                                quizId={apiResult?.quizId || ""}
                                submissions={submissions}
                                isLoading={loadingSubmissions}
                                onSelectSubmission={handleSelectSubmission}
                            />
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
                            <button
                                onClick={handleCloseHistory}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizResults;