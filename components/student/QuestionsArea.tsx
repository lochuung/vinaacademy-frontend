// components/student/QuestionsArea.tsx
"use client";

import { FC, useState } from 'react';

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
    lessonId: string;
    courseId: string;
}

const QuestionsArea: FC<QuestionsAreaProps> = ({ lessonId, courseId }) => {
    const [questions, setQuestions] = useState<QuestionType[]>([
        {
            id: '1',
            title: 'What is the difference between == and is in Python?',
            content: 'I noticed that sometimes == and is give different results when comparing values. Can someone explain when to use each one?',
            createdAt: new Date('2025-03-08T14:22:00'),
            user: {
                id: 'user1',
                name: 'Alex Smith',
                avatar: '/images/avatars/alex.jpg',
                role: 'student'
            },
            answers: [
                {
                    id: 'answer1',
                    content: '`==` compares the values of two objects (equality), while `is` compares if two references refer to the same object (identity).\n\nFor example:\n```python\na = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(a == b)  # True (same values)\nprint(a is b)  # False (different objects)\nprint(a is c)  # True (same object)\n```\n\nUse `==` when you want to check if two objects have the same value, and `is` when you want to check if two variables point to the exact same object in memory.',
                    createdAt: new Date('2025-03-08T15:10:00'),
                    user: {
                        id: 'instructor1',
                        name: 'Professor Johnson',
                        avatar: '/images/avatars/professor.jpg',
                        role: 'instructor'
                    },
                    upvotes: 12,
                    isUpvoted: true,
                    isAccepted: true
                },
                {
                    id: 'answer2',
                    content: 'Also note that for small integers, strings, and some other immutable objects, Python might reuse the same object for efficiency, which can lead to confusing results when using `is`. Always use `==` for value comparison.',
                    createdAt: new Date('2025-03-08T16:45:00'),
                    user: {
                        id: 'user2',
                        name: 'Emma Wilson',
                        avatar: '/images/avatars/emma.jpg',
                        role: 'student'
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
            title: 'Can someone explain bitwise operators?',
            content: 'The lesson mentioned bitwise operators briefly, but I\'m still confused about how they work and when to use them.',
            createdAt: new Date('2025-03-10T09:15:00'),
            user: {
                id: 'user3',
                name: 'Michael Chen',
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
    const [newAnswerContent, setNewAnswerContent] = useState('');
    const [filter, setFilter] = useState<'newest' | 'popular' | 'unanswered'>('newest');
    const [searchQuery, setSearchQuery] = useState('');

    // Toggle upvote for a question
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

    // Toggle upvote for an answer
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

    // Mark an answer as accepted
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

    // Submit a new question
    const submitQuestion = () => {
        if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

        const newQuestion: QuestionType = {
            id: `question_${Date.now()}`,
            title: newQuestionTitle,
            content: newQuestionContent,
            createdAt: new Date(),
            user: {
                id: 'current_user',
                name: 'You',
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

    // Submit a new answer
    const submitAnswer = (questionId: string) => {
        if (!newAnswerContent.trim()) return;

        const newAnswer: AnswerType = {
            id: `answer_${Date.now()}`,
            content: newAnswerContent,
            createdAt: new Date(),
            user: {
                id: 'current_user',
                name: 'You',
                avatar: '/images/avatars/default.jpg',
                role: 'student'
            },
            upvotes: 0,
            isUpvoted: false,
            isAccepted: false
        };

        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId
                    ? { ...question, answers: [...question.answers, newAnswer] }
                    : question
            )
        );

        setNewAnswerContent('');
    };

    // Format date as relative time
    const formatRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;

        return date.toLocaleDateString();
    };

    // Filter questions based on selected filter and search query
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
            return b.createdAt.getTime() - a.createdAt.getTime(); // newest
        });

    // Get the selected question or null
    const activeQuestion = selectedQuestion
        ? questions.find(q => q.id === selectedQuestion) || null
        : null;

    return (
        <div className="h-full flex flex-col">
            {/* Questions list view */}
            {!activeQuestion && (
                <>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Questions & Answers</h2>
                            <button
                                onClick={() => setShowAskForm(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Ask a Question
                            </button>
                        </div>

                        {/* Search and filters */}
                        <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Search questions..."
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
                                    Newest
                                </button>
                                <button
                                    onClick={() => setFilter('popular')}
                                    className={`px-3 py-2 rounded ${filter === 'popular'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Most Upvoted
                                </button>
                                <button
                                    onClick={() => setFilter('unanswered')}
                                    className={`px-3 py-2 rounded ${filter === 'unanswered'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Unanswered
                                </button>
                            </div>
                        </div>

                        {/* Ask a question form */}
                        {showAskForm && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                                <h3 className="text-lg font-medium mb-3">Ask a Question</h3>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Title of your question"
                                        value={newQuestionTitle}
                                        onChange={(e) => setNewQuestionTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                                        placeholder="Describe your question in detail..."
                                        value={newQuestionContent}
                                        onChange={(e) => setNewQuestionContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setShowAskForm(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitQuestion}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        disabled={!newQuestionTitle.trim() || !newQuestionContent.trim()}
                                    >
                                        Submit Question
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Questions list */}
                        {filteredQuestions.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No questions found</h3>
                                <p className="mt-1 text-gray-500">
                                    {searchQuery
                                        ? 'Try a different search term or clear filters.'
                                        : 'Be the first to ask a question about this lesson!'}
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => setShowAskForm(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Ask a Question
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
                                                {/* Upvote button */}
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
                                                        {question.answers.length} {question.answers.length === 1 ? 'answer' : 'answers'}
                                                    </div>
                                                </div>

                                                {/* Question content */}
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
                                                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Instructor</span>
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

            {/* Question detail view */}
            {activeQuestion && (
                <div>
                    <button
                        onClick={() => setSelectedQuestion(null)}
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Back to all questions
                    </button>

                    {/* Question */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            {/* Upvote button */}
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

                            {/* Question content */}
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
                                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Instructor</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Answers */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                            {activeQuestion.answers.length} {activeQuestion.answers.length === 1 ? 'Answer' : 'Answers'}
                        </h3>

                        {activeQuestion.answers.length > 0 ? (
                            <ul className="space-y-6">
                                {activeQuestion.answers
                                    .sort((a, b) => {
                                        // Accepted answer always goes first
                                        if (a.isAccepted) return -1;
                                        if (b.isAccepted) return 1;
                                        // Then sort by upvotes
                                        return b.upvotes - a.upvotes;
                                    })
                                    .map((answer) => (
                                        <li
                                            key={answer.id}
                                            className={`border ${answer.isAccepted ? 'border-green-300 bg-green-50' : 'border-gray-200'} rounded-lg p-4`}
                                        >
                                            <div className="flex">
                                                {/* Upvote button */}
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

                                                {/* Answer content */}
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
                                                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Instructor</span>
                                                                </>
                                                            )}
                                                        </div>

                                                        {answer.isAccepted ? (
                                                            <div className="flex items-center text-green-600">
                                                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-sm font-medium">Accepted Answer</span>
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
                                                                    Accept Answer
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
                                <p className="text-gray-500">No answers yet. Be the first to answer this question!</p>
                            </div>
                        )}
                    </div>

                    {/* Add answer form */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-3">Your Answer</h3>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded min-h-[120px] mb-4"
                            placeholder="Write your answer here..."
                            value={newAnswerContent}
                            onChange={(e) => setNewAnswerContent(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                onClick={() => submitAnswer(activeQuestion.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                disabled={!newAnswerContent.trim()}
                            >
                                Post Answer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionsArea;