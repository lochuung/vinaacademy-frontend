'use client';

import apiClient from "@/lib/apiClient";
import { CourseDto, CourseRequest, CourseSearchRequest } from "@/types/course";
import { AxiosResponse } from "axios";

// 📌 GET /courses/pagination
export async function getCoursesPaginated(
    page = 0,
    size = 5,
    sortBy = 'name',
    sortDirection: 'asc' | 'desc' = 'asc',
    categorySlug?: string,
    minRating = 0
): Promise<CourseDto[]> {
    try {
        const response: AxiosResponse = await apiClient.get('/courses/pagination', {
            params: {
                page,
                size,
                sortBy,
                sortDirection,
                categorySlug,
                minRating
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("getCoursesPaginated error:", error);
        return [];
    }
}

// 🔍 GET /courses/search
export async function searchCourses(
    search: CourseSearchRequest,
    page = 0,
    size = 10,
    sortBy = 'name',
    sortDirection: 'asc' | 'desc' = 'asc'
): Promise<CourseDto[]> {
    try {
        const response: AxiosResponse = await apiClient.get('/courses/search', {
            params: {
                ...search,
                page,
                size,
                sortBy,
                sortDirection
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("searchCourses error:", error);
        return [];
    }
}

// ➕ POST /courses
export async function createCourse(course: CourseRequest): Promise<CourseDto | null> {
    try {
        const response: AxiosResponse = await apiClient.post('/courses', course);
        return response.data.data;
    } catch (error) {
        console.error("createCourse error:", error);
        return null;
    }
}

// 📝 PUT /courses/crud/{slug}
export async function updateCourse(slug: string, course: CourseRequest): Promise<CourseDto | null> {
    try {
        const response: AxiosResponse = await apiClient.put(`/courses/crud/${slug}`, course);
        return response.data.data;
    } catch (error) {
        console.error("updateCourse error:", error);
        return null;
    }
}

// ❌ DELETE /courses/crud/{slug}
export async function deleteCourse(slug: string): Promise<boolean> {
    try {
        await apiClient.delete(`/courses/crud/${slug}`);
        return true;
    } catch (error) {
        console.error("deleteCourse error:", error);
        return false;
    }
}
