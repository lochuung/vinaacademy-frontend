// components/CourseContentHeader.tsx
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

interface CourseContentHeaderProps {
    courseId: string;
    onAddSection: () => void;
}

export const CourseContentHeader = ({ courseId, onAddSection }: CourseContentHeaderProps) => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Link href={`/instructor/courses`}>
                            <div className="mr-2 text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="h-5 w-5" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-semibold text-gray-900">Quản lý nội dung khóa học</h1>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={`/instructor/courses/${courseId}/edit`}>
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                Chỉnh sửa thông tin
                            </button>
                        </Link>
                        <Link href={`/instructor/courses/${courseId}/preview`}>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                Xem trước
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Nội dung khóa học</h2>
                            <button
                                type="button"
                                onClick={onAddSection}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Thêm phần mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};