// components/instructor/courses/edit-course-content/hooks/useCourseContent.ts
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
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
    isPublished?: boolean;
    free?: boolean;
    description?: string;
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
    const queryClient = useQueryClient();
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // Query key definitions
    const sectionsQueryKey = ['sections', courseId];

    // Fetch sections and their lectures
    const {
        data: sections = [],
        isLoading,
        error,
        refetch: fetchSections
    } = useQuery({
        queryKey: sectionsQueryKey,
        queryFn: async () => {
            if (!courseId) return [];

            const fetchedSections = await getSectionsByCourse(courseId);

            // Nếu không có sections hoặc API lỗi
            if (!fetchedSections || fetchedSections.length === 0) {
                return [];
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

            // Auto-expand the first section if no sections are expanded
            if (sectionsWithLectures.length > 0 && expandedSections.length === 0) {
                setExpandedSections([sectionsWithLectures[0].id]);
            }

            return sectionsWithLectures;
        },
        enabled: !!courseId
    });

    // Add section mutation
    const addSectionMutation = useMutation({
        mutationFn: async () => {
            if (!courseId) throw new Error('Không có ID khóa học');

            const newSectionData = {
                title: `Phần học mới`,
                courseId: courseId,
                orderIndex: sections.length
            };

            return await createSection(newSectionData);
        },
        onSuccess: (createdSection) => {
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

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? [...oldData, newSection] : [newSection];
            });

            setExpandedSections(prev => [...prev, newSection.id]);
            toast.success('Đã thêm phần học mới thành công');
        },
        onError: (error) => {
            console.error('Lỗi khi thêm phần học:', error);
        }
    });

    // Edit section mutation
    const editSectionMutation = useMutation({
        mutationFn: async ({ sectionId, newTitle }: { sectionId: string, newTitle: string }) => {
            if (!courseId) throw new Error('Không có ID khóa học');

            const section = sections.find(s => s.id === sectionId);
            if (!section) throw new Error('Không tìm thấy phần học');

            const updatedSectionData = {
                title: newTitle,
                courseId: courseId,
                orderIndex: section.order
            };

            return await updateSection(sectionId, updatedSectionData);
        },
        onSuccess: (updatedSection, { sectionId, newTitle }) => {
            if (!updatedSection) {
                toast.error('Không thể cập nhật phần học. Vui lòng thử lại sau.');
                return;
            }

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? oldData.map(section =>
                    section.id === sectionId
                        ? { ...section, title: newTitle }
                        : section
                ) : [];
            });

            toast.success('Đã cập nhật phần học thành công');
        },
        onError: (error) => {
            console.error('Lỗi khi cập nhật phần học:', error);
        }
    });

    // Delete section mutation
    const deleteSectionMutation = useMutation({
        mutationFn: async (sectionId: string) => {
            if (!window.confirm('Bạn có chắc chắn muốn xóa phần học này không?')) {
                throw new Error('User cancelled');
            }
            return await deleteSectionApi(sectionId);
        },
        onSuccess: (success, sectionId) => {
            if (success === false) {
                toast.error('Không thể xóa phần học. Vui lòng thử lại sau.');
                return;
            }

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? oldData.filter(section => section.id !== sectionId) : [];
            });

            setExpandedSections(prev => prev.filter(id => id !== sectionId));
            toast.success('Đã xóa phần học thành công');

            // Cập nhật lại thứ tự các phần học còn lại
            updateSectionOrdersMutation.mutate();
        },
        onError: (error) => {
            if ((error as Error).message === 'User cancelled') return;
            console.error('Lỗi khi xóa phần học:', error);
        }
    });

    // Add lecture mutation
    const addLectureMutation = useMutation({
        mutationFn: async (sectionId: string) => {
            if (!courseId) throw new Error('Không có ID khóa học');

            const newLectureData = {
                title: `Bài giảng mới`,
                type: 'VIDEO' as LessonType,
                content: '',
                sectionId: sectionId,
            };

            const createdLesson = await createLesson(newLectureData);

            if (createdLesson) {
                // Gửi khóa học đi duyệt khi thêm bài giảng mới
                await submitCourseForReview(courseId);
            }

            return { createdLesson, sectionId };
        },
        onSuccess: ({ createdLesson, sectionId }) => {
            if (!createdLesson) {
                toast.error('Không thể thêm bài giảng. Vui lòng thử lại sau.');
                return;
            }

            const newLecture: LectureDisplay = mapLessonToLectureDisplay(createdLesson);

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? oldData.map(section => {
                    if (section.id === sectionId) {
                        return {
                            ...section,
                            lectures: [...section.lectures, newLecture]
                        };
                    }
                    return section;
                }) : [];
            });

            toast.success('Đã thêm bài giảng mới thành công và gửi khóa học đi duyệt');
        },
        onError: (error) => {
            console.error('Lỗi khi thêm bài giảng:', error);
        }
    });

    // Edit lecture mutation
    const editLectureMutation = useMutation({
        mutationFn: async ({ sectionId, lectureId, lectureData }: {
            sectionId: string,
            lectureId: string,
            lectureData: Partial<LectureDisplay>
        }) => {
            const section = sections.find(s => s.id === sectionId);
            const lecture = section?.lectures.find(l => l.id === lectureId);

            if (!section || !lecture) {
                throw new Error('Không tìm thấy bài giảng');
            }

            const updateData = {
                title: lectureData.title || lecture.title,
                type: (lectureData.type?.toUpperCase() || lecture.type.toUpperCase()) as LessonType,
                content: lectureData.content !== undefined ? lectureData.content : lecture.content || '',
                sectionId: sectionId,
                orderIndex: lectureData.order !== undefined ? lectureData.order : lecture.order,
                duration: lectureData.duration !== undefined ? lectureData.duration : lecture.duration
            };

            return {
                updatedLesson: await updateLesson(lectureId, updateData),
                sectionId,
                lectureId,
                lectureData
            };
        },
        onSuccess: ({ updatedLesson, sectionId, lectureId, lectureData }) => {
            if (!updatedLesson) {
                toast.error('Không thể cập nhật bài giảng. Vui lòng thử lại sau.');
                return;
            }

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? oldData.map(section => {
                    if (section.id === sectionId) {
                        return {
                            ...section,
                            lectures: section.lectures.map(lecture =>
                                lecture.id === lectureId ? { ...lecture, ...lectureData } : lecture
                            )
                        };
                    }
                    return section;
                }) : [];
            });

            toast.success('Đã cập nhật bài giảng thành công');
        },
        onError: (error) => {
            console.error('Lỗi khi cập nhật bài giảng:', error);
        }
    });

    // Delete lecture mutation
    const deleteLectureMutation = useMutation({
        mutationFn: async ({ sectionId, lectureId }: { sectionId: string, lectureId: string }) => {
            if (!window.confirm('Bạn có chắc chắn muốn xóa bài giảng này không?')) {
                throw new Error('User cancelled');
            }
            return { success: await deleteLesson(lectureId), sectionId, lectureId };
        },
        onSuccess: ({ success, sectionId, lectureId }) => {
            if (success === false) {
                toast.error('Không thể xóa bài giảng. Vui lòng thử lại sau.');
                return;
            }

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? oldData.map(section => {
                    if (section.id === sectionId) {
                        return {
                            ...section,
                            lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
                        };
                    }
                    return section;
                }) : [];
            });

            toast.success('Đã xóa bài giảng thành công');

            // Cập nhật lại thứ tự các bài giảng trong phần học đó
            updateLectureOrdersMutation.mutate(sectionId);
        },
        onError: (error) => {
            if ((error as Error).message === 'User cancelled') return;
            console.error('Lỗi khi xóa bài giảng:', error);
        }
    });

    // Update section orders mutation
    const updateSectionOrdersMutation = useMutation({
        mutationFn: async () => {
            if (!courseId || sections.length === 0) return false;
            const sectionIds = sections.map(section => section.id);
            return await reorderSections(courseId, sectionIds);
        },
        onError: (error) => {
            console.error('Lỗi khi cập nhật thứ tự phần học:', error);
        }
    });

    // Update lecture orders mutation
    const updateLectureOrdersMutation = useMutation({
        mutationFn: async (sectionId: string) => {
            const section = sections.find(s => s.id === sectionId);
            if (!section) return;

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
            return sectionId;
        },
        onSuccess: (sectionId) => {
            if (!sectionId) return;

            queryClient.setQueryData(sectionsQueryKey, (oldData: SectionDisplay[] | undefined) => {
                return oldData ? oldData.map(s => {
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
                }) : [];
            });
        },
        onError: (error) => {
            console.error('Lỗi khi cập nhật thứ tự bài giảng:', error);
        }
    });

    // Save all changes mutation
    const saveAllChangesMutation = useMutation({
        mutationFn: async () => {
            // First update section orders
            if (courseId) {
                await updateSectionOrdersMutation.mutateAsync();
            }

            // Then update lecture orders for each section
            for (const section of sections) {
                await updateLectureOrdersMutation.mutateAsync(section.id);
            }

            return true;
        },
        onSuccess: () => {
            toast.success('Đã lưu tất cả thay đổi thành công');
        },
        onError: (error) => {
            console.error('Lỗi khi lưu thay đổi:', error);
        }
    });

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

    return {
        sections,
        expandedSections,
        isDragging,
        isLoading,
        error,
        setIsDragging,
        toggleSection,
        addSection: () => addSectionMutation.mutate(),
        editSection: (sectionId: string, newTitle: string) => editSectionMutation.mutate({ sectionId, newTitle }),
        deleteSection: (sectionId: string) => deleteSectionMutation.mutate(sectionId),
        addLecture: (sectionId: string) => addLectureMutation.mutate(sectionId),
        editLecture: (sectionId: string, lectureId: string, lectureData: Partial<LectureDisplay>) =>
            editLectureMutation.mutate({ sectionId, lectureId, lectureData }),
        deleteLecture: (sectionId: string, lectureId: string) =>
            deleteLectureMutation.mutate({ sectionId, lectureId }),
        saveAllChanges: () => saveAllChangesMutation.mutateAsync(),
        fetchSections
    };
};