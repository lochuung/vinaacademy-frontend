import { useEffect, useState } from "react";
import { CourseDto, CourseSearchRequest } from "@/types/course";
import { searchCourses } from "@/services/courseService";

interface UseCoursesProps {
  keyword?: string;
  categorySlug?: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  status?: "PUBLISHED" | "PENDING" | "DRAFT" | "REJECTED";
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export const useCourses = ({
  keyword,
  categorySlug,
  level,
  language,
  minPrice,
  maxPrice,
  minRating,
  status = "PUBLISHED", // Default: only published courses
  page = 0,
  size = 8,
  sortBy = "createdDate",
  sortDirection = "desc",
}: UseCoursesProps = {}) => {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchRequest: CourseSearchRequest = {
          keyword,
          categorySlug,
          level,
          language,
          minPrice,
          maxPrice,
          minRating,
          status,
        };

        const response = await searchCourses(
          searchRequest,
          page,
          size,
          sortBy,
          sortDirection
        );

        if (response) {
          setCourses(response.content || []);
          setTotalItems(response.totalElements || 0);
          setTotalPages(response.totalPages || 0);
        } else {
          setCourses([]);
          setError("Không thể tải khóa học. Vui lòng thử lại sau.");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Đã xảy ra lỗi khi tải dữ liệu khóa học.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [
    keyword,
    categorySlug,
    level,
    language,
    minPrice,
    maxPrice,
    minRating,
    status,
    page,
    size,
    sortBy,
    sortDirection,
  ]);

  return {
    courses,
    loading,
    error,
    totalItems,
    totalPages,
  };
};
