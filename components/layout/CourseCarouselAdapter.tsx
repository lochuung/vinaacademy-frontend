"use client";

import React from "react";
import Carousel from "@/components/layout/Carousel";
import { CourseDto } from "@/types/course";
import { mockCourses } from "@/data/mockCourses";
import { getImageUrl } from "@/utils/imageUtils";

interface CourseCarouselAdapterProps {
  courses: CourseDto[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  limit?: number;
}

// Function to convert CourseDto (API format) to mock course format
const convertApiToMockFormat = (apiCourses: CourseDto[]) => {
  return apiCourses.map((course) => ({
    id: course.id,
    title: course.name,
    slug: course.slug,
    instructor: course.categoryName || "Instructor",
    category: course.categoryName || "General",
    level: getLevelText(course.level),
    image: getImageUrl(course.image),
    description: course.description || "No description available.",
    price: course.price.toString(),
    originalPrice: course.price > 0 ? (course.price * 1.2).toString() : undefined,
    rating: course.rating || 5.0,
    students: course.totalStudent?.toString() || "0",
    discount: course.price > 0 ? 20 : 0,
    bestSeller: course.rating > 4.5,
    featured: false,
    totalLessons: course.totalLesson || 0,
    totalHours: 0,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    // Default additional properties
    subCategory: "",
  }));
};

// Helper function to get readable level text
const getLevelText = (level?: string) => {
  switch (level) {
    case "BEGINNER":
      return "Cơ bản";
    case "INTERMEDIATE":
      return "Trung cấp";
    case "ADVANCED":
      return "Nâng cao";
    default:
      return level || "Cơ bản";
  }
};

const CourseCarouselAdapter: React.FC<CourseCarouselAdapterProps> = ({
  courses,
  loading,
  error,
  title,
  limit = 8,
}) => {
  if (loading) {
    // Return loading placeholder while waiting for API
    return (
      <div className="w-full flex space-x-4 overflow-hidden py-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] h-[350px] bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 py-4">{error}</div>;
  }

  // If no courses, return early
  if (!courses || courses.length === 0) {
    return <div className="text-gray-500 py-4 text-center">Không có khóa học nào.</div>;
  }

  // Convert API courses to mock format required by the Carousel
  const formattedCourses = convertApiToMockFormat(courses);

  return <Carousel title={title} limit={limit} customCourses={formattedCourses} />;
};

export default CourseCarouselAdapter;
