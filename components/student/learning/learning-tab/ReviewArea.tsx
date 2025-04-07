'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { CourseReviewDto } from '@/types/course';
import Image from 'next/image';

interface ReviewsAreaProps {
    courseId: string;
    reviews?: CourseReviewDto[];
    mainPage?: boolean;
}

export default function ReviewsArea({ courseId, reviews = [], mainPage = false }: ReviewsAreaProps) {
    const [showAddReview, setShowAddReview] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');

    // Calculate rating statistics from reviews
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
        : 0;
    
    // Count reviews by star rating
    const ratingCounts = [1, 2, 3, 4, 5].map(
        star => reviews.filter(review => review.rating === star).length
    );
    
    // Sort reviews by time (newest first)
    const sortedReviews = [...reviews].sort((a, b) => 
        new Date(b.updatedDate || b.createdDate).getTime() - 
        new Date(a.updatedDate || a.createdDate).getTime()
    );

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would call an API to submit the review
        console.log('Submitting review:', { courseId, rating: userRating, review: userReview });
        
        // For now, just hide the form
        setShowAddReview(false);
        setUserRating(0);
        setUserReview('');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    return (
        <div className={`space-y-6 ${mainPage ? 'p-0' : 'p-6'}`}>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Rating Summary Section */}
                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Đánh giá khóa học</h2>
                    <div className="flex items-center mb-4">
                        <div className="text-5xl font-bold mr-4">{avgRating.toFixed(1)}</div>
                        <div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">{totalReviews} đánh giá</p>
                        </div>
                    </div>
                    
                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star, index) => (
                            <div key={star} className="flex items-center gap-2">
                                <div className="text-sm w-8">{star} sao</div>
                                <Progress 
                                    value={totalReviews ? (ratingCounts[5 - star] / totalReviews) * 100 : 0} 
                                    className="h-2" 
                                />
                                <div className="text-sm text-gray-500 w-8">{ratingCounts[5 - star]}</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Add Review Button */}
                    {!showAddReview && (
                        <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => setShowAddReview(true)}
                        >
                            Viết đánh giá
                        </Button>
                    )}
                </div>
                
                {/* Review Form or Reviews List */}
                <div className="md:w-2/3">
                    {showAddReview ? (
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <h3 className="font-bold">Đánh giá khóa học</h3>
                            
                            {/* Star Rating Selection */}
                            <div>
                                <p className="mb-2 text-sm">Xếp hạng:</p>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                            key={star}
                                            className={`w-8 h-8 cursor-pointer ${star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                            onClick={() => setUserRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Review Text */}
                            <div>
                                <label htmlFor="review" className="block text-sm mb-2">
                                    Đánh giá của bạn:
                                </label>
                                <Textarea 
                                    id="review" 
                                    placeholder="Chia sẻ trải nghiệm học tập của bạn..." 
                                    rows={5}
                                    value={userReview}
                                    onChange={(e) => setUserReview(e.target.value)}
                                />
                            </div>
                            
                            {/* Submit Buttons */}
                            <div className="flex gap-2">
                                <Button type="submit" disabled={userRating === 0}>
                                    Gửi đánh giá
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => {
                                        setShowAddReview(false);
                                        setUserRating(0);
                                        setUserReview('');
                                    }}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="font-bold">Đánh giá của học viên</h3>
                            {sortedReviews.length > 0 ? (
                                <div className="space-y-6">
                                    {sortedReviews.map((review) => (
                                        <div key={review.id} className="border-b pb-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                                    <Image 
                                                        src="/images/default-avatar.png"
                                                        alt={review.userFullName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{review.userFullName}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star 
                                                                    key={star}
                                                                    className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-gray-500">
                                                            {formatDate(review.updatedDate || review.createdDate)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-sm">{review.review}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Chưa có đánh giá cho khóa học này.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}