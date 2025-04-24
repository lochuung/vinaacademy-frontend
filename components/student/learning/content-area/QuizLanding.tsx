"use client";

import { FC, useState, useEffect } from 'react';
import { getQuiz, getSubmissionHistory, getLatestSubmission } from '@/services/quizService';
import { QuizDto, QuizSubmissionResultDto } from '@/types/quiz';
import { AlertTriangle, Play, History, Award, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import QuizSubmissionHistory from '../quiz/QuizSubmissionHistory';
import QuizResults from '../quiz/QuizResults';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Quiz } from '@/types/lecture';
import { useQueryClient } from '@tanstack/react-query';

interface QuizLandingProps {
  quizId: string;
  onStartQuiz: () => void;
  onLessonCompleted?: () => void;
  courseSlug?: string;
  isCompleted?: boolean; // New prop to track if the lesson is already completed
}

const QuizLanding: FC<QuizLandingProps> = ({ quizId, onStartQuiz, onLessonCompleted, courseSlug, isCompleted = false }) => {
  const queryClient = useQueryClient();
  const [quiz, setQuiz] = useState<QuizDto | null>(null);
  const [latestSubmission, setLatestSubmission] = useState<QuizSubmissionResultDto | null>(null);
  const [submissions, setSubmissions] = useState<QuizSubmissionResultDto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmissionResultDto | null>(null);
  const [mappedQuiz, setMappedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        // Fetch quiz data
        const quizData = await getQuiz(quizId);
        if (quizData) {
          setQuiz(quizData);
          
          // Map API response to Quiz type for QuizResults component
          const mapped: Quiz = {
            title: quizData.title || 'Kiểm tra kiến thức',
            questions: quizData.questions.map(q => ({
                id: q.id,
                text: q.questionText,
                type: mapQuestionType(q.questionType),
                options: q.answers.map(a => ({
                    id: a.id,
                    text: a.answerText,
                    isCorrect: a.isCorrect || false
                })),
                explanation: q.explanation,
                points: q.point,
                isRequired: true
            })),
            settings: {
                randomizeQuestions: quizData.randomizeQuestions,
                showCorrectAnswers: quizData.showCorrectAnswers,
                allowRetake: quizData.allowRetake,
                requirePassingScore: quizData.requirePassingScore,
                passingScore: quizData.passingScore,
                timeLimit: quizData.timeLimit
            },
            totalPoints: quizData.totalPoint
          };
          
          setMappedQuiz(mapped);
        }
        
        // Only fetch latest submission if the lesson is completed
        if (isCompleted) {
          const latestSub = await getLatestSubmission(quizId);
          if (latestSub) {
            setLatestSubmission(latestSub);
          }
        }
        
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Helper function to map API question types to UI types
    const mapQuestionType = (type: string): 'single_choice' | 'multiple_choice' | 'text' | 'true_false' => {
        switch (type) {
            case 'SINGLE_CHOICE':
                return 'single_choice';
            case 'MULTIPLE_CHOICE':
                return 'multiple_choice';
            case 'TEXT':
                return 'text';
            case 'TRUE_FALSE':
                return 'true_false';
            default:
                return 'single_choice';
        }
    };
    
    fetchQuizData();
  }, [quizId, isCompleted]);

  const handleViewHistory = async () => {
    setLoadingHistory(true);
    setShowHistory(true);
    setSelectedSubmission(null);
    
    try {
      const history = await getSubmissionHistory(quizId);
      setSubmissions(history);
    } catch (error) {
      console.error("Error fetching submission history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSelectSubmission = (submission: QuizSubmissionResultDto) => {
    setSelectedSubmission(submission);
    
    // If the selected submission is passed and we have callbacks
    if (submission.isPassed && onLessonCompleted && courseSlug) {
      // Invalidate the query
      queryClient.invalidateQueries({
        queryKey: ['lecture', courseSlug]
      });
      
      // Call the callback
      onLessonCompleted();
    }
  };

  const handleBackToHistory = () => {
    setSelectedSubmission(null);
    setShowHistory(true);
  };

  const handleBackToLanding = () => {
    setSelectedSubmission(null);
    setShowHistory(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: vi
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Không thể tải bài kiểm tra</h2>
        <p className="text-gray-600 mb-4">Có lỗi xảy ra khi tải thông tin bài kiểm tra. Vui lòng thử lại sau.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Tải lại trang
        </button>
      </div>
    );
  }
  
  // Check if quiz is blocked due to previous attempts
  const isQuizBlocked = latestSubmission && !quiz.allowRetake;
  
  // If a submission is selected, show its detailed results
  if (selectedSubmission && mappedQuiz) {
    // Generate empty placeholder objects for selectedAnswers and textAnswers
    // In a real implementation, we'd fetch the actual user answers from the API
    const dummySelectedAnswers: Record<string, string[]> = {};
    const dummyTextAnswers: Record<string, string> = {};
    
    // Create dummy results to show the selected submission
    const submissionResults = {
      totalScore: selectedSubmission.score,
      maxScore: selectedSubmission.totalPoints,
      percentageScore: (selectedSubmission.score / selectedSubmission.totalPoints) * 100,
      passed: selectedSubmission.isPassed,
      results: selectedSubmission.answers.map(answer => ({
        questionId: answer.questionId,
        correct: answer.isCorrect,
        score: answer.earnedPoints,
        userAnswer: answer.textAnswer ? answer.textAnswer : 
          answer.answers.filter(a => a.isSelected).map(a => a.id),
        explanation: answer.explanation,
        correctAnswers: answer.answers.filter(a => a.isCorrect).map(a => a.id)
      }))
    };
    
    // For each answer, populate the dummy objects with the user's selections
    selectedSubmission.answers.forEach(answer => {
      if (answer.textAnswer) {
        dummyTextAnswers[answer.questionId] = answer.textAnswer;
      } else {
        dummySelectedAnswers[answer.questionId] = answer.answers
          .filter(a => a.isSelected)
          .map(a => a.id);
      }
    });
    
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-blue-800 font-medium">Xem kết quả bài làm</div>
              <div className="text-sm text-blue-600">
                Ngày làm bài: {formatDate(selectedSubmission.startTime)}
              </div>
            </div>
            <button 
              onClick={handleBackToHistory}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại lịch sử
            </button>
          </div>
        </div>
        
        <QuizResults
          quiz={mappedQuiz}
          quizResults={submissionResults}
          selectedAnswers={dummySelectedAnswers}
          textAnswers={dummyTextAnswers}
          apiResult={selectedSubmission}
          showCorrectAnswers={mappedQuiz.settings.showCorrectAnswers}
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl p-4">
      {showHistory ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Lịch sử làm bài</h2>
            <button
              onClick={handleBackToLanding}
              className="text-gray-600 hover:text-gray-800"
            >
              Quay lại
            </button>
          </div>
          <QuizSubmissionHistory
            quizId={quizId}
            submissions={submissions}
            isLoading={loadingHistory}
            onSelectSubmission={handleSelectSubmission}
          />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Quiz Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>
          
          {/* Quiz Info Cards */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-sm text-blue-700 font-semibold">Điểm tối đa</div>
                <div className="text-xl font-bold">{quiz.totalPoint} điểm</div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg flex items-center">
              <Clock className="h-8 w-8 text-amber-600 mr-3" />
              <div>
                <div className="text-sm text-amber-700 font-semibold">Thời gian làm bài</div>
                <div className="text-xl font-bold">
                  {quiz.timeLimit > 0 ? `${quiz.timeLimit} phút` : 'Không giới hạn'}
                </div>
              </div>
            </div>
            
            {quiz.requirePassingScore && (
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-sm text-green-700 font-semibold">Điểm đạt</div>
                  <div className="text-xl font-bold">{quiz.passingScore}%</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Latest submission info */}
          {latestSubmission && (
            <div className={`p-6 border-t border-b border-gray-200 ${
              latestSubmission.isPassed ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Lần làm gần đây nhất</h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    {latestSubmission.isPassed ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className={latestSubmission.isPassed ? 'text-green-700' : 'text-red-700'}>
                      {latestSubmission.isPassed ? 'Đạt yêu cầu' : 'Chưa đạt yêu cầu'}
                    </span>
                  </div>
                  <div className="text-gray-700">
                    Điểm số: <span className="font-semibold">{latestSubmission.score}/{latestSubmission.totalPoints}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Thời gian: {formatDate(latestSubmission.startTime)}
                    <span className="text-xs ml-2">({getTimeAgo(latestSubmission.startTime)})</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleViewHistory}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-100 flex items-center justify-center"
                  >
                    <History className="h-4 w-4 mr-2" /> Xem lịch sử làm bài
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Quiz Rules */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">Quy định bài kiểm tra</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                Bài kiểm tra gồm {quiz.questions?.length || 0} câu hỏi
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                {quiz.timeLimit > 0 
                  ? `Thời gian làm bài là ${quiz.timeLimit} phút` 
                  : 'Không giới hạn thời gian làm bài'}
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                {quiz.requirePassingScore 
                  ? `Điểm đạt tối thiểu là ${quiz.passingScore}%` 
                  : 'Không yêu cầu điểm đạt tối thiểu'}
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                {quiz.allowRetake 
                  ? 'Bạn được phép làm lại bài kiểm tra nhiều lần' 
                  : 'Bài kiểm tra chỉ được làm một lần duy nhất'}
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                {quiz.showCorrectAnswers 
                  ? 'Đáp án đúng sẽ được hiển thị sau khi nộp bài' 
                  : 'Đáp án đúng sẽ không được hiển thị sau khi nộp bài'}
              </li>
              {quiz.randomizeQuestions && (
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  Thứ tự câu hỏi sẽ được xáo trộn ngẫu nhiên
                </li>
              )}
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Quay lại bài học
            </button>
            
            {isQuizBlocked ? (
              <div className="flex items-center text-gray-600">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Bạn đã hoàn thành bài kiểm tra này
              </div>
            ) : (
              <button
                onClick={onStartQuiz}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Play className="h-4 w-4 mr-2" /> Bắt đầu làm bài
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizLanding;