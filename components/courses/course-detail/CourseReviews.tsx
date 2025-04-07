"use client";
import {Star} from 'lucide-react';
import {Progress} from "@/components/ui/progress";
import Image from 'next/image';
import {Avatar} from "@/components/ui/avatar";

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

interface CourseReviewsProps {
    reviews: Review[];
    rating: number;
    totalRating: number;
}

export default function CourseReviews({reviews, rating, totalRating}: CourseReviewsProps) {
    // Calculate rating distribution
    const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars

    reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            ratingCounts[5 - review.rating] += 1;
        }
    });

    const ratingPercentages = ratingCounts.map(count =>
        totalRating > 0 ? (count / totalRating) * 100 : 0
    );

    // Fake user data since it's not provided in the original data
    const reviewsWithUserData = reviews.map(review => ({
        ...review,
        user: {
            name: `Học viên ${review.userId}`,
            avatar: review.avatarUrl || `/images/default-avatar.png`
        },
        createdAt: '10/10/2023'
    }));

    return (
        <section className="bg-white border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Đánh giá từ học viên</h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Rating summary */}
                <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-[#b4690e]"
                             aria-label={`Đánh giá trung bình ${rating.toFixed(1)} trên 5 sao`}>{rating.toFixed(1)}</div>
                        <div className="flex text-[#f69c08] my-2" aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                                    className={i < Math.floor(rating) ? "" : "opacity-50"}
                                />
                            ))}
                        </div>
                        <div className="text-sm text-gray-600">{totalRating} đánh giá</div>
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
                    {reviewsWithUserData.map((review) => (
                        <article key={review.id} className="border-b pb-6 last:border-b-0">
                            <header className="flex items-center gap-4 mb-2">
                                <Avatar
                                    src={review.user?.avatar || '/images/default-avatar.png'}
                                    alt={review.user?.name || ''}
                                    size={48}
                                    className="w-12 h-12"
                                />
                                <div>
                                    <div className="font-medium">{review.user?.name}</div>
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
                            </header>
                            <p className="text-gray-700">{review.comment}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
