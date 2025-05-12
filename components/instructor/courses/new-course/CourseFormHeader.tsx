// components/course-creator/CourseFormHeader.tsx
import Link from 'next/link';
import { ArrowLeft, FileEdit, Trash2, Loader2, Send } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CourseFormHeaderProps {
    progress: number;
    isEditing?: boolean;
    courseId?: string;
    courseStatus?: string;
    onDeleteCourse?: () => Promise<void>;
    onSubmitForReview?: () => Promise<void>;
}

export default function CourseFormHeader({
    progress,
    isEditing = false,
    courseId,
    courseStatus,
    onDeleteCourse,
    onSubmitForReview
}: CourseFormHeaderProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

    const isDraft = courseStatus?.toLowerCase() === 'draft';

    const handleDeleteConfirm = async () => {
        if (!onDeleteCourse) return;
        setIsDeleting(true);
        try {
            await onDeleteCourse();
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleSubmitForReview = async () => {
        if (!onSubmitForReview) return;
        setIsSubmitting(true);
        try {
            await onSubmitForReview();
            setIsConfirmSubmitOpen(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center">
                <Link href="/instructor/courses" className="group">
                    <div className="p-2 mr-2 rounded-full hover:bg-gray-200 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors" />
                    </div>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Sửa khóa học' : 'Tạo khóa học'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditing
                            ? 'Cập nhật thông tin để cải thiện khóa học của bạn'
                            : 'Hoàn thành các bước để xuất bản khóa học của bạn'}
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                {isEditing && courseId && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-center items-center">
                        {isDraft && onSubmitForReview && (
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setIsConfirmSubmitOpen(true)}
                                className="w-full sm:w-auto flex justify-center items-center px-3 py-2 h-10 text-xs font-medium rounded-md shadow-sm hover:shadow-md transition gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                <span className="hidden sm:inline">Gửi để phê duyệt</span>
                                <span className="sm:hidden">Phê duyệt</span>
                            </motion.button>
                        )}

                        <Link href={`/instructor/courses/${courseId}/content`} className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full flex justify-center items-center px-3 py-2 h-10 text-xs font-medium rounded-md shadow-sm hover:shadow-md transition gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <FileEdit className="w-4 h-4" />
                                <span className="hidden sm:inline">Chỉnh sửa nội dung</span>
                                <span className="sm:hidden">Chỉnh sửa</span>
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="w-full sm:w-auto flex justify-center items-center px-3 py-2 h-10 text-xs font-medium rounded-md shadow-sm hover:shadow-md transition gap-1.5 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Xóa</span>
                            <span className="sm:hidden">Xóa</span>
                        </motion.button>
                    </div>
                )}
                <div className="flex items-center text-sm font-medium bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="mr-3 text-gray-600">Tiến trình:</span>
                    <div className="relative w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-between px-1">
                            {[33, 66, 100].map((step, idx) => (
                                <TooltipProvider key={idx}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className={`w-4 h-4 rounded-full border-2 border-white transition-colors cursor-pointer ${progress >= step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p className="font-medium">{['Thông tin cơ bản', 'Hình ảnh', 'Định giá'][idx]}</p>
                                            <p className="text-xs opacity-75">{['Tên, loại, mô tả khóa học', 'Thumbnail hiển thị cho khóa học', 'Giá thành khóa học'][idx]}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                    <motion.span
                        className="ml-3 font-medium"
                        key={progress}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ color: progress === 100 ? '#22c55e' : progress >= 66 ? '#3b82f6' : '#6b7280' }}
                    >
                        {progress}%
                    </motion.span>
                </div>
            </div>

            {/* Delete Course Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-white rounded-xl shadow-xl border-0 max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-gray-900">Xác nhận xóa khóa học</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác và tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isDeleting}
                            className="font-medium border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                        >
                            Hủy bỏ
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteConfirm();
                            }}
                            disabled={isDeleting}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Đang xóa...
                                </>
                            ) : (
                                'Xóa khóa học'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Submit for Review Dialog */}
            <AlertDialog open={isConfirmSubmitOpen} onOpenChange={setIsConfirmSubmitOpen}>
                <AlertDialogContent className="bg-white rounded-xl shadow-xl border-0 max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-gray-900">Gửi khóa học để phê duyệt</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            Bạn chuẩn bị gửi khóa học này để phê duyệt. Khóa học sẽ được quản trị viên xem xét trước khi được xuất bản. Bạn có muốn tiếp tục?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isSubmitting}
                            className="font-medium border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                        >
                            Hủy bỏ
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmitForReview();
                            }}
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    <span>Đang gửi...</span>
                                </>
                            ) : (
                                'Xác nhận gửi'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
}
