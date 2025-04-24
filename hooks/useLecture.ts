import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCourseLearning } from '@/services/courseService';
import { getLessonById } from '@/services/lessonService';
import { getAllLessonProgressByCourse } from '@/services/progressService';
import { LearningCourse, Lecture } from '@/types/lecture';
import {
  convertToLearningCourseWithLecture,
  createProgressMap,
  getLectureFromLesson
} from '@/utils/adapters/learningCourseAdapter';

/**
 * Custom hook for fetching and transforming lecture data
 * @param slug The course slug
 * @param lectureId The lecture ID to fetch
 * @returns Object containing course data, lecture data, loading state, and error state
 */
export const useLecture = (slug: string, lectureId: string) => {
  const [courseData, setCourseData] = useState<LearningCourse | null>(null);
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch course data
        const courseResponse = await getCourseLearning(slug);
        
        if (!courseResponse) {
          throw new Error('Failed to fetch course data');
        }
        
        // Fetch lesson progress data for the course
        const lessonProgressData = await getAllLessonProgressByCourse(courseResponse.id);
        
        // Use the adapter to convert API response to LearningCourse format with the current lecture
        const { course: transformedCourse, currentLecture: foundLecture } = 
          await convertToLearningCourseWithLecture(courseResponse, lessonProgressData, lectureId);
        
        // If lecture is not found in the course data, fetch it directly
        if (!foundLecture) {
          const lessonResponse = await getLessonById(lectureId);
          const progressMap = createProgressMap(lessonProgressData);
          const lectureFromLesson = await getLectureFromLesson(lessonResponse, progressMap);
          
          if (lectureFromLesson) {
            setCurrentLecture(lectureFromLesson);
            transformedCourse.currentLecture = lectureFromLesson;
          } else {
            throw new Error('Lecture not found');
          }
        } else {
          setCurrentLecture(foundLecture);
        }
        
        setCourseData(transformedCourse);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (slug && lectureId) {
      fetchData();
    }
  }, [slug, lectureId]);

  // Add handler for quiz content toggle
  const [showQuizContent, setShowQuizContent] = useState<boolean>(false);
  const handleStartQuiz = () => setShowQuizContent(true);

  return { 
    courseData, 
    currentLecture, 
    loading, 
    error,
    showQuizContent,
    handleStartQuiz,
    setShowQuizContent
  };
};
