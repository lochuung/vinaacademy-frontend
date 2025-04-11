import { Loader } from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useEffect } from "react";

enum CourseLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
}

enum CourseStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
}

interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
}

interface SectionDto {
    id: string;
    title: string;
    order: number;
    lessons: LessonDto[];
}

interface LessonDto {
    id: string;
    title: string;
    order: number;
    duration: number;
    type: string;
}

interface CourseReviewDto {
    id: string;
    rating: number;
    comment: string;
    user: UserDto;
    createdAt: string;
}

interface BaseDto {
    createdAt: string;
    updatedAt: string;
}

interface CourseDetailsResponse extends BaseDto {
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
    instructors: UserDto[];
    ownerInstructor: UserDto;
    sections: SectionDto[];
    reviews: CourseReviewDto[];
}

interface Course {
    id: number;
    title: string;
    instructor: string;
    department: string;
    submittedDate: string;
    thumbnail: string;
    status: 'pending' | 'approved' | 'rejected';
    level: CourseLevel;
    slug: string;
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
}


// Mock API call to get course details
const fetchCourseDetails = async (courseId: number): Promise<CourseDetailsResponse> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock detailed course data
    return {
        id: String(courseId),
        image: `/placeholder-course-${courseId}.jpg`,
        name: ['Introduction to Machine Learning' + courseId, 'Advanced Python Programming' + courseId, 'Organic Chemistry Fundamentals'][courseId % 3],
        description: "This comprehensive course covers all the essential topics needed to master the subject. Starting with the fundamentals and progressing to advanced concepts, students will gain practical experience through hands-on projects and real-world examples.",
        slug: ['intro-machine-learning', 'advanced-python', 'organic-chemistry'][courseId % 3],
        price: 49.99 + (courseId * 10),
        level: [CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED][courseId % 3],
        status: CourseStatus.PENDING,
        language: 'English',
        categorySlug: ['computer-science', 'programming', 'chemistry'][courseId % 3],
        categoryName: ['Computer Science', 'Programming', 'Chemistry'][courseId % 3],
        rating: 4.5,
        totalRating: 120,
        totalStudent: 1500,
        totalSection: 8,
        totalLesson: 42,
        createdAt: '2025-03-15T10:30:00Z',
        updatedAt: '2025-04-01T14:20:00Z',
        instructors: [
            {
                id: "instr-1",
                firstName: "Sarah",
                lastName: "Johnson",
                email: "sarah.johnson@example.com",
                avatar: "/instructor-1.jpg"
            }
        ],
        ownerInstructor: {
            id: "instr-1",
            firstName: "Sarah",
            lastName: "Johnson",
            email: "sarah.johnson@example.com",
            avatar: "/instructor-1.jpg"
        },
        sections: [
            {
                id: "sect-1",
                title: "Introduction",
                order: 1,
                lessons: [
                    { id: "less-1", title: "Course Overview", order: 1, duration: 10, type: "video" },
                    { id: "less-2", title: "Getting Started", order: 2, duration: 15, type: "video" }
                ]
            },
            {
                id: "sect-2",
                title: "Basic Concepts",
                order: 2,
                lessons: [
                    { id: "less-3", title: "Core Principles", order: 1, duration: 20, type: "video" },
                    { id: "less-4", title: "Interactive Exercise", order: 2, duration: 30, type: "exercise" }
                ]
            }
        ],
        reviews: [
            {
                id: "rev-1",
                rating: 5,
                comment: "Excellent course with clear explanations and practical examples.",
                user: {
                    id: "user-1",
                    firstName: "John",
                    lastName: "Smith",
                    email: "john.smith@example.com",
                    avatar: "/user-1.jpg"
                },
                createdAt: "2025-03-20T09:15:00Z"
            },
            {
                id: "rev-2",
                rating: 4,
                comment: "Very informative content, though some sections could be more detailed.",
                user: {
                    id: "user-2",
                    firstName: "Emily",
                    lastName: "Davis",
                    email: "emily.davis@example.com",
                    avatar: "/user-2.jpg"
                },
                createdAt: "2025-03-22T14:30:00Z"
            }
        ]
    };
};

// Course details preview dialog component

const CourseDetailsPreview = ({
    courseId,
    isOpen,
    onClose
}: {
    courseId: number | null;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [courseDetails, setCourseDetails] = useState<CourseDetailsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (courseId && isOpen) {
            setLoading(true);
            fetchCourseDetails(courseId - 1)
                .then(data => {
                    setCourseDetails(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch course details:", error);
                    setLoading(false);
                });
        } else {
            setCourseDetails(null);
        }
    }, [courseId, isOpen]);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogTitle className="text-lg font-semibold">Chi tiết khóa học</DialogTitle>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <Loader className="animate-spin h-8 w-8 text-blue-500" />
                    </div>
                ) : courseDetails ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{courseDetails.name}</DialogTitle>
                            <DialogDescription asChild>
                                <div className='flex flex-wrap gap-2 mt-2'>
                                    <Badge variant="default">{courseDetails.level}</Badge>
                                    <Badge variant="default">{courseDetails.language}</Badge>
                                    <Badge variant="default">{courseDetails.categoryName}</Badge>
                                </div>

                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            {/* Left column */}
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Giới thiệu</h3>
                                    <p className="text-gray-700">{courseDetails.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Nội dung khóa học</h3>
                                    <div className="space-y-4">
                                        {courseDetails.sections.map((section) => (
                                            <div key={section.id} className="border rounded-lg overflow-hidden">
                                                <div className="bg-gray-50 p-3 font-medium">
                                                    {section.order}. {section.title}
                                                </div>
                                                <ul className="divide-y">
                                                    {section.lessons.map((lesson) => (
                                                        <li key={lesson.id} className="p-3 flex justify-between items-center">
                                                            <div className="flex items-center">
                                                                {lesson.type === 'video' ? (
                                                                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                                    </svg>
                                                                )}
                                                                <span>{lesson.order}. {lesson.title}</span>
                                                            </div>
                                                            <span className="text-sm text-gray-500">{Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>

                            {/* Right column */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Chi tiết</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Giá:</span>
                                            <span className="font-medium">${courseDetails.price.toFixed(2)}</span>
                                        </li>

                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Số phần:</span>
                                            <span className="font-medium">{courseDetails.totalSection}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Số bài học:</span>
                                            <span className="font-medium">{courseDetails.totalLesson}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Danh mục:</span>
                                            <span className="font-medium">{courseDetails.categoryName}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Slug:</span>
                                            <span className="font-medium">{courseDetails.slug}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Trình độ:</span>
                                            <span className="font-medium">{courseDetails.level}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Ngày tạo:</span>
                                            <span className="font-medium">{new Date(courseDetails.createdAt).toLocaleDateString("vi-VN")}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Ngày cập nhập:</span>
                                            <span className="font-medium">{new Date(courseDetails.updatedAt).toLocaleDateString("vi-VN")}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Instructor</h3>
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                            <span className="text-sm text-gray-600 font-medium">
                                                {courseDetails.ownerInstructor.firstName.charAt(0)}
                                                {courseDetails.ownerInstructor.lastName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{courseDetails.ownerInstructor.firstName} {courseDetails.ownerInstructor.lastName}</p>
                                            <p className="text-sm text-gray-500">{courseDetails.ownerInstructor.email}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Khóa học này chưa cập nhập</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetailsPreview;