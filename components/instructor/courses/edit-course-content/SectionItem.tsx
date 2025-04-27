// components/SectionItem.tsx
import { useState } from 'react';
import { Grip, ChevronUp, ChevronDown, Edit, Trash2, Plus, MoreVertical } from 'lucide-react';
import { Section } from '@/types/instructor-course-edit';
import { LectureItem } from './LectureItem';
import { SectionEditModal } from '@/components/instructor/courses/SectionEditModal';
import { LectureEditModal } from '@/components/instructor/courses/LectureEditModal';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { createPortal } from 'react-dom';

interface SectionItemProps {
    section: Section;
    courseId: string;
    isExpanded: boolean;
    onToggle: (sectionId: string) => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    onDelete: (sectionId: string) => void;
    onAddLecture: (sectionId: string) => void;
    onDeleteLecture: (sectionId: string, lectureId: string) => void;
    onSectionUpdated: () => void;
    onLectureUpdated: () => void;
    isFirst?: boolean;
    isLast?: boolean;
}

export const SectionItem = ({
    section,
    courseId,
    isExpanded,
    onToggle,
    onDragStart,
    onDragEnd,
    onDelete,
    onAddLecture,
    onDeleteLecture,
    onSectionUpdated,
    onLectureUpdated,
    isFirst = false,
    isLast = false
}: SectionItemProps) => {
    const router = useRouter();
    // State cho modal chỉnh sửa section
    const [isSectionModalOpen, setSectionModalOpen] = useState(false);
    // State cho modal thêm bài giảng mới
    const [isLectureModalOpen, setLectureModalOpen] = useState(false);
    // State for hover
    const [isHovered, setIsHovered] = useState(false);

    // Xử lý mở modal chỉnh sửa section
    const handleEditSection = () => {
        setSectionModalOpen(true);
    };

    // Xử lý mở modal thêm bài giảng mới
    const handleAddLecture = () => {
        setLectureModalOpen(true);
    };

    // Xử lý chuyển đến trang chỉnh sửa bài giảng
    const handleEditLecture = (lectureId: string) => {
        router.push(`/instructor/courses/${courseId}/lectures/${lectureId}`);
    };

    // Handle delete confirmation
    const handleDeleteSection = () => {
        if (section.lectures.length > 0) {
            if (confirm(`Phần học này có ${section.lectures.length} bài giảng. Bạn có chắc chắn muốn xóa không?`)) {
                onDelete(section.id);
            }
        } else {
            onDelete(section.id);
        }
    };

    return (
        <motion.div 
            className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm 
                ${isHovered ? 'shadow-md border-gray-300' : ''} 
                ${isExpanded ? 'shadow-md' : ''} 
                transition-all duration-200`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={false}
            animate={{ scale: isHovered ? 1.005 : 1 }}
        >
            {/* Section header */}
            <div className={`px-4 py-3 flex justify-between items-center ${isExpanded ? 'bg-blue-50 border-b border-blue-100' : 'bg-white'}`}>
                <div className="flex items-center flex-1 min-w-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    className={`text-gray-400 hover:text-gray-600 p-1.5 rounded-md mr-2
                                        ${isHovered ? 'visible' : 'sm:invisible'} 
                                        hover:bg-gray-100 transition-colors`}
                                    onMouseDown={onDragStart}
                                    onMouseUp={onDragEnd}
                                >
                                    <Grip className="h-5 w-5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Kéo để sắp xếp thứ tự</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                Phần {section.order + 1}: {section.title}
                            </h3>
                            <Badge variant="outline" className="ml-2 text-xs border-gray-300">
                                {section.lectures.length} bài giảng
                            </Badge>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-1">
                    <button
                        type="button"
                        className={`text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-md transition-colors ${isExpanded ? 'bg-blue-100' : ''}`}
                        onClick={() => onToggle(section.id)}
                    >
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700 transition-colors">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={handleEditSection} className="cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Chỉnh sửa phần học
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={handleAddLecture} 
                                className="cursor-pointer text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm bài giảng
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={handleDeleteSection} 
                                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa phần học
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Section content */}
            {isExpanded && (
                <div className="bg-white p-4">
                    <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {section.lectures.length > 0 ? (
                            section.lectures.sort((a, b) => a.order - b.order).map((lecture, index) => (
                                <LectureItem
                                    key={lecture.id}
                                    lecture={lecture}
                                    courseId={courseId}
                                    sectionId={section.id}
                                    onDragStart={onDragStart}
                                    onDragEnd={onDragEnd}
                                    onDelete={onDeleteLecture}
                                    onEdit={() => handleEditLecture(lecture.id)}
                                    isFirst={index === 0}
                                    isLast={index === section.lectures.length - 1}
                                />
                            ))
                        ) : (
                            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                                <p className="text-sm text-gray-500">Chưa có bài giảng nào trong phần này</p>
                                <button
                                    onClick={handleAddLecture}
                                    className="mt-2 inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    <Plus className="h-4 w-4 mr-1" /> Thêm bài giảng
                                </button>
                            </div>
                        )}
                    </motion.div>
                    
                    {section.lectures.length > 0 && (
                        <div className="mt-4 flex justify-center">
                            <button
                                type="button"
                                onClick={handleAddLecture}
                                className="inline-flex items-center px-3.5 py-1.5 border border-blue-300 shadow-sm text-sm font-medium rounded-full text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            >
                                <Plus className="h-4 w-4 mr-1" /> Thêm bài giảng
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Use portals to render modals at the root level of the DOM */}
            {typeof window !== 'undefined' && isSectionModalOpen && createPortal(
                <SectionEditModal
                    section={section}
                    courseId={courseId}
                    isOpen={isSectionModalOpen}
                    onClose={() => setSectionModalOpen(false)}
                    onSave={onSectionUpdated}
                />,
                document.body
            )}

            {typeof window !== 'undefined' && isLectureModalOpen && createPortal(
                <LectureEditModal
                    sectionId={section.id}
                    isOpen={isLectureModalOpen}
                    onClose={() => setLectureModalOpen(false)}
                    onSave={onLectureUpdated}
                />,
                document.body
            )}
        </motion.div>
    );
};