export enum CourseLevel {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
  }
  
  export enum CourseStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
  }
  
  export interface CourseInstructor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  }
  
  export interface CourseUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  }
  
  export interface CourseLesson {
    id: string;
    title: string;
    order: number;
    duration: number;
    type: string;
  }
  
  export interface CourseSection {
    id: string;
    title: string;
    order: number;
    lessons: CourseLesson[];
  }
  
  export interface CourseReview {
    id: string;
    rating: number;
    comment: string;
    user: CourseUser;
    createdAt: string;
  }
  
  export interface CourseDetailsResponse {
    id: string;
    image: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    level: CourseLevel;
    status: CourseStatus;
    language: string;
    categorySlug: string;
    categoryName: string;
    rating: number;
    totalRating: number;
    totalStudent: number;
    totalSection: number;
    totalLesson: number;
    createdAt: string;
    updatedAt: string;
    instructors: CourseInstructor[];
    ownerInstructor: CourseInstructor;
    sections: CourseSection[];
    reviews: CourseReview[];
  }