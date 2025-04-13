import { ApiResponse } from '@/types/api-response';

export interface EnrollmentRequest {
    courseId: string;
}

export interface EnrollmentResponse {
    id: number;
    userId: string;
    courseId: string;
    startAt: string;
    completeAt?: string;
    progressPercentage: number;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
    enrollmentDate: string;
}

// Kiểm tra xem học viên đã đăng ký khóa học chưa
export const checkEnrollment = async (courseId: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/v1/enrollments/check?courseId=${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Giả định rằng token được lưu trong localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Bạn cần đăng nhập để thực hiện chức năng này');
            }
            throw new Error('Có lỗi xảy ra khi kiểm tra đăng ký');
        }

        const result: ApiResponse<boolean> = await response.json();
        return result.data || false;
    } catch (error) {
        console.error('Lỗi khi kiểm tra đăng ký:', error);
        throw error;
    }
};

// Đăng ký khóa học
export const enrollCourse = async (courseId: string): Promise<EnrollmentResponse> => {
    try {
        const response = await fetch('/api/v1/enrollments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ courseId })
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Bạn cần đăng nhập để đăng ký khóa học');
            }
            throw new Error('Có lỗi xảy ra khi đăng ký khóa học');
        }

        const result: ApiResponse<EnrollmentResponse> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Lỗi khi đăng ký khóa học:', error);
        throw error;
    }
};