// components/SectionEditModal.tsx
import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Section } from '@/types/instructor-course-edit';
import { createSection, updateSection } from '@/services/sectionService';
import { toast } from 'react-toastify';

interface SectionEditModalProps {
    section?: Section;
    courseId: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export const SectionEditModal = ({
    section,
    courseId,
    isOpen,
    onClose,
    onSave
}: SectionEditModalProps) => {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cập nhật title khi section thay đổi
    useEffect(() => {
        if (section) {
            setTitle(section.title);
        } else {
            setTitle('');
        }
    }, [section]);

    // Reset form khi modal đóng
    useEffect(() => {
        if (!isOpen) {
            setTitle('');
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Vui lòng nhập tiêu đề cho phần học');
            return;
        }

        setIsSubmitting(true);

        try {
            // Đảm bảo courseId không phải undefined
            if (!courseId) {
                throw new Error('Không tìm thấy thông tin khóa học');
            }

            const sectionData = {
                title: title.trim(),
                courseId: courseId, // Đảm bảo courseId đã được truyền vào
                orderIndex: section ? section.order : 0
            };

            let result;
            if (section) {
                // Cập nhật section hiện có
                result = await updateSection(section.id, sectionData);
                if (!result) {
                    throw new Error('Không thể cập nhật phần học');
                }
                toast.success('Đã cập nhật phần học thành công');
            } else {
                // Tạo section mới
                result = await createSection(sectionData);
                if (!result) {
                    throw new Error('Không thể tạo phần học mới');
                }
                toast.success('Đã tạo phần học mới thành công');
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Lỗi khi lưu phần học:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-lg font-medium">
                        {section ? 'Chỉnh sửa phần học' : 'Thêm phần học mới'}
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
                    <div className="p-6">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Tiêu đề phần học
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Nhập tiêu đề phần học"
                                disabled={isSubmitting}
                            />
                        </div>
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