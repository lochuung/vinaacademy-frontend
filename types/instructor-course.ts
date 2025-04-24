export type CourseStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED';

export interface CourseType {
  id: string;
  title: string;
  students: number;
  rating: number;
  income: number;
  lastUpdated: string;
  status: CourseStatus; // Thêm trường này
  thumbnail: string;
}

export type CourseInstructorDto = {
  id: number;
  userId: string;
  courseId: string;
  isOwner: Boolean;
};

export type CourseInstructorDtoRequest = {
  userId: string;
  courseId: string;
  isOwner: Boolean;
};
