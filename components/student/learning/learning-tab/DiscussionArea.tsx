"use client";

import {FC, useState} from 'react';
import {MessageSquare, ThumbsUp, Reply, MoreHorizontal} from 'lucide-react';

interface UserType {
    id: string;
    name: string;
    avatar: string;
}

interface CommentType {
    id: string;
    content: string;
    createdAt: Date;
    user: UserType;
    likes: number;
    isLiked: boolean;
    replies: ReplyType[];
}

interface ReplyType {
    id: string;
    content: string;
    createdAt: Date;
    user: UserType;
    likes: number;
    isLiked: boolean;
}

interface DiscussionAreaProps {
    courseId: string;
    lectureId: string;
}

const DiscussionArea: FC<DiscussionAreaProps> = ({courseId, lectureId: lectureId}) => {
    const [comments, setComments] = useState<CommentType[]>([
        {
            id: '1',
            content: 'Tôi thấy phần "Toán tử Bit" khá khó hiểu. Có ai giải thích thêm được không? Tôi đang cố gắng hiểu cách mà các phép toán bit được sử dụng trong thực tế.',
            createdAt: new Date('2025-03-15T09:30:00'),
            user: {
                id: 'user1',
                name: 'Nguyễn Văn An',
                avatar: '/images/avatars/user1.jpg'
            },
            likes: 5,
            isLiked: false,
            replies: [
                {
                    id: 'reply1',
                    content: 'Toán tử bit thường được dùng trong lập trình hệ thống, xử lý đồ họa và mạng. Ví dụ, khi bạn cần thiết lập các cờ (flags) để điều khiển hành vi của một hàm, phép AND bit (&) và OR bit (|) rất hữu ích.',
                    createdAt: new Date('2025-03-15T10:15:00'),
                    user: {
                        id: 'user2',
                        name: 'Trần Thị Hương',
                        avatar: '/images/avatars/user2.jpg'
                    },
                    likes: 3,
                    isLiked: true
                },
                {
                    id: 'reply2',
                    content: 'Tôi đã tìm thấy một video trên YouTube giải thích rất rõ về cách sử dụng toán tử bit trong Python. Để tôi tìm lại link và chia sẻ với bạn sau.',
                    createdAt: new Date('2025-03-15T11:45:00'),
                    user: {
                        id: 'user3',
                        name: 'Lê Minh Tuấn',
                        avatar: '/images/avatars/user3.jpg'
                    },
                    likes: 2,
                    isLiked: false
                }
            ]
        },
        {
            id: '2',
            content: 'Mọi người có dự án nào sử dụng các toán tử đã học để chia sẻ không? Tôi đang tìm ý tưởng để thực hành.',
            createdAt: new Date('2025-03-17T14:20:00'),
            user: {
                id: 'user4',
                name: 'Phạm Hoàng Nam',
                avatar: '/images/avatars/user4.jpg'
            },
            likes: 8,
            isLiked: true,
            replies: []
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [newReply, setNewReply] = useState('');
    const [filter, setFilter] = useState<'newest' | 'popular'>('newest');

    // Format relative time
    const formatRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;

        return date.toLocaleDateString('vi-VN');
    };

    // Toggle like for comment
    const toggleCommentLike = (commentId: string) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                        isLiked: !comment.isLiked
                    }
                    : comment
            )
        );
    };

    // Toggle like for reply
    const toggleReplyLike = (commentId: string, replyId: string) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map(reply =>
                            reply.id === replyId
                                ? {
                                    ...reply,
                                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                                    isLiked: !reply.isLiked
                                }
                                : reply
                        )
                    }
                    : comment
            )
        );
    };

    // Submit new comment
    const submitComment = () => {
        if (!newComment.trim()) return;

        const newCommentObj: CommentType = {
            id: `comment_${Date.now()}`,
            content: newComment,
            createdAt: new Date(),
            user: {
                id: 'current_user',
                name: 'Bạn',
                avatar: '/images/avatars/default.jpg'
            },
            likes: 0,
            isLiked: false,
            replies: []
        };

        setComments(prev => [newCommentObj, ...prev]);
        setNewComment('');
    };

    // Submit new reply
    const submitReply = (commentId: string) => {
        if (!newReply.trim() || !replyingTo) return;

        const newReplyObj: ReplyType = {
            id: `reply_${Date.now()}`,
            content: newReply,
            createdAt: new Date(),
            user: {
                id: 'current_user',
                name: 'Bạn',
                avatar: '/images/avatars/default.jpg'
            },
            likes: 0,
            isLiked: false
        };

        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {...comment, replies: [...comment.replies, newReplyObj]}
                    : comment
            )
        );

        setNewReply('');
        setReplyingTo(null);
    };

    // Filter and sort comments
    const filteredComments = [...comments].sort((a, b) => {
        if (filter === 'popular') {
            return b.likes - a.likes;
        }
        return b.createdAt.getTime() - a.createdAt.getTime(); // newest
    });

    return (
        <div className="flex flex-col h-full px-2 sm:px-4 md:px-6 py-4 md:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
                <h2 className="text-xl md:text-2xl font-bold">Thảo luận</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilter('newest')}
                        className={`px-2 sm:px-3 py-1 rounded text-sm ${filter === 'newest'
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Mới nhất
                    </button>
                    <button
                        onClick={() => setFilter('popular')}
                        className={`px-2 sm:px-3 py-1 rounded text-sm ${filter === 'popular'
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Phổ biến nhất
                    </button>
                </div>
            </div>

            {/* Comment input */}
            <div className="mb-6 bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base md:text-lg font-medium mb-2 sm:mb-3">Thêm bình luận vào thảo luận</h3>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white"
                    placeholder="Chia sẻ suy nghĩ của bạn với các học viên khác..."
                    rows={4}
                ></textarea>
                <div className="flex justify-end mt-2 sm:mt-3">
                    <button
                        onClick={submitComment}
                        disabled={!newComment.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                        Đăng bình luận
                    </button>
                </div>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto">
                {filteredComments.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                        <MessageSquare className="mx-auto h-8 sm:h-12 w-8 sm:w-12 text-gray-400"/>
                        <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">Chưa có thảo luận nào</h3>
                        <p className="mt-1 text-sm text-gray-500">Hãy là người đầu tiên bắt đầu cuộc thảo luận về bài học
                            này!</p>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {filteredComments.map((comment) => (
                            <div key={comment.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow">
                                <div className="p-3 sm:p-4">
                                    {/* Comment header */}
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 mr-2 sm:mr-3"></div>
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">{comment.user.name}</p>
                                                <p className="text-xs text-gray-500">{formatRelativeTime(comment.createdAt)}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={18}/>
                                        </button>
                                    </div>

                                    {/* Comment content */}
                                    <div className="mb-3">
                                        <p className="text-gray-800 text-sm sm:text-base">{comment.content}</p>
                                    </div>

                                    {/* Comment actions */}
                                    <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-3 sm:space-x-4">
                                        <button
                                            onClick={() => toggleCommentLike(comment.id)}
                                            className={`flex items-center space-x-1 ${comment.isLiked ? 'text-blue-600' : 'hover:text-gray-700'}`}
                                        >
                                            <ThumbsUp size={14} className="sm:size-16"/>
                                            <span>{comment.likes}</span>
                                        </button>
                                        <button
                                            onClick={() => setReplyingTo(comment.id)}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <Reply size={14} className="sm:size-16"/>
                                            <span>Trả lời</span>
                                        </button>
                                    </div>

                                    {/* Reply input */}
                                    {replyingTo === comment.id && (
                                        <div className="mt-3 sm:mt-4 pl-2 sm:pl-4 border-l-2 border-gray-200">
                                            <textarea
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white"
                                                placeholder="Trả lời bình luận này..."
                                                rows={3}
                                            ></textarea>
                                            <div className="flex justify-end mt-2 space-x-2">
                                                <button
                                                    onClick={() => setReplyingTo(null)}
                                                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    onClick={() => submitReply(comment.id)}
                                                    disabled={!newReply.trim()}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                                                >
                                                    Trả lời
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Replies */}
                                    {comment.replies.length > 0 && (
                                        <div className="mt-3 sm:mt-4 pl-2 sm:pl-4 border-l-2 border-gray-200 space-y-3 sm:space-y-4">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="bg-gray-50 rounded-md p-2 sm:p-3">
                                                    {/* Reply header */}
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 mr-2"></div>
                                                            <div>
                                                                <p className="font-medium text-xs sm:text-sm">{reply.user.name}</p>
                                                                <p className="text-xs text-gray-500">{formatRelativeTime(reply.createdAt)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Reply content */}
                                                    <div className="mb-2">
                                                        <p className="text-gray-800 text-xs sm:text-sm">{reply.content}</p>
                                                    </div>

                                                    {/* Reply actions */}
                                                    <button
                                                        onClick={() => toggleReplyLike(comment.id, reply.id)}
                                                        className={`flex items-center space-x-1 text-xs sm:text-sm ${reply.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                                    >
                                                        <ThumbsUp size={12} className="sm:size-14"/>
                                                        <span>{reply.likes}</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscussionArea;