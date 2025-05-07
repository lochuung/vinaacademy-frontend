import apiClient from "@/lib/apiClient";
import { CourseInstructorDto, CourseInstructorDtoRequest } from "@/types/instructor-course";
import { AxiosResponse } from "axios";

export async function createInstructorCourse(course: CourseInstructorDtoRequest): Promise<CourseInstructorDto | null> {
    try {
        const response: AxiosResponse = await apiClient.post('/courseinstructor', course);
        return response.data.data;
    } catch (error) {
        console.error("createCourseInstructor error:", error);
        return null;
    }
}