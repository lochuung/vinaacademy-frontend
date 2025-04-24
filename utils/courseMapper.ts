import { CourseDto } from "@/types/course";
import { CourseType } from "@/types/instructor-course";

/**
 * Maps a CourseDto from the API to a CourseType for the UI components
 * @param courseDto - The course data from the API
 * @returns CourseType formatted for UI components
 */
export function mapCourseToUiModel(courseDto: CourseDto): CourseType {
    return {
        id: courseDto.id,
        title: courseDto.name,
        students: courseDto.totalStudent || 0,
        rating: courseDto.rating || 0,
        income: 0, // This may need to come from another source
        status: courseDto.status,
        lastUpdated: courseDto.updatedDate || courseDto.createdDate,
        thumbnail: courseDto.image // This is the key field we need to map
    };
}

/**
 * Maps an array of CourseDto objects to CourseType objects
 * @param courseDtos - Array of course data from the API
 * @returns Array of CourseType objects for UI components
 */
export function mapCoursesToUiModels(courseDtos: CourseDto[]): CourseType[] {
    return courseDtos.map(mapCourseToUiModel);
}