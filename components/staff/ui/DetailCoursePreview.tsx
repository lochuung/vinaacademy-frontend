import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { CourseDetailsResponse, CourseLevel, CourseStatus } from "@/types/new-course";

// Mock API call to get course details
const fetchCourseDetails = async (courseId: string): Promise<CourseDetailsResponse> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const numericId = parseInt(courseId);

    // Mock detailed course data
    return {
        id: courseId,
        image: `/placeholder-course-${numericId}.jpg`,
        name: ['Giới Thiệu Về Machine Learning', 'Lập Trình Python Nâng Cao', 'Cơ Bản Về Hóa Học Hữu Cơ'][numericId % 3],
        description: "Khóa học toàn diện này bao gồm tất cả các chủ đề cần thiết để thành thạo môn học. Bắt đầu với những kiến thức cơ bản và tiến tới các khái niệm nâng cao, học viên sẽ có được kinh nghiệm thực tiễn thông qua các dự án thực hành và ví dụ thực tế.",
        slug: ['gioi-thieu-machine-learning', 'lap-trinh-python-nang-cao', 'co-ban-hoa-hoc-huu-co'][numericId % 3],
        price: 49.99 + (numericId * 10),
        level: [CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED][numericId % 3],
        status: CourseStatus.PENDING,
        language: 'Tiếng Việt',
        categorySlug: ['khoa-hoc-may-tinh', 'lap-trinh', 'hoa-hoc'][numericId % 3],
        categoryName: ['Khoa Học Máy Tính', 'Lập Trình', 'Hóa Học'][numericId % 3],
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
                firstName: "Ngọc",
                lastName: "Trần",
                email: "ngoc.tran@example.com",
                avatar: "/instructor-1.jpg"
            }
        ],
        ownerInstructor: {
            id: "instr-1",
            firstName: "Ngọc",
            lastName: "Trần",
            email: "ngoc.tran@example.com",
            avatar: "/instructor-1.jpg"
        },
        sections: [
            {
                id: "sect-1",
                title: "Giới Thiệu",
                order: 1,
                lessons: [
                    { id: "less-1", title: "Tổng Quan Khóa Học", order: 1, duration: 10, type: "video" },
                    { id: "less-2", title: "Bắt Đầu", order: 2, duration: 15, type: "video" }
                ]
            },
            {
                id: "sect-2",
                title: "Khái Niệm Cơ Bản",
                order: 2,
                lessons: [
                    { id: "less-3", title: "Nguyên Tắc Cốt Lõi", order: 1, duration: 20, type: "video" },
                    { id: "less-4", title: "Bài Tập Tương Tác", order: 2, duration: 30, type: "exercise" }
                ]
            }
        ],
        reviews: [
            {
                id: "rev-1",
                rating: 5,
                comment: "Khóa học tuyệt vời với những giải thích rõ ràng và ví dụ thực tế.",
                user: {
                    id: "user-1",
                    firstName: "Minh",
                    lastName: "Nguyễn",
                    email: "minh.nguyen@example.com",
                    avatar: "/user-1.jpg"
                },
                createdAt: "2025-03-20T09:15:00Z"
            },
            {
                id: "rev-2",
                rating: 4,
                comment: "Nội dung rất hữu ích, mặc dù một số phần có thể được trình bày chi tiết hơn.",
                user: {
                    id: "user-2",
                    firstName: "Thu",
                    lastName: "Lê",
                    email: "thu.le@example.com",
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
    courseId: string | null;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [courseDetails, setCourseDetails] = useState<CourseDetailsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (courseId && isOpen) {
            setLoading(true);
            fetchCourseDetails(courseId)
                .then(data => {
                    setCourseDetails(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Không thể tải chi tiết khóa học:", error);
                    setLoading(false);
                });
        } else {
            setCourseDetails(null);
        }
    }, [courseId, isOpen]);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogTitle className="sr-only">Chi tiết khóa học</DialogTitle>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
                                    <h3 className="text-lg font-medium mb-2">Mô tả chi tiết</h3>
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
                                    <h3 className="text-lg font-medium mb-4">Thông tin</h3>
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
                                            <span className="font-medium">{new Date(courseDetails.createdAt).toLocaleDateString()}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Ngày cập nhập:</span>
                                            <span className="font-medium">{new Date(courseDetails.updatedAt).toLocaleDateString()}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Giảng viên</h3>
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
                        <p className="text-gray-500">Chi tiết khóa học không khả dụng</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetailsPreview;