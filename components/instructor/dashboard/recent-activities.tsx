"use client";

import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentActivitiesProps {
    className?: string;
}

// Mock data
const recentEnrollments = [
    { id: '1', name: 'Nguyễn Văn A', course: 'Lập trình JavaScript', date: '2025-03-07', image: '/api/placeholder/32/32' },
    { id: '2', name: 'Trần Thị B', course: 'React Fundamentals', date: '2025-03-06', image: '/api/placeholder/32/32' },
    { id: '3', name: 'Lê Văn C', course: 'NodeJS Advanced', date: '2025-03-05', image: '/api/placeholder/32/32' },
    { id: '4', name: 'Phạm Thị D', course: 'UI/UX Design', date: '2025-03-04', image: '/api/placeholder/32/32' },
    { id: '5', name: 'Vũ Văn E', course: 'React Fundamentals', date: '2025-03-03', image: '/api/placeholder/32/32' },
];

const recentReviews = [
    { id: '1', name: 'Mai Thị F', course: 'Lập trình JavaScript', rating: 5, comment: 'Khóa học rất hay và dễ hiểu!', date: '2025-03-07', image: '/api/placeholder/32/32' },
    { id: '2', name: 'Trương Văn G', course: 'React Fundamentals', rating: 4, comment: 'Kiến thức bổ ích, nhưng cần thêm bài tập thực hành.', date: '2025-03-05', image: '/api/placeholder/32/32' },
    { id: '3', name: 'Ngô Thị H', course: 'NodeJS Advanced', rating: 5, comment: 'Giảng viên giảng dạy rất tốt, dễ hiểu.', date: '2025-03-03', image: '/api/placeholder/32/32' },
];

export default function RecentActivities({ className }: RecentActivitiesProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center">
                            <h4 className="text-sm font-semibold mb-2">Đăng ký mới</h4>
                            <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                {recentEnrollments.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {recentEnrollments.slice(0, 3).map((enrollment) => (
                                <div key={enrollment.id} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={enrollment.image}
                                            alt={enrollment.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {enrollment.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {enrollment.course}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500">
                                        {new Date(enrollment.date).toLocaleDateString('vi-VN')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <h4 className="text-sm font-semibold mb-2">Đánh giá mới</h4>
                            <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {recentReviews.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {recentReviews.slice(0, 3).map((review) => (
                                <div key={review.id} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center">
                                            <p className="text-sm font-medium text-gray-900 truncate mr-1">
                                                {review.name}
                                            </p>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-700 line-clamp-2 mt-0.5">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}