'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { mockCourseData } from '@/data/mockLearningData';

interface LearningPageParams {
    params: Promise<{ [key: string]: string }>;
}

export default function DefaultLearningPage({ params }: LearningPageParams) {
    // Unwrap the params Promise
    const unwrappedParams = use(params);
    const router = useRouter();

    useEffect(() => {
        router.push(`my-courses`);
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang chuyển đến khóa học...</p>
            </div>
        </div>
    );
}