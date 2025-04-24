import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCourseLearning } from '@/services/courseService';
import { CourseDto } from '@/types/course';
import { LearningCourse } from '@/types/lecture';
import { convertToLearningCourse } from '@/utils/adapters/learningCourseAdapter';

/**
 * Custom hook for fetching and transforming learning course data
 * @param slug The course slug to fetch
 * @returns Object containing course data, loading state, error state, and API response
 */
export const useLearningCourse = (slug: string) => {
  const [course, setCourse] = useState<LearningCourse | null>(null);
  const [apiResponse, setApiResponse] = useState<CourseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiResponse = await getCourseLearning(slug);
        
        if (!apiResponse) {
          throw new Error('Failed to fetch course data');
        }
        
        // Store the original API response for use in other parts of the component
        setApiResponse(apiResponse);
        
        // Use the adapter to convert API response to LearningCourse format
        const transformedCourse = await convertToLearningCourse(apiResponse);
        
        setCourse(transformedCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  return { course, loading, error, apiResponse };
};
