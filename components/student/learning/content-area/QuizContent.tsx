"use client";

import {FC, useState, useEffect} from 'react';
import {ChevronLeft, ChevronRight, Check, Clock, AlertCircle} from 'lucide-react';
import {Quiz, QuizQuestion as QuizQuestionType} from '@/types/lecture';
import QuizProgress from '../quiz/QuizProgress';
import QuizQuestion from '../quiz/QuizQuestion';
import QuizResults from '../quiz/QuizResults';
import QuizTimer from '../quiz/QuizTimer';

interface QuizContentProps {
    courseId: string;
    lectureId: string;
}

const QuizContent: FC<QuizContentProps> = ({courseId, lectureId: lectureId}) => {
    // Trong ứng dụng thực, bạn sẽ lấy dữ liệu quiz từ API
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
    const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [requireConfirmation, setRequireConfirmation] = useState(false);

    // Mẫu dữ liệu quiz - trong thực tế, bạn sẽ lấy từ API
    useEffect(() => {
        // Giả lập việc tải dữ liệu từ API
        const fetchQuizData = async () => {
            setLoading(true);
            // Đây là dữ liệu mẫu, trong thực tế, bạn sẽ gọi API
            const mockQuiz: Quiz = {
                questions: [
                    {
                        id: 'q1',
                        text: 'Toán tử nào được sử dụng để kiểm tra xem hai đối tượng có cùng giá trị không?',
                        type: 'single_choice',
                        options: [
                            {id: 'q1_a', text: '==', isCorrect: true},
                            {id: 'q1_b', text: 'is', isCorrect: false},
                            {id: 'q1_c', text: '===', isCorrect: false},
                            {id: 'q1_d', text: 'equals()', isCorrect: false}
                        ],
                        explanation: 'Toán tử == kiểm tra giá trị bằng nhau, trong khi "is" kiểm tra xem hai biến có tham chiếu đến cùng một đối tượng trong bộ nhớ không.',
                        points: 1,
                        isRequired: true
                    },
                    {
                        id: 'q2',
                        text: 'Trong Python, các toán tử nào thực hiện phép tính số học?',
                        type: 'multiple_choice',
                        options: [
                            {id: 'q2_a', text: '+', isCorrect: true},
                            {id: 'q2_b', text: '**', isCorrect: true},
                            {id: 'q2_c', text: 'and', isCorrect: false},
                            {id: 'q2_d', text: '%', isCorrect: true},
                            {id: 'q2_e', text: 'in', isCorrect: false}
                        ],
                        explanation: 'Các toán tử số học trong Python bao gồm +, -, *, /, %, // và **.',
                        points: 2,
                        isRequired: true
                    },
                    {
                        id: 'q3',
                        text: 'True or False: Toán tử "is" trong Python kiểm tra xem hai biến có cùng một giá trị hay không.',
                        type: 'true_false',
                        options: [
                            {id: 'q3_a', text: 'Đúng', isCorrect: false},
                            {id: 'q3_b', text: 'Sai', isCorrect: true}
                        ],
                        explanation: 'Sai. Toán tử "is" kiểm tra xem hai biến có tham chiếu đến cùng một đối tượng trong bộ nhớ không, không phải kiểm tra giá trị bằng nhau.',
                        points: 1,
                        isRequired: true
                    },
                    {
                        id: 'q4',
                        text: 'Giải thích sự khác nhau giữa toán tử "/" và "//" trong Python.',
                        type: 'text',
                        options: [],
                        explanation: 'Toán tử "/" thực hiện phép chia và trả về kết quả là một số thực (float), trong khi "//" thực hiện phép chia lấy phần nguyên và trả về số nguyên được làm tròn xuống.',
                        points: 3,
                        isRequired: false
                    },
                    {
                        id: 'q5',
                        text: 'Đâu là kết quả của biểu thức: 3 ** 2 % 5 trong Python?',
                        type: 'single_choice',
                        options: [
                            {id: 'q5_a', text: '9', isCorrect: false},
                            {id: 'q5_b', text: '4', isCorrect: true},
                            {id: 'q5_c', text: '1', isCorrect: false},
                            {id: 'q5_d', text: '0', isCorrect: false}
                        ],
                        explanation: '3 ** 2 = 9, sau đó 9 % 5 = 4 (phần dư khi chia 9 cho 5)',
                        points: 1,
                        isRequired: true
                    }
                ],
                settings: {
                    randomizeQuestions: true,
                    showCorrectAnswers: true,
                    allowRetake: true,
                    requirePassingScore: true,
                    passingScore: 70,
                    timeLimit: 10 // thời gian giới hạn tính bằng phút
                },
                totalPoints: 8
            };

            // Nếu cài đặt random câu hỏi, sắp xếp lại
            if (mockQuiz.settings.randomizeQuestions) {
                mockQuiz.questions = [...mockQuiz.questions].sort(() => Math.random() - 0.5);
            }

            setQuiz(mockQuiz);

            // Khởi tạo thời gian còn lại nếu có giới hạn thời gian
            if (mockQuiz.settings.timeLimit) {
                setRemainingTime(mockQuiz.settings.timeLimit * 60); // Chuyển phút thành giây
            }

            setLoading(false);
        };

        fetchQuizData();
    }, [lectureId]);

    // Xử lý đếm ngược nếu có giới hạn thời gian
    useEffect(() => {
        if (!remainingTime || isSubmitted || showResults) return;

        const timer = setInterval(() => {
            setRemainingTime(prev => {
                if (prev && prev > 0) {
                    return prev - 1;
                } else {
                    // Hết thời gian, tự động submit
                    clearInterval(timer);
                    handleSubmitQuiz();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTime, isSubmitted, showResults]);

    if (loading || !quiz) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    // Xử lý khi lựa chọn đáp án
    const handleSelectOption = (questionId: string, optionId: string) => {
        const question = quiz.questions.find(q => q.id === questionId);

        if (!question) return;

        if (question.type === 'single_choice' || question.type === 'true_false') {
            // Đối với câu hỏi một lựa chọn, chỉ chọn một đáp án
            setSelectedAnswers({
                ...selectedAnswers,
                [questionId]: [optionId]
            });
        } else if (question.type === 'multiple_choice') {
            // Đối với câu hỏi nhiều lựa chọn, toggle lựa chọn
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

    // Xử lý khi nhập câu trả lời tự luận
    const handleTextAnswer = (questionId: string, text: string) => {
        setTextAnswers({
            ...textAnswers,
            [questionId]: text
        });
    };

    // Kiểm tra xem câu hỏi hiện tại đã được trả lời chưa
    const isCurrentQuestionAnswered = () => {
        if (currentQuestion.type === 'text') {
            return textAnswers[currentQuestion.id]?.trim().length > 0;
        } else {
            return selectedAnswers[currentQuestion.id]?.length > 0;
        }
    };

    // Kiểm tra xem tất cả câu hỏi bắt buộc đã được trả lời chưa
    const areRequiredQuestionsAnswered = () => {
        return quiz.questions.every(question => {
            if (!question.isRequired) return true;

            if (question.type === 'text') {
                return textAnswers[question.id]?.trim().length > 0;
            } else {
                return selectedAnswers[question.id]?.length > 0;
            }
        });
    };

    // Tính điểm và kết quả
    const calculateResults = () => {
        let totalScore = 0;
        let maxScore = 0;

        const results = quiz.questions.map(question => {
            maxScore += question.points;

            // Đối với câu hỏi tự luận, không thể tự động chấm điểm
            if (question.type === 'text') {
                return {
                    questionId: question.id,
                    correct: null, // Không thể xác định tự động
                    score: 0, // Điểm mặc định là 0
                    userAnswer: textAnswers[question.id] || ''
                };
            }

            const selectedOptionIds = selectedAnswers[question.id] || [];

            // Kiểm tra đáp án
            if (question.type === 'single_choice' || question.type === 'true_false') {
                // Đối với câu hỏi một lựa chọn
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
                // Đối với câu hỏi nhiều lựa chọn
                const correctOptionIds = question.options
                    .filter(o => o.isCorrect)
                    .map(o => o.id);

                const incorrectSelections = selectedOptionIds.filter(id => !correctOptionIds.includes(id));
                const missedCorrect = correctOptionIds.filter(id => !selectedOptionIds.includes(id));

                const isFullyCorrect = incorrectSelections.length === 0 && missedCorrect.length === 0;

                // Chỉ cho điểm đầy đủ nếu hoàn toàn đúng
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
        const passed = !quiz.settings.requirePassingScore || percentageScore >= quiz.settings.passingScore;

        return {
            totalScore,
            maxScore,
            percentageScore,
            passed,
            results
        };
    };

    // Di chuyển đến câu hỏi tiếp theo
    const goToNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Di chuyển đến câu hỏi trước đó
    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Mở xác nhận nộp bài
    const handleConfirmSubmit = () => {
        // Kiểm tra nếu tất cả câu hỏi bắt buộc đã được trả lời
        if (!areRequiredQuestionsAnswered()) {
            setRequireConfirmation(true);
        } else {
            handleSubmitQuiz();
        }
    };

    // Nộp bài
    const handleSubmitQuiz = () => {
        setIsSubmitted(true);
        setShowResults(true);
        setRequireConfirmation(false);
    };

    // Quay lại làm bài
    const handleContinueQuiz = () => {
        setRequireConfirmation(false);
    };

    // Bắt đầu làm lại bài
    const handleRetakeQuiz = () => {
        setSelectedAnswers({});
        setTextAnswers({});
        setCurrentQuestionIndex(0);
        setIsSubmitted(false);
        setShowResults(false);

        // Đặt lại thời gian nếu có giới hạn thời gian
        if (quiz.settings.timeLimit) {
            setRemainingTime(quiz.settings.timeLimit * 60);
        }
    };

    if (showResults) {
        return (
            <QuizResults
                quiz={quiz}
                quizResults={calculateResults()}
                selectedAnswers={selectedAnswers}
                textAnswers={textAnswers}
                onRetake={quiz.settings.allowRetake ? handleRetakeQuiz : undefined}
            />
        );
    }

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Bài kiểm tra: Toán tử trong Python</h1>

                        {/* Nếu có thời gian giới hạn, hiển thị đồng hồ đếm ngược */}
                        {remainingTime !== null && (
                            <QuizTimer remainingTime={remainingTime}/>
                        )}
                    </div>

                    {/* Thanh tiến trình */}
                    <div className="mt-4">
                        <QuizProgress
                            currentQuestion={currentQuestionIndex + 1}
                            totalQuestions={quiz.questions.length}
                            questions={quiz.questions}
                            selectedAnswers={selectedAnswers}
                            textAnswers={textAnswers}
                            onSelectQuestion={(index) => setCurrentQuestionIndex(index)}
                        />
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="mb-6">
                        <div className="text-gray-500 text-sm mb-2">
                            Câu hỏi {currentQuestionIndex + 1} / {quiz.questions.length}
                            {currentQuestion.isRequired && <span className="text-red-500 ml-1">*</span>}
                            <span className="ml-2 font-medium">{currentQuestion.points} điểm</span>
                        </div>

                        <QuizQuestion
                            question={currentQuestion}
                            selectedAnswers={selectedAnswers[currentQuestion.id] || []}
                            textAnswer={textAnswers[currentQuestion.id] || ''}
                            onSelectOption={(optionId) => handleSelectOption(currentQuestion.id, optionId)}
                            onTextChange={(text) => handleTextAnswer(currentQuestion.id, text)}
                            showCorrectAnswers={false}
                            isSubmitted={isSubmitted}
                        />
                    </div>

                    {/* Điều hướng */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={goToPreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`flex items-center px-4 py-2 border rounded-md ${currentQuestionIndex === 0
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <ChevronLeft size={16} className="mr-1"/> Câu hỏi trước
                        </button>

                        {currentQuestionIndex < quiz.questions.length - 1 ? (
                            <button
                                onClick={goToNextQuestion}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Câu hỏi tiếp theo <ChevronRight size={16} className="ml-1"/>
                            </button>
                        ) : (
                            <button
                                onClick={handleConfirmSubmit}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                <Check size={16} className="mr-1"/> Nộp bài
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Xác nhận nộp bài */}
            {requireConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex items-start mb-4">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-6 w-6 text-yellow-500"/>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-gray-900">Có câu hỏi bắt buộc chưa trả lời</h3>
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Bạn chưa trả lời tất cả các câu hỏi bắt buộc. Bạn có chắc chắn muốn nộp bài?</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleContinueQuiz}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Quay lại làm bài
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitQuiz}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                            >
                                Nộp bài ngay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizContent;