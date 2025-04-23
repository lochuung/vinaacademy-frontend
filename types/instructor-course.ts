export interface CourseType {
  id: string;
  title: string;
  students: number;
  rating: number;
  income: number;
  lastUpdated: string;
  published: boolean;
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
