"use client";

import { FC, useState } from 'react';
import { User, BookOpen } from 'lucide-react';

interface UserType {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'instructor';
}

interface QuestionType {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: UserType;
    answers: AnswerType[];
    upvotes: number;
    isUpvoted: boolean;
}

interface AnswerType {
    id: string;
    content: string;
    createdAt: Date;
    user: UserType;
    upvotes: number;
    isUpvoted: boolean;
    isAccepted: boolean;
}

interface QuestionsAreaProps {
    lectureId: string;
    courseId: string;
}

const QuestionsArea: FC<QuestionsAreaProps> = ({ lectureId: lectureId, courseId }) => {
    const [questions, setQuestions] = useState<QuestionType[]>([
        {
            id: '1',
            title: 'Sự khác nhau giữa == và is trong Python là gì?',
            content: 'Tôi thấy đôi khi == và is cho kết quả khác nhau khi so sánh giá trị. Ai đó có thể giải thích khi nào nên sử dụng cái nào?',
            createdAt: new Date('2025-03-08T14:22:00'),
            user: {
                id: 'user1',
                name: 'Nguyễn Văn A',
                avatar: '/images/avatars/alex.jpg',
                role: 'student'
            },
            answers: [
                {
                    id: 'answer1',
                    content: '`==` so sánh giá trị của hai đối tượng (tính bằng nhau), trong khi `is` so sánh xem hai tham chiếu có đề cập đến cùng một đối tượng hay không (tính đồng nhất).\n\nVí dụ:\n```python\na = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(a == b)  # True (cùng giá trị)\nprint(a is b)  # False (khác đối tượng)\nprint(a is c)  # True (cùng đối tượng)\n```\n\nSử dụng `==` khi bạn muốn kiểm tra xem hai đối tượng có cùng giá trị hay không, và `is` khi bạn muốn kiểm tra xem hai biến có trỏ đến chính xác cùng một đối tượng trong bộ nhớ hay không.',
                    createdAt: new Date('2025-03-08T15:10:00'),
                    user: {
                        id: 'instructor1',
                        name: 'GV. Trần Văn B',
                        avatar: '/images/avatars/professor.jpg',
                        role: 'instructor'
                    },
                    upvotes: 12,
                    isUpvoted: true,
                    isAccepted: true
                },
                {
                    id: 'answer2',
                    content: 'Cũng lưu ý rằng đối với số nguyên nhỏ, chuỗi và một số đối tượng bất biến khác, Python có thể tái sử dụng cùng một đối tượng để tăng hiệu suất, điều này có thể dẫn đến kết quả gây nhầm lẫn khi sử dụng `is`. Luôn sử dụng `==` để so sánh giá trị.',
                    createdAt: new Date('2025-03-08T16:45:00'),
                    user: {
                        id: 'instructor1',
                        name: 'GV. Trần Văn B',
                        avatar: '/images/avatars/professor.jpg',
                        role: 'instructor'
                    },
                    upvotes: 5,
                    isUpvoted: false,
                    isAccepted: false
                }
            ],
            upvotes: 8,
            isUpvoted: true
        },
        {
            id: '2',
            title: 'Ai có thể giải thích về toán tử bit?',
            content: 'Bài học đề cập đến toán tử bit một cách ngắn gọn, nhưng tôi vẫn còn khá mơ hồ về cách chúng hoạt động và khi nào nên sử dụng chúng.',
            createdAt: new Date('2025-03-10T09:15:00'),
            user: {
                id: 'user3',
                name: 'Phạm Văn D',
                avatar: '/images/avatars/michael.jpg',
                role: 'student'
            },
            answers: [],
            upvotes: 3,
            isUpvoted: false
        }
    ]);

    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [newQuestionTitle, setNewQuestionTitle] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');
    const [showAskForm, setShowAskForm] = useState(false);
    const [filter, setFilter] = useState<'newest' | 'popular' | 'unanswered'>('newest');
    const [searchQuery, setSearchQuery] = useState('');

    // Chuyển đổi upvote cho câu hỏi
    const toggleQuestionUpvote = (questionId: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId
                    ? {
                        ...question,
                        upvotes: question.isUpvoted ? question.upvotes - 1 : question.upvotes + 1,
                        isUpvoted: !question.isUpvoted
                    }
                    : question
            )
        );
    };

    // Chuyển đổi upvote cho câu trả lời
    const toggleAnswerUpvote = (questionId: string, answerId: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId
                    ? {
                        ...question,
                        answers: question.answers.map(answer =>
                            answer.id === answerId
                                ? {
                                    ...answer,
                                    upvotes: answer.isUpvoted ? answer.upvotes - 1 : answer.upvotes + 1,
                                    isUpvoted: !answer.isUpvoted
                                }
                                : answer
                        )
                    }
                    : question
            )
        );
    };

    // Đánh dấu câu trả lời được chấp nhận - chỉ dành cho học viên đặt câu hỏi
    const acceptAnswer = (questionId: string, answerId: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId
                    ? {
                        ...question,
                        answers: question.answers.map(answer => ({
                            ...answer,
                            isAccepted: answer.id === answerId
                        }))
                    }
                    : question
            )
        );
    };

    // Gửi câu hỏi mới
    const submitQuestion = () => {
        if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

        const newQuestion: QuestionType = {
            id: `question_${Date.now()}`,
            title: newQuestionTitle,
            content: newQuestionContent,
            createdAt: new Date(),
            user: {
                id: 'current_user',
                name: 'Bạn',
                avatar: '/images/avatars/default.jpg',
                role: 'student'
            },
            answers: [],
            upvotes: 0,
            isUpvoted: false
        };

        setQuestions(prev => [newQuestion, ...prev]);
        setNewQuestionTitle('');
        setNewQuestionContent('');
        setShowAskForm(false);
    };

    // Định dạng thời gian tương đối
    const formatRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;

        return date.toLocaleDateString('vi-VN');
    };

    // Lọc câu hỏi dựa trên bộ lọc đã chọn và truy vấn tìm kiếm
    const filteredQuestions = questions
        .filter(question => {
            if (filter === 'unanswered') return question.answers.length === 0;
            return true;
        })
        .filter(question => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                question.title.toLowerCase().includes(query) ||
                question.content.toLowerCase().includes(query) ||
                question.answers.some(answer => answer.content.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => {
            if (filter === 'popular') return b.upvotes - a.upvotes;
            return b.createdAt.getTime() - a.createdAt.getTime(); // mới nhất
        });

    // Lấy câu hỏi đã chọn hoặc null
    const activeQuestion = selectedQuestion
        ? questions.find(q => q.id === selectedQuestion) || null
        : null;

    return (
        <div className="h-full flex flex-col">
            {/* Banner hiển thị thông tin về khu vực hỏi đáp */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mx-6 mt-6 mb-4 flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-blue-800 mb-1">Hỏi đáp với giảng viên</h3>
                    <p className="text-blue-700 text-sm">
                        Đây là không gian để bạn đặt câu hỏi trực tiếp cho giảng viên về nội dung bài học.
                        Câu hỏi và câu trả lời sẽ được hiển thị công khai để tất cả học viên có thể tham khảo.
                    </p>
                </div>
            </div>

            {/* Chế độ xem danh sách câu hỏi */}
            {!activeQuestion && (
                <>
                    <div className="mx-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Hỏi & Đáp với Giảng viên</h2>
                            <button
                                onClick={() => setShowAskForm(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Đặt câu hỏi cho giảng viên
                            </button>
                        </div>

                        {/* Tìm kiếm và bộ lọc */}
                        <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Tìm kiếm câu hỏi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setFilter('newest')}
                                    className={`px-3 py-2 rounded ${filter === 'newest'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Mới nhất
                                </button>
                                <button
                                    onClick={() => setFilter('popular')}
                                    className={`px-3 py-2 rounded ${filter === 'popular'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Nhiều vote nhất
                                </button>
                                <button
                                    onClick={() => setFilter('unanswered')}
                                    className={`px-3 py-2 rounded ${filter === 'unanswered'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Chưa trả lời
                                </button>
                            </div>
                        </div>

                        {/* Form đặt câu hỏi */}
                        {showAskForm && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center mb-3">
                                    <User className="text-blue-600 mr-2" size={18} />
                                    <h3 className="text-lg font-medium">Đặt câu hỏi cho giảng viên</h3>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Tiêu đề câu hỏi của bạn"
                                        value={newQuestionTitle}
                                        onChange={(e) => setNewQuestionTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                                        placeholder="Mô tả chi tiết câu hỏi của bạn..."
                                        value={newQuestionContent}
                                        onChange={(e) => setNewQuestionContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setShowAskForm(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={submitQuestion}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        disabled={!newQuestionTitle.trim() || !newQuestionContent.trim()}
                                    >
                                        Gửi câu hỏi
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Danh sách câu hỏi */}
                        {filteredQuestions.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">Không tìm thấy câu hỏi nào</h3>
                                <p className="mt-1 text-gray-500">
                                    {searchQuery
                                        ? 'Thử từ khóa tìm kiếm khác hoặc xóa bộ lọc.'
                                        : 'Hãy là người đầu tiên đặt câu hỏi về bài học này!'}
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => setShowAskForm(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Đặt câu hỏi
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {filteredQuestions.map((question) => (
                                    <li
                                        key={question.id}
                                        className="border border-gray-200 rounded-lg hover:shadow-sm transition"
                                    >
                                        <button
                                            className="w-full text-left p-4"
                                            onClick={() => setSelectedQuestion(question.id)}
                                        >
                                            <div className="flex items-start">
                                                {/* Nút bình chọn */}
                                                <div className="flex flex-col items-center mr-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleQuestionUpvote(question.id);
                                                        }}
                                                        className={`flex flex-col items-center p-1 ${question.isUpvoted ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                                            }`}
                                                    >
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-sm font-medium">{question.upvotes}</span>
                                                    </button>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {question.answers.length} {question.answers.length === 1 ? 'câu trả lời' : 'câu trả lời'}
                                                    </div>
                                                </div>

                                                {/* Nội dung câu hỏi */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900 mb-1">{question.title}</h3>
                                                    <p className="text-gray-700 line-clamp-2 mb-2">{question.content}</p>

                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <span className="font-medium text-gray-900">{question.user.name}</span>
                                                        <span className="mx-1">•</span>
                                                        <span>{formatRelativeTime(question.createdAt)}</span>
                                                        {question.user.role === 'instructor' && (
                                                            <>
                                                                <span className="mx-1">•</span>
                                                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Giảng viên</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}

            {/* Chế độ xem chi tiết câu hỏi */}
            {activeQuestion && (
                <div className="mx-6">
                    <button
                        onClick={() => setSelectedQuestion(null)}
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Quay lại tất cả câu hỏi
                    </button>

                    {/* Câu hỏi */}
                    <div className="border border-gray-200 rounded-lg p-5 mb-8">
                        <div className="flex">
                            {/* Nút bình chọn */}
                            <div className="flex flex-col items-center mr-4">
                                <button
                                    onClick={() => toggleQuestionUpvote(activeQuestion.id)}
                                    className={`flex flex-col items-center p-1 ${activeQuestion.isUpvoted ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">{activeQuestion.upvotes}</span>
                                </button>
                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold mb-2">{activeQuestion.title}</h2>
                                <p className="text-gray-700 mb-4 whitespace-pre-line">{activeQuestion.content}</p>

                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="font-medium text-gray-900">{activeQuestion.user.name}</span>
                                    <span className="mx-1">•</span>
                                    <span>{formatRelativeTime(activeQuestion.createdAt)}</span>
                                    {activeQuestion.user.role === 'instructor' && (
                                        <>
                                            <span className="mx-1">•</span>
                                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Giảng viên</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Câu trả lời */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium mb-5">
                            {activeQuestion.answers.length} {activeQuestion.answers.length === 1 ? 'Câu trả lời' : 'Câu trả lời'}
                        </h3>

                        {activeQuestion.answers.length > 0 ? (
                            <ul className="space-y-8">
                                {activeQuestion.answers
                                    .sort((a, b) => {
                                        // Câu trả lời được chấp nhận luôn đứng đầu
                                        if (a.isAccepted) return -1;
                                        if (b.isAccepted) return 1;
                                        // Sau đó sắp xếp theo bình chọn
                                        return b.upvotes - a.upvotes;
                                    })
                                    .map((answer) => (
                                        <li
                                            key={answer.id}
                                            className={`border ${answer.isAccepted ? 'border-green-300 bg-green-50' : 'border-gray-200'} rounded-lg p-4`}
                                        >
                                            <div className="flex">
                                                {/* Nút bình chọn */}
                                                <div className="flex flex-col items-center mr-4">
                                                    <button
                                                        onClick={() => toggleAnswerUpvote(activeQuestion.id, answer.id)}
                                                        className={`flex flex-col items-center p-1 ${answer.isUpvoted ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                                            }`}
                                                    >
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-sm font-medium">{answer.upvotes}</span>
                                                    </button>
                                                </div>

                                                {/* Nội dung câu trả lời */}
                                                <div className="flex-1">
                                                    <div className="prose max-w-none mb-3">
                                                        {answer.content.split('\n').map((part, i) => (
                                                            <p key={i}>{part}</p>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <span className="font-medium text-gray-900">{answer.user.name}</span>
                                                            <span className="mx-1">•</span>
                                                            <span>{formatRelativeTime(answer.createdAt)}</span>
                                                            {answer.user.role === 'instructor' && (
                                                                <>
                                                                    <span className="mx-1">•</span>
                                                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Giảng viên</span>
                                                                </>
                                                            )}
                                                        </div>

                                                        {answer.isAccepted ? (
                                                            <div className="flex items-center text-green-600">
                                                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-sm font-medium">Câu trả lời được chấp nhận</span>
                                                            </div>
                                                        ) : (
                                                            activeQuestion.user.id === 'current_user' && (
                                                                <button
                                                                    onClick={() => acceptAnswer(activeQuestion.id, answer.id)}
                                                                    className="text-gray-600 hover:text-green-600 text-sm flex items-center"
                                                                >
                                                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    Chấp nhận câu trả lời
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Chưa có câu trả lời. Câu hỏi của bạn sẽ được giảng viên trả lời sớm.</p>
                            </div>
                        )}
                    </div>

                    {/* Thông báo về cách thức trả lời */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 mt-2">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-yellow-700">
                                Chỉ giảng viên có thể trả lời câu hỏi trong phần Hỏi & Đáp. Nếu bạn muốn thảo luận với các học viên khác, hãy sử dụng tab "Thảo luận".
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionsArea;