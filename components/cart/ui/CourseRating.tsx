import {Star, StarHalf} from 'lucide-react';

interface CourseRatingProps {
    rating: number;
    className?: string;
}

export default function CourseRating({rating, className = ''}: CourseRatingProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <span>{rating}</span>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span key={index} className="text-yellow-400 ml-1">
                        {starValue <= rating ? (
                            <Star className="w-4 h-4 fill-current"/>
                        ) : starValue - 0.5 <= rating ? (
                            <StarHalf className="w-4 h-4 fill-current"/>
                        ) : (
                            <Star className="w-4 h-4"/>
                        )}
                    </span>
                );
            })}
        </div>
    );
}