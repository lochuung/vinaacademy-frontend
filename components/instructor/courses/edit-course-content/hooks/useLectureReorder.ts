import { useState } from 'react';
import { toast } from 'react-toastify';
import { arrayMove } from '@dnd-kit/sortable';
import { reorderLessons } from '@/services/lessonService';
import { LectureDisplay } from './useCourseContent';

/**
 * Custom hook for handling lecture reordering within a section
 */
export function useLectureReorder() {
  const [isReordering, setIsReordering] = useState(false);

  /**
   * Handles reordering lectures within a section
   * @param sectionId - ID of the section containing the lectures
   * @param lectures - Current array of lectures in the section
   * @param activeId - ID of the lecture being dragged
   * @param overId - ID of the lecture being hovered over
   * @returns A new array of reordered lectures
   */
  const handleReorder = async (
    sectionId: string,
    lectures: LectureDisplay[],
    activeId: string,
    overId: string
  ): Promise<LectureDisplay[]> => {
    if (activeId === overId) return lectures;

    setIsReordering(true);

    try {
      const oldIndex = lectures.findIndex(lecture => lecture.id === activeId);
      const newIndex = lectures.findIndex(lecture => lecture.id === overId);

      if (oldIndex === -1 || newIndex === -1) {
        console.error('Invalid lecture IDs in reordering operation');
        return lectures;
      }

      // Create a new array with the updated order
      const reorderedLectures = arrayMove(lectures, oldIndex, newIndex).map(
        (lecture, index) => ({
          ...lecture,
          order: index
        })
      );

      // Call API to persist the changes
      const lectureIds = reorderedLectures.map(lecture => lecture.id);
      const success = await reorderLessons(sectionId, lectureIds);

      if (!success) {
        toast.error('Không thể cập nhật thứ tự bài giảng. Vui lòng thử lại sau.');
        return lectures;
      }

      return reorderedLectures;
    } catch (error) {
      console.error('Error reordering lectures:', error);
      toast.error('Có lỗi xảy ra khi sắp xếp lại bài giảng');
      return lectures;
    } finally {
      setIsReordering(false);
    }
  };

  return {
    isReordering,
    handleReorder
  };
}