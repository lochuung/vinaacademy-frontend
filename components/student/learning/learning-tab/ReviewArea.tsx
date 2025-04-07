'use client';
import {FC, useState, useEffect} from 'react';
import {Star, Edit2, Trash2, Plus} from 'lucide-react';
import {Progress} from "@/components/ui/progress";
import {Avatar} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import BeautifulSpinner from '@/components/ui/spinner';


import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Star, Edit2, Trash2, Plus } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { CourseReviewDto } from '@/types/course';

// Lazy load components that aren't needed on initial render
const Dialog = dynamic(() => import("@/components/ui/dialog").then(mod => mod.Dialog));
const DialogContent = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogContent));
const DialogHeader = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogHeader));
const DialogTitle = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogTitle));
const DialogFooter = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogFooter));

// Lazy load spinner with a simple fallback
const BeautifulSpinner = dynamic(
  () => import('@/components/ui/spinner'),
  { ssr: false, loading: () => <div className="flex justify-center p-8">Loading...</div> }
);

interface ReviewsAreaProps {
    courseId: string;
    reviews?: CourseReviewDto[];
    currentUserId?: string;
    mainPage?: boolean;
}

const ReviewsArea: React.FC<ReviewsAreaProps> = ({
    courseId,
    reviews: initialReviews = [],
    mainPage = false,
    currentUserId = '1'
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [allReviews, setAllReviews] = useState<CourseReviewDto[]>([]);
    const [displayedReviews, setDisplayedReviews] = useState<CourseReviewDto[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<CourseReviewDto | null>(null);
    const [newReview, setNewReview] = useState({
        rating: 5,
        review: '',

    });

    // Pagination settings
    const reviewsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreReviews, setHasMoreReviews] = useState(false);


    // Load reviews data
    useEffect(() => {
        // Use an immediately-invoked async function to avoid "top-level await"
        (async () => {
            if (!isLoading) return; // Prevent duplicate loading
            
            try {
                // Use initialReviews if available or prepare for mock data
                let reviewsData = initialReviews.length > 0 ? [...initialReviews] : [];

                // If no reviews provided as props, use mock data in development
                if (reviewsData.length === 0 && process.env.NODE_ENV === 'development') {
                    // Simulate network delay only in development
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Create mock data using Array.from for better performance
                    reviewsData = Array.from({ length: 10 }, (_, index) => ({
                        id: index + 1,
                        courseId: courseId,
                        courseName: 'Khóa học mẫu',
                        userId: index === 0 ? currentUserId : `${index + 100}`,
                        rating: Math.floor(Math.random() * 3) + 3, // Random rating 3-5
                        review: `Đây là đánh giá mẫu ${index + 1} cho khóa học. Nội dung này chỉ hiển thị trong môi trường phát triển.`,
                        userFullName: index === 0 ? 'Bạn' : `Học viên ${index + 1}`,
                        createdDate: new Date(Date.now() - index * 86400000).toISOString(),
                        updatedDate: new Date(Date.now() - index * 86400000).toISOString(),
                    }));
                }

                // Process reviews data only if we have data to process
                if (reviewsData.length > 0) {
                    // Sort reviews by date (newest first)
                    const sortedReviews = [...reviewsData].sort((a, b) =>
                        new Date(b.updatedDate || b.createdDate).getTime() -
                        new Date(a.updatedDate || a.createdDate).getTime()
                    );

                    // Calculate average rating
                    const totalRating = sortedReviews.reduce((sum, review) => sum + review.rating, 0);
                    const avgRating = sortedReviews.length > 0 ? totalRating / sortedReviews.length : 0;

                    setAllReviews(sortedReviews);
                    setAverageRating(avgRating);
                }
            } catch (error) {
                console.error('Error loading reviews:', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [courseId, initialReviews, currentUserId, isLoading]);

    // Update displayed reviews when allReviews or currentPage changes
    useEffect(() => {
        const endIndex = currentPage * reviewsPerPage;
        setDisplayedReviews(allReviews.slice(0, endIndex));
        setHasMoreReviews(endIndex < allReviews.length);
    }, [allReviews, currentPage]);

    // Memoize rating distribution calculation to avoid recalculating on every render
    const ratingDistribution = React.useMemo(() => {
        const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars

        allReviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                ratingCounts[5 - review.rating] += 1;
            }
        });

        return {
            counts: ratingCounts,
            percentages: ratingCounts.map(count =>
                allReviews.length > 0 ? (count / allReviews.length) * 100 : 0
            )
        };
    }, [allReviews]);

    // Handle load more reviews
    const handleLoadMoreReviews = () => {
        setCurrentPage(prev => prev + 1);
    };

    // Format date - memoize this function for better performance
    const formatDate = React.useCallback((dateString: string) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (error) {
            return dateString;
        }
    }, []);

    // Add or update review
    const handleSaveReview = async () => {
        try {
            // In a real app, you would call an API endpoint to save the review
            let updatedReviews: CourseReviewDto[];

            if (editingReview) {
                // Update existing review
                updatedReviews = allReviews.map(review =>
                    review.id === editingReview.id
                        ? {
                            ...review,
                            rating: newReview.rating,
                            review: newReview.review,
                            updatedDate: new Date().toISOString()
                        }
                        : review
                );
            } else {
                // Add new review
                const newReviewObject: CourseReviewDto = {
                    id: Math.max(...allReviews.map(r => r.id), 0) + 1,
                    courseId: courseId,
                    courseName: allReviews.length > 0 ? allReviews[0].courseName : 'Khóa học',
                    userId: currentUserId,
                    rating: newReview.rating,
                    review: newReview.review,
                    userFullName: 'Bạn',
                    createdDate: new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                updatedReviews = [newReviewObject, ...allReviews];
            }

            // Recalculate average rating
            const newTotalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
            const newAvgRating = updatedReviews.length > 0 ? newTotalRating / updatedReviews.length : 0;

            setAllReviews(updatedReviews);
            setAverageRating(newAvgRating);
            setEditingReview(null);
            setNewReview({ rating: 5, review: '' });
            setDialogOpen(false);
        } catch (error) {
            console.error('Error saving review:', error);
            // Handle error (show notification, etc.)
        }
    };

    // Delete review
    const handleDeleteReview = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
            return;
        }

        try {
            // In a real app, you would call an API endpoint to delete the review
            const updatedReviews = allReviews.filter(review => review.id !== id);

            // Recalculate average rating
            const newTotalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
            const newAvgRating = updatedReviews.length > 0
                ? newTotalRating / updatedReviews.length
                : 0;

            setAllReviews(updatedReviews);
            setAverageRating(newAvgRating);
        } catch (error) {
            console.error('Error deleting review:', error);
            // Handle error (show notification, etc.)
        }
    };

    // Start editing a review
    const handleEditReview = (review: CourseReviewDto) => {
        setEditingReview(review);
        setNewReview({
            rating: review.rating,
            review: review.review
        });
        setDialogOpen(true);
    };


    // Check if current user has already submitted a review
    const userHasReview = allReviews.some(review => review.userId === currentUserId);

    // Show loading state
    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center h-64">
                <BeautifulSpinner name='Đang tải đánh giá...' />

            </div>
        );
    }

    // Pre-render star icons for reuse
    const renderStarRating = (rating: number, size: number = 20) => (
        <div className="flex text-[#f69c08]">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    fill={i < rating ? "#f69c08" : "none"}
                    className={i < rating ? "" : "opacity-50"}
                />
            ))}
        </div>
    );

    // Only render dialog when open to improve performance
    const renderDialog = dialogOpen && (
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
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
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
                            value={newReview.review}
                            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
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
                        disabled={newReview.review.trim() === ''}
                    >
                        {editingReview ? 'Cập nhật' : 'Đăng'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className={`${mainPage ? 'p-0' : 'p-6'}`}>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Đánh giá từ học viên</h2>
                {!userHasReview && (
                    <Button
                        onClick={() => {
                            setEditingReview(null);
                            setNewReview({ rating: 5, review: '' });
                            setDialogOpen(true);
                        }}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Viết đánh giá
                    </Button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Rating summary */}
                <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-[#b4690e]" aria-label={`Đánh giá trung bình ${averageRating.toFixed(1)} trên 5 sao`}>
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex text-[#f69c08] my-2" aria-hidden="true">
                            {renderStarRating(Math.floor(averageRating))}
                        </div>
                        <div className="text-sm text-gray-600">{allReviews.length} đánh giá</div>
                    </div>

                    {/* Rating breakdown */}
                    <div className="mt-6 space-y-2" aria-label="Phân bố đánh giá">
                        {[5, 4, 3, 2, 1].map((stars, index) => (
                            <div key={stars} className="flex items-center gap-2">
                                <div className="w-8 text-sm text-right">{stars}</div>
                                <Star size={14} className="text-[#f69c08]" fill="#f69c08" aria-hidden="true" />
                                <Progress
                                    value={ratingDistribution.percentages[index]}
                                    className="h-2 flex-1"
                                    aria-label={`${stars} sao: ${Math.round(ratingDistribution.percentages[index])}%`}
                                />
                                <span className="text-xs text-gray-600 w-10">
                                    {ratingDistribution.counts[index]}
                                </span>
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
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            {/* Using first letter of name as avatar placeholder */}
                                            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl font-bold">
                                                {review.userFullName.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {review.userFullName} {review.userId === currentUserId ? "(Bạn)" : ""}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-[#f69c08]" aria-label={`Đánh giá ${review.rating} sao`}>
                                                    {renderStarRating(review.rating, 14)}
                                                </div>
                                                <time className="text-xs text-gray-600" dateTime={review.updatedDate || review.createdDate}>
                                                    {formatDate(review.updatedDate || review.createdDate)}
                                                </time>

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
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                                                    aria-label="Xóa đánh giá"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </header>
                                    <p className="text-gray-700">{review.review}</p>
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

            {/* Only render dialog when open */}
            {renderDialog}
        </div>
    );
};

export default ReviewsArea;

