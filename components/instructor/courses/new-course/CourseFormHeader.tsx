// components/course-creator/CourseFormHeader.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CourseFormHeaderProps {
    progress: number;
    isEditing?: boolean;
}

export default function CourseFormHeader({ progress, isEditing = false }: CourseFormHeaderProps) {
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
                        <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors"/>
                    </div>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditing 
                            ? 'Cập nhật thông tin để cải thiện khóa học của bạn' 
                            : 'Hoàn thành các bước để xuất bản khóa học của bạn'}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center text-sm font-medium bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <span className="mr-3 text-gray-600">Tiến trình:</span>
                <div className="relative w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    
                    {/* Progress step indicators */}
                    <div className="absolute inset-0 flex items-center justify-between px-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className={`w-4 h-4 rounded-full border-2 border-white transition-colors cursor-pointer ${progress >= 33 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium">Thông tin cơ bản</p>
                                    <p className="text-xs opacity-75">Tên, loại, mô tả khóa học</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className={`w-4 h-4 rounded-full border-2 border-white transition-colors cursor-pointer ${progress >= 66 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium">Hình ảnh</p>
                                    <p className="text-xs opacity-75">Thumbnail hiển thị cho khóa học</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className={`w-4 h-4 rounded-full border-2 border-white transition-colors cursor-pointer ${progress >= 100 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium">Định giá</p>
                                    <p className="text-xs opacity-75">Giá thành khóa học</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <motion.span 
                    className="ml-3 font-medium"
                    key={progress}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        color: progress === 100 ? '#22c55e' : progress >= 66 ? '#3b82f6' : '#6b7280'
                    }}
                >
                    {progress}%
                </motion.span>
            </div>
        </motion.div>
    );
}