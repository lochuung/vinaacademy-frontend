'use client';

import apiClient from "@/lib/apiClient";
import { CategoryDto, CategoryRequest } from "@/types/category";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api-response";
import { LessonDto, LessonRequest } from "@/types/lesson";
import { CourseDto, LessonType } from "@/types/course";

// 🔍 GET /lessons/{id}
export const getLessonById = async (id: string): Promise<LessonDto | null> => {
  try {
    const response: AxiosResponse<ApiResponse<LessonDto>> = await apiClient.get(
      `/lessons/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("getLessonById error:", error);
    return null;
  }
};

// 🔍 GET /lessons/section/{sectionId}
export const getLessonsBySectionId = async (sectionId: string): Promise<LessonDto[]> => {
  try {
    const response: AxiosResponse<ApiResponse<LessonDto[]>> = await apiClient.get(
      `/lessons/section/${sectionId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("getLessonsBySectionId error:", error);
    return [];
  }
};

// ➕ POST /lessons
export const createLesson = async (lessonData: LessonRequest): Promise<LessonDto | null> => {
  try {
    const response: AxiosResponse<ApiResponse<LessonDto>> = await apiClient.post(
      '/lessons',
      lessonData
    );
    return response.data.data;
  } catch (error) {
    console.error("createLesson error:", error);
    return null;
  }
};

// ✏️ PUT /lessons/{id}
export const updateLesson = async (id: string, lessonData: LessonRequest): Promise<LessonDto | null> => {
  try {
    const response: AxiosResponse<ApiResponse<LessonDto>> = await apiClient.put(
      `/lessons/${id}`,
      lessonData
    );
    return response.data.data;
  } catch (error) {
    console.error("updateLesson error:", error);
    return null;
  }
};

// ❌ DELETE /lessons/{id}
export const deleteLesson = async (id: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/lessons/${id}`);
    return true;
  } catch (error) {
    console.error("deleteLesson error:", error);
    return false;
  }
};

// Thêm phương thức để chuyển đổi từ loại bài giảng sang text dễ hiểu cho frontend
export function mapLessonTypeToDisplay(type: LessonType | string): string {
  const upperCaseType = typeof type === 'string' ? type.toUpperCase() as LessonType : type;

  switch (upperCaseType) {
    case 'VIDEO':
      return 'Video';
    case 'READING':
      return 'Bài đọc';
    case 'QUIZ':
      return 'Bài kiểm tra';
    default:
      return 'Bài học';
  }
}

// 🔍 GET /lesson-progress/{courseId}
export const getLessonProgressByCourse = async (courseId: string): Promise<any[]> => {
  try {
    const response: AxiosResponse<ApiResponse<any[]>> = await apiClient.get(
      `/lesson-progress/${courseId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("getLessonProgressByCourse error:", error);
    return [];
  }
};

export const markLessonComplete = async (lessonId: string): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      `/lessons/${lessonId}/complete`
    );
    return response.data.success;
  } catch (error) {
    console.error("markLessonComplete error:", error);
    return false;
  }
};
