import { useState, useEffect } from "react";
import { LearningCourse } from "@/types/navbar";
import { getUserEnrollments, EnrollmentResponse } from "@/services/enrollmentService";
import { mockEnrolledCourses } from "@/data/mockCourseData";
import { useQuery } from "@tanstack/react-query";

interface UseContinueLearningOptions {
  limit?: number;
  enabled?: boolean;
}

export function useContinueLearning({ limit = 3, enabled = true }: UseContinueLearningOptions = {}) {
  // Use React Query to fetch and manage the continuing education courses
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['continue-learning', limit],
    queryFn: async () => {
      try {
        // Fetch courses that are in progress, limit to the specified number
        const response = await getUserEnrollments(0, limit, 'IN_PROGRESS');
        return response;
      } catch (err) {
        console.error("Lỗi khi tải khóa học đang học:", err);
        // Fallback to mock data
        return {
          content: mockEnrolledCourses
            .sort((a, b) => {
              // Convert date strings to Date objects for comparison (dd/mm/yyyy format)
              const dateA = a.lastAccessed.split('/').reverse().join('-');
              const dateB = b.lastAccessed.split('/').reverse().join('-');
              return new Date(dateB).getTime() - new Date(dateA).getTime();
            })
            .slice(0, limit),
          totalPages: 1,
          totalElements: mockEnrolledCourses.length
        };
      }
    },
    enabled // Only fetch when component is ready
  });

  // Process the data to match LearningCourse format
  const continueLearningCourses: LearningCourse[] = data?.content 
    ? data.content.map((enrollment: EnrollmentResponse) => ({
        id: String(enrollment.courseId),
        name: enrollment.courseName,
        slug: enrollment.courseSlug,
        image: enrollment.courseImage || '/images/course-placeholder.jpg',
        instructor: enrollment.instructorName || enrollment.instructor || '',
        progress: enrollment.progressPercentage || 0,
        completedLessons: enrollment.completedLessons || 0,
        totalLessons: enrollment.totalLessons || 0,
        category: enrollment.category || '',
        lastAccessed: enrollment.lastAccessedAt || '',
        enrollmentId: enrollment.id
      }))
    : [];
    
  // Sort by most recently accessed
  const sortedCourses = [...continueLearningCourses].sort((a, b) => {
    const getTimestamp = (dateStr: string | undefined) => {
      if (!dateStr) return 0;
      
      if (dateStr.includes('/')) {
        // DD/MM/YYYY format
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`).getTime();
      } else {
        // ISO format
        return new Date(dateStr).getTime();
      }
    };
    
    return getTimestamp(b.lastAccessed) - getTimestamp(a.lastAccessed);
  });

  return {
    courses: sortedCourses,
    isLoading,
    error,
    refetch
  };
}