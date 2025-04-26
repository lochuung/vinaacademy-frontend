// components/LectureEditModal.tsx
import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { LectureDisplay } from '@/components/instructor/courses/edit-course-content/hooks/useCourseContent';
import { createLesson, updateLesson } from '@/services/lessonService';
import { LessonType } from '@/types/course';
import { toast } from 'react-toastify';

interface LectureEditModalProps {
    lecture?: LectureDisplay;
    sectionId: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export const LectureEditModal = ({
    lecture,
    sectionId,
    isOpen,
    onClose,
    onSave
}: LectureEditModalProps) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<LessonType>('VIDEO');
    const [description, setDescription] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cập nhật state khi lecture thay đổi
    useEffect(() => {
        if (lecture) {
            setTitle(lecture.title);
            setType(lecture.type.toUpperCase() as LessonType);
            setDescription(lecture.description || '');
            setIsFree(lecture.free || false);
            setContent(lecture.content || '');
        } else {
            // Giá trị mặc định cho bài giảng mới
            setTitle('');
            setType('VIDEO');
            setDescription('');
            setIsFree(false);
            setContent('');
        }
    }, [lecture]);

    // Reset form khi modal đóng
    useEffect(() => {
        if (!isOpen) {
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Vui lòng nhập tiêu đề cho bài giảng');
            return;
        }

        setIsSubmitting(true);

        try {
            // Tạo đối tượng lectureData theo cấu trúc LessonRequest
            const lectureData = {
                title: title.trim(),
                sectionId: sectionId,
                type: type,
                description: description.trim(),
                free: isFree,
                orderIndex: lecture ? lecture.order : 0,
            };

            // Thêm các trường tùy theo loại bài giảng
            if (type === 'VIDEO') {
                Object.assign(lectureData, {
                    status: 'PROCESSING'
                });
            } else if (type === 'READING' || type === 'QUIZ') {
                Object.assign(lectureData, {
                    content: content
                });
            }

            // Nếu là QUIZ, thêm các trường liên quan đến quiz
            if (type === 'QUIZ') {
                Object.assign(lectureData, {
                    passPoint: 0, // Giá trị mặc định, sẽ được cập nhật sau trong trang chỉnh sửa quiz
                    totalPoint: 0, // Giá trị mặc định, sẽ được cập nhật sau trong trang chỉnh sửa quiz
                    duration: 0 // Thời gian làm bài mặc định
                });
            }

            let result;
            if (lecture) {
                // Cập nhật bài giảng hiện có
                result = await updateLesson(lecture.id, lectureData);
                if (!result) {
                    throw new Error('Không thể cập nhật bài giảng');
                }
                toast.success('Đã cập nhật bài giảng thành công');
            } else {
                // Tạo bài giảng mới
                result = await createLesson(lectureData);
                if (!result) {
                    throw new Error('Không thể tạo bài giảng mới');
                }
                toast.success('Đã tạo bài giảng mới thành công');
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Lỗi khi lưu bài giảng:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-lg font-medium">
                        {lecture ? 'Chỉnh sửa bài giảng' : 'Thêm bài giảng mới'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Tiêu đề bài giảng
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Nhập tiêu đề bài giảng"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                Loại bài giảng
                            </label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value as LessonType)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                disabled={isSubmitting}
                            >
                                <option value="VIDEO">Video</option>
                                <option value="READING">Bài đọc</option>
                                <option value="QUIZ">Bài kiểm tra</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả bài giảng
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                rows={3}
                                placeholder="Mô tả ngắn gọn về nội dung bài giảng"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="free-lesson"
                                checked={isFree}
                                onChange={(e) => setIsFree(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                disabled={isSubmitting}
                            />
                            <label htmlFor="free-lesson" className="ml-2 block text-sm text-gray-700">
                                Bài giảng miễn phí (học viên chưa mua khóa học vẫn xem được)
                            </label>
                        </div>
                        {(type === 'READING') && (
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nội dung bài học
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    rows={5}
                                    placeholder={type === 'READING'
                                        ? "Nhập nội dung bài đọc"
                                        : "Mô tả ngắn gọn về bài kiểm tra"
                                    }
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            disabled={isSubmitting}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
                                    Đang lưu...
                                </>
                            ) : (
                                'Lưu'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};