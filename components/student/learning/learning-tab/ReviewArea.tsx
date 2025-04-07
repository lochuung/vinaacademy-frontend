'use client';
import {FC, useState, useEffect} from 'react';
import {Star, Edit2, Trash2, Plus} from 'lucide-react';
import {Progress} from "@/components/ui/progress";
import {Avatar} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import BeautifulSpinner from '@/components/ui/spinner';

interface Review {
    id: number;
    userId: number;
    rating: number;
    comment: string;
    avatarUrl?: string;
    user?: {
        name: string;
        avatar?: string;
    };
    createdAt?: string;
}

interface ReviewsAreaProps {
    courseId: string;
    currentUserId?: number;
    mainPage?: boolean;
}

// Mock data - in a real app, this would be fetched from an API
const mockReviews: Review[] = [
    {
        id: 1,
        userId: 1,
        rating: 5,
        comment: 'Bài học rất hay và dễ hiểu. Tôi đã học được rất nhiều từ khóa học này.',
        user: {
            name: 'Nguyễn Văn A',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '12/03/2024'
    },
    {
        id: 2,
        userId: 2,
        rating: 4,
        comment: 'Giảng viên giải thích rất rõ ràng. Tuy nhiên, một số ví dụ còn hơi khó hiểu.',
        user: {
            name: 'Trần Thị B',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '05/03/2024'
    },
    {
        id: 3,
        userId: 3,
        rating: 5,
        comment: 'Nội dung bài học rất phong phú và đầy đủ. Tôi rất hài lòng với khóa học này.',
        user: {
            name: 'Lê Văn C',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '28/02/2024'
    },
    {
        id: 4,
        userId: 4,
        rating: 4,
        comment: 'Khóa học cung cấp nhiều kiến thức bổ ích. Tôi đã học được nhiều kỹ năng mới.',
        user: {
            name: 'Phạm Thị D',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '20/02/2024'
    },
    {
        id: 5,
        userId: 5,
        rating: 3,
        comment: 'Nội dung khá tốt nhưng tôi nghĩ cần thêm nhiều bài tập thực hành hơn.',
        user: {
            name: 'Hoàng Văn E',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '15/02/2024'
    },
    {
        id: 6,
        userId: 6,
        rating: 5,
        comment: 'Tôi rất thích cách giảng viên trình bày bài học. Dễ hiểu và thu hút.',
        user: {
            name: 'Vũ Thị F',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '10/02/2024'
    },
    {
        id: 7,
        userId: 7,
        rating: 4,
        comment: 'Khóa học đáng giá với số tiền bỏ ra. Tôi đã học được nhiều điều mới.',
        user: {
            name: 'Mai Văn G',
            avatar: '/images/default-avatar.png'
        },
        createdAt: '05/02/2024'
    }
];

const ReviewsArea: FC<ReviewsAreaProps> = ({courseId, mainPage = false, currentUserId = 1}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
    });

    // Pagination settings
    const reviewsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreReviews, setHasMoreReviews] = useState(false);

    // Simulated loading of reviews data
    useEffect(() => {
        const loadReviews = async () => {
            setIsLoading(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const totalRating = mockReviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = mockReviews.length > 0 ? totalRating / mockReviews.length : 0;

            setAllReviews(mockReviews);
            setAverageRating(avgRating);
            setIsLoading(false);
        };

        loadReviews();
    }, [courseId]);

    // Update displayed reviews when allReviews or currentPage changes
    useEffect(() => {
        const endIndex = currentPage * reviewsPerPage;
        setDisplayedReviews(allReviews.slice(0, endIndex));
        setHasMoreReviews(endIndex < allReviews.length);
    }, [allReviews, currentPage]);

    // Handle load more reviews
    const handleLoadMoreReviews = () => {
        setCurrentPage(currentPage + 1);
    };

    // Calculate rating distribution
    const calculateRatingDistribution = () => {
        const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars

        allReviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                ratingCounts[5 - review.rating] += 1;
            }
        });

        const totalRatings = allReviews.length;
        return ratingCounts.map(count =>
            totalRatings > 0 ? (count / totalRatings) * 100 : 0
        );
    };

    const ratingPercentages = calculateRatingDistribution();

    // Add or edit review
    const handleSaveReview = () => {
        if (editingReview) {
            // Update existing review
            const updatedReviews = allReviews.map(review =>
                review.id === editingReview.id
                    ? {
                        ...review,
                        rating: newReview.rating,
                        comment: newReview.comment
                    }
                    : review
            );
            setAllReviews(updatedReviews);
        } else {
            // Add new review
            const newReviewObject: Review = {
                id: Math.max(...allReviews.map(r => r.id), 0) + 1,
                userId: currentUserId,
                rating: newReview.rating,
                comment: newReview.comment,
                user: {
                    name: 'Bạn',
                    avatar: '/images/default-avatar.png'
                },
                createdAt: new Date().toLocaleDateString('vi-VN')
            };

            setAllReviews([newReviewObject, ...allReviews]);
        }

        // Recalculate average rating
        const updatedReviews = editingReview
            ? allReviews.map(review =>
                review.id === editingReview.id
                    ? {...review, rating: newReview.rating, comment: newReview.comment}
                    : review
            )
            : [
                {
                    id: Math.max(...allReviews.map(r => r.id), 0) + 1,
                    userId: currentUserId,
                    rating: newReview.rating,
                    comment: newReview.comment,
                    user: {
                        name: 'Bạn',
                        avatar: '/images/default-avatar.png'
                    },
                    createdAt: new Date().toLocaleDateString('vi-VN')
                },
                ...allReviews
            ];

        const newTotalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
        const newAvgRating = newTotalRating / updatedReviews.length;

        setAverageRating(newAvgRating);
        setEditingReview(null);
        setNewReview({rating: 5, comment: ''});
        setDialogOpen(false);
    };

    // Delete review
    const handleDeleteReview = (id: number) => {
        const updatedReviews = allReviews.filter(review => review.id !== id);
        setAllReviews(updatedReviews);

        // Recalculate average rating
        const newTotalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
        const newAvgRating = updatedReviews.length > 0
            ? newTotalRating / updatedReviews.length
            : 0;

        setAverageRating(newAvgRating);
    };

    // Start editing a review
    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setNewReview({
            rating: review.rating,
            comment: review.comment
        });
        setDialogOpen(true);
    };

    // Check if current user has already submitted a review
    const userHasReview = allReviews.some(review => review.userId === currentUserId);

    // Show loading state
    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center h-64">
                <BeautifulSpinner name='Đang tải đánh giá...'/>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Đánh giá từ học viên</h2>
                {!userHasReview && (
                    <Button
                        onClick={() => {
                            setEditingReview(null);
                            setNewReview({rating: 5, comment: ''});
                            setDialogOpen(true);
                        }}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Plus size={16}/>
                        Viết đánh giá
                    </Button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Rating summary */}
                <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-[#b4690e]"
                             aria-label={`Đánh giá trung bình ${averageRating.toFixed(1)} trên 5 sao`}>
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex text-[#f69c08] my-2" aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    fill={i < Math.floor(averageRating) ? "currentColor" : "none"}
                                    className={i < Math.floor(averageRating) ? "" : "opacity-50"}
                                />
                            ))}
                        </div>
                        <div className="text-sm text-gray-600">{allReviews.length} đánh giá</div>
                    </div>

                    {/* Rating breakdown */}
                    <div className="mt-6 space-y-2" aria-label="Phân bố đánh giá">
                        {[5, 4, 3, 2, 1].map((stars, index) => (
                            <div key={stars} className="flex items-center gap-2">
                                <div className="w-8 text-sm text-right">{stars}</div>
                                <Star size={14} className="text-[#f69c08]" fill="#f69c08" aria-hidden="true"/>
                                <Progress
                                    value={ratingPercentages[index]}
                                    className="h-2 flex-1"
                                    aria-label={`${stars} sao: ${Math.round(ratingPercentages[index])}%`}
                                />
                                <span
                                    className="text-xs text-gray-600 w-10">{Math.round(ratingPercentages[index])}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews list */}
                <div className="md:w-2/3 space-y-6">
                    <h3 className="sr-only">Danh sách đánh giá</h3>
                    {displayedReviews.length > 0 ? (
                        <>
                            {displayedReviews.map((review) => (
                                <article key={review.id} className="border-b pb-6 last:border-b-0">
                                    <header className="flex items-center gap-4 mb-2">
                                        <Avatar
                                            src={review.user?.avatar || '/images/default-avatar.png'}
                                            alt={review.user?.name || ''}
                                            size={48}
                                            className="w-12 h-12"
                                        />
                                        <div className="flex-1">
                                            <div
                                                className="font-medium">{review.user?.name} {review.userId === currentUserId ? "(Bạn)" : ""}</div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-[#f69c08]"
                                                     aria-label={`Đánh giá ${review.rating} sao`}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            fill={i < review.rating ? "#f69c08" : "none"}
                                                            className={i < review.rating ? "" : "text-gray-300"}
                                                        />
                                                    ))}
                                                </div>
                                                <time className="text-xs text-gray-600"
                                                      dateTime="2023-10-10">{review.createdAt}</time>
                                            </div>
                                        </div>

                                        {/* Review actions (only show for current user) */}
                                        {review.userId === currentUserId && !mainPage && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditReview(review)}
                                                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                                                    aria-label="Chỉnh sửa đánh giá"
                                                >
                                                    <Edit2 size={16}/>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                                                    aria-label="Xóa đánh giá"
                                                >
                                                    <Trash2 size={16}/>
                                                </button>
                                            </div>
                                        )}
                                    </header>
                                    <p className="text-gray-700">{review.comment}</p>
                                </article>
                            ))}

                            {/* Load more button */}
                            {hasMoreReviews && (
                                <div className="text-center pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleLoadMoreReviews}
                                        className="w-full md:w-auto"
                                    >
                                        Xem thêm đánh giá
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!
                        </div>
                    )}
                </div>
            </div>

            {/* Review Form Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingReview ? 'Chỉnh sửa đánh giá' : 'Viết đánh giá'}</DialogTitle>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Đánh giá của bạn</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({...newReview, rating: star})}
                                        className="text-2xl"
                                        aria-label={`Đánh giá ${star} sao`}
                                    >
                                        <Star
                                            size={24}
                                            className="text-[#f69c08]"
                                            fill={star <= newReview.rating ? "#f69c08" : "none"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="review-comment"
                                className="block text-sm font-medium mb-1"
                            >
                                Nhận xét của bạn
                            </label>
                            <Textarea
                                id="review-comment"
                                value={newReview.comment}
                                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                placeholder="Chia sẻ trải nghiệm học tập của bạn..."
                                rows={4}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSaveReview}
                            disabled={newReview.comment.trim() === ''}
                        >
                            {editingReview ? 'Cập nhật' : 'Đăng'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ReviewsArea;
