import { useState } from 'react';
import { markLessonComplete } from '@/services/lessonService';

/**
 * Custom hook for managing lesson progress
 * @returns Object containing functions to mark lessons as complete and loading state
 */
export const useLessonProgress = () => {
  const [markingComplete, setMarkingComplete] = useState<boolean>(false);
  
  /**
   * Mark a lesson as complete
   * @param lessonId The ID of the lesson to mark as complete
   * @returns Boolean indicating success
   */
  const markComplete = async (lessonId: string): Promise<boolean> => {
    setMarkingComplete(true);
    try {
      const success = await markLessonComplete(lessonId);
      return success;
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
      return false;
    } finally {
      setMarkingComplete(false);
    }
  };
  
  return {
    markComplete,
    markingComplete
  };
};
