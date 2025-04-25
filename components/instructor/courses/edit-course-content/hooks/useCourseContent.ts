// components/instructor/courses/edit-course-content/hooks/useCourseContent.ts
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { LessonDto, SectionDto, LessonType } from '@/types/course';
import {
    getLessonsBySectionId,
    createLesson,
    updateLesson,
    deleteLesson
} from '@/services/lessonService';
import {
    getSectionsByCourse,
    createSection,
    updateSection,
    deleteSection as deleteSectionApi,
    reorderSections,
} from '@/services/sectionService';
import { submitCourseForReview } from '@/services/courseService';

// Định nghĩa lại type phù hợp với backend nhưng vẫn đáp ứng yêu cầu frontend
export interface SectionDisplay {
    id: string;
    title: string;
    order: number;
    lectures: LectureDisplay[];
}

export interface LectureDisplay {
    id: string;
    title: string;
    type: string;
    duration?: number;
    content?: string;
    order: number;
    isPublished ?: boolean;
}

// Type mapping từ backend sang frontend
const mapLessonToLectureDisplay = (lesson: LessonDto): LectureDisplay => ({
    id: lesson.id,
    title: lesson.title,
    type: lesson.type.toLowerCase(),
    duration: lesson.type === 'VIDEO' ? lesson.videoDuration : lesson.duration,
    content: lesson.content || '',
    order: lesson.orderIndex
});

// Map SectionDto sang SectionDisplay
const mapSectionToDisplay = (section: SectionDto, lessons: LessonDto[] = []): SectionDisplay => ({
    id: section.id,
    title: section.title,
    order: section.orderIndex,
    lectures: lessons.map(mapLessonToLectureDisplay)
});

export const useCourseContent = (courseId?: string) => {
    const [sections, setSections] = useState<SectionDisplay[]>([]);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch sections when component mounts
    useEffect(() => {
        if (courseId) {
            fetchSections();
        }
    }, [courseId]);

    // Fetch all sections for the course
    const fetchSections = async () => {
        if (!courseId) return;

        setIsLoading(true);
        try {
            const fetchedSections = await getSectionsByCourse(courseId);

            // Nếu không có sections hoặc API lỗi
            if (!fetchedSections || fetchedSections.length === 0) {
                setSections([]);
                setIsLoading(false);
                return;
            }

            // Lấy tất cả các bài giảng cho mỗi section
            const sectionsWithLectures = await Promise.all(
                fetchedSections.map(async (section: SectionDto) => {
                    try {
                        const lessons = await getLessonsBySectionId(section.id);
                        return mapSectionToDisplay(section, lessons);
                    } catch (error) {
                        console.error(`Lỗi khi tải bài giảng cho section ${section.id}:`, error);
                        return mapSectionToDisplay(section, []);
                    }
                })
            );

            setSections(sectionsWithLectures);

            // Auto-expand the first section if no sections are expanded
            if (sectionsWithLectures.length > 0 && expandedSections.length === 0) {
                setExpandedSections([sectionsWithLectures[0].id]);
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu phần học:', error);
            toast.error('Không thể tải dữ liệu phần học. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    // Add a new section
    const addSection = async () => {
        if (!courseId) return;

        try {
            const newSectionData = {
                title: `Phần học mới`,
                courseId: courseId,
                orderIndex: sections.length
            };

            const createdSection = await createSection(newSectionData);

            if (!createdSection) {
                toast.error('Không thể tạo phần học mới. Vui lòng thử lại sau.');
                return;
            }

            const newSection: SectionDisplay = {
                id: createdSection.id,
                title: createdSection.title,
                order: createdSection.orderIndex,
                lectures: []
            };

            setSections(prev => [...prev, newSection]);
            setExpandedSections(prev => [...prev, newSection.id]);
            toast.success('Đã thêm phần học mới thành công');
        } catch (error) {
            console.error('Lỗi khi thêm phần học:', error);
            toast.error('Không thể thêm phần học. Vui lòng thử lại sau.');
        }
    };

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => {
            if (prev.includes(sectionId)) {
                return prev.filter(id => id !== sectionId);
            } else {
                return [...prev, sectionId];
            }
        });
    };

    // Edit section title
    const editSection = async (sectionId: string, newTitle: string) => {
        try {
            const section = sections.find(s => s.id === sectionId);

            if (!section) {
                toast.error('Không tìm thấy phần học');
                return;
            }

            // Đảm bảo courseId không phải undefined
            if (!courseId) {
                toast.error('Không tìm thấy thông tin khóa học');
                return;
            }

            const updatedSectionData = {
                title: newTitle,
                courseId: courseId,
                orderIndex: section.order
            };

            const updatedSection = await updateSection(sectionId, updatedSectionData);

            if (!updatedSection) {
                toast.error('Không thể cập nhật phần học. Vui lòng thử lại sau.');
                return;
            }

            setSections(prev => prev.map(section =>
                section.id === sectionId
                    ? { ...section, title: newTitle }
                    : section
            ));

            toast.success('Đã cập nhật phần học thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật phần học:', error);
            toast.error('Không thể cập nhật phần học. Vui lòng thử lại sau.');
        }
    };

    // Delete a section
    const deleteSection = async (sectionId: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phần học này không?')) {
            return;
        }

        try {
            const success = await deleteSectionApi(sectionId);

            // Kiểm tra kết quả của API call
            if (success === false) {
                toast.error('Không thể xóa phần học. Vui lòng thử lại sau.');
                return;
            }

            setSections(prev => prev.filter(section => section.id !== sectionId));
            setExpandedSections(prev => prev.filter(id => id !== sectionId));
            toast.success('Đã xóa phần học thành công');

            // Cập nhật lại thứ tự các phần học còn lại
            updateSectionOrders();
        } catch (error) {
            console.error('Lỗi khi xóa phần học:', error);
            toast.error('Không thể xóa phần học. Có thể phần học này đã có bài giảng.');
        }
    };

    // Add a new lecture to a section
    const addLecture = async (sectionId: string) => {
        try {
            if (!courseId) {
                toast.error('Không tìm thấy thông tin khóa học');
                return;
            }

            const section = sections.find(s => s.id === sectionId);
            if (!section) return;

            const newLectureData = {
                title: `Bài giảng mới`,
                type: 'VIDEO' as LessonType,
                content: '',
                sectionId: sectionId,
                // Loại bỏ orderIndex để backend tự động xử lý
            };

            const createdLesson = await createLesson(newLectureData);

            if (!createdLesson) {
                toast.error('Không thể thêm bài giảng. Vui lòng thử lại sau.');
                return;
            }

            const newLecture: LectureDisplay = mapLessonToLectureDisplay(createdLesson);

            setSections(prev => prev.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        lectures: [...section.lectures, newLecture]
                    };
                }
                return section;
            }));

            // Gửi khóa học đi duyệt khi thêm bài giảng mới
            await submitCourseForReview(courseId);

            toast.success('Đã thêm bài giảng mới thành công và gửi khóa học đi duyệt');
        } catch (error) {
            console.error('Lỗi khi thêm bài giảng:', error);
            toast.error('Không thể thêm bài giảng. Vui lòng thử lại sau.');
        }
    };

    // Edit lecture
    const editLecture = async (sectionId: string, lectureId: string, lectureData: Partial<LectureDisplay>) => {
        try {
            const section = sections.find(s => s.id === sectionId);
            const lecture = section?.lectures.find(l => l.id === lectureId);

            if (!section || !lecture) {
                toast.error('Không tìm thấy bài giảng');
                return;
            }

            const updateData = {
                title: lectureData.title || lecture.title,
                type: (lectureData.type?.toUpperCase() || lecture.type.toUpperCase()) as LessonType,
                content: lectureData.content !== undefined ? lectureData.content : lecture.content || '',
                sectionId: sectionId,
                orderIndex: lectureData.order !== undefined ? lectureData.order : lecture.order,
                duration: lectureData.duration !== undefined ? lectureData.duration : lecture.duration
            };

            const updatedLesson = await updateLesson(lectureId, updateData);

            if (!updatedLesson) {
                toast.error('Không thể cập nhật bài giảng. Vui lòng thử lại sau.');
                return;
            }

            setSections(prev => prev.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        lectures: section.lectures.map(lecture =>
                            lecture.id === lectureId ? { ...lecture, ...lectureData } : lecture
                        )
                    };
                }
                return section;
            }));

            toast.success('Đã cập nhật bài giảng thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật bài giảng:', error);
            toast.error('Không thể cập nhật bài giảng. Vui lòng thử lại sau.');
        }
    };

    // Delete a lecture
    const deleteLecture = async (sectionId: string, lectureId: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bài giảng này không?')) {
            return;
        }

        try {
            const success = await deleteLesson(lectureId);

            // Kiểm tra kết quả API call
            if (success === false) {
                toast.error('Không thể xóa bài giảng. Vui lòng thử lại sau.');
                return;
            }

            setSections(prev => prev.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
                    };
                }
                return section;
            }));

            toast.success('Đã xóa bài giảng thành công');

            // Cập nhật lại thứ tự các bài giảng trong phần học đó
            updateLectureOrders(sectionId);
        } catch (error) {
            console.error('Lỗi khi xóa bài giảng:', error);
            toast.error('Không thể xóa bài giảng. Vui lòng thử lại sau.');
        }
    };

    // Update section orders after reordering
    const updateSectionOrders = async () => {
        if (!courseId || sections.length === 0) return;

        try {
            const sectionIds = sections.map(section => section.id);
            const success = await reorderSections(courseId, sectionIds);

            if (success === false) {
                toast.error('Không thể cập nhật thứ tự các phần học.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thứ tự phần học:', error);
            toast.error('Không thể cập nhật thứ tự các phần học.');
        }
    };

    // Update lecture orders within a section
    const updateLectureOrders = async (sectionId: string) => {
        try {
            const section = sections.find(s => s.id === sectionId);
            if (!section) return;

            // Cập nhật thứ tự trên UI
            setSections(prev => prev.map(s => {
                if (s.id === sectionId) {
                    const updatedLectures = [...s.lectures].map((lecture, index) => ({
                        ...lecture,
                        order: index
                    }));
                    return {
                        ...s,
                        lectures: updatedLectures
                    };
                }
                return s;
            }));

            // Cập nhật từng bài giảng với orderIndex mới
            const promises = section.lectures.map((lecture, index) => {
                // Chỉ cập nhật nếu thứ tự đã thay đổi
                if (lecture.order !== index) {
                    const updateData = {
                        title: lecture.title,
                        type: lecture.type.toUpperCase() as LessonType,
                        content: lecture.content || '',
                        sectionId: sectionId,
                        orderIndex: index,
                        duration: lecture.type.toLowerCase() === 'video' ? lecture.duration : undefined
                    };

                    return updateLesson(lecture.id, updateData);
                }
                return Promise.resolve(null);
            });

            await Promise.all(promises);
        } catch (error) {
            console.error('Lỗi khi cập nhật thứ tự bài giảng:', error);
            toast.error('Không thể cập nhật thứ tự các bài giảng.');
        }
    };

    // Save all changes (sections and lectures)
    const saveAllChanges = async () => {
        try {
            // First update section orders
            if (courseId) {
                await updateSectionOrders();
            }

            // Then update lecture orders for each section
            for (const section of sections) {
                await updateLectureOrders(section.id);
            }

            toast.success('Đã lưu tất cả thay đổi thành công');
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu thay đổi:', error);
            toast.error('Không thể lưu thay đổi. Vui lòng thử lại sau.');
            return false;
        }
    };

    return {
        sections,
        expandedSections,
        isDragging,
        isLoading,
        setIsDragging,
        toggleSection,
        addSection,
        editSection,
        deleteSection,
        addLecture,
        editLecture,
        deleteLecture,
        saveAllChanges,
        fetchSections
    };
};