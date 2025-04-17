// pages/admin/course-approvals.tsx
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
    Search, 
    Loader} from 'lucide-react';
import { useDebounce } from 'use-debounce';
import CourseDetailsPreview from '@/components/staff/DetailCourse';
import ApprovalCourses from '@/components/staff/ApprovalCourses';

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import RightPanel from "@/components/staff/RightPanel";
import Filter from '@/components/staff/Filter';
import { Course, CourseLevel, CourseSortOption, CoursesResponse, CourseStatus, CourseStatusOption, PaginationData } from '@/types/new-course';
import Pagination from '@/components/staff/Pagination';

// Define TypeScript interfaces


// Sort types

// Mock API call to fetch courses
const fetchCourses = async (
    page: number = 1,
    status: string = 'pending',
    searchTerm: string = '',
    sortBy: CourseSortOption = 'normal'
): Promise<CoursesResponse> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock data
    const allCourses: Course[] = [
        { id: 1, title: 'Introduction to Machine Learning', instructor: 'Dr. Sarah Johnson', department: 'Computer Science', submittedDate: '2025-04-08', thumbnail: '/placeholder-course-1.jpg', status: 'pending', level: CourseLevel.BEGINNER, slug: 'intro-machine-learning' },
        { id: 2, title: 'Advanced Python Programming', instructor: 'Prof. Michael Chen', department: 'Computer Science', submittedDate: '2025-04-07', thumbnail: '/placeholder-course-2.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'advanced-python' },
        { id: 3, title: 'Organic Chemistry Fundamentals', instructor: 'Dr. Emily White', department: 'Chemistry', submittedDate: '2025-04-06', thumbnail: '/placeholder-course-3.jpg', status: 'pending', level: CourseLevel.INTERMEDIATE, slug: 'organic-chemistry' },
        { id: 4, title: 'Digital Marketing Strategies', instructor: 'Prof. Robert Davis', department: 'Business', submittedDate: '2025-04-05', thumbnail: '/placeholder-course-4.jpg', status: 'pending', level: CourseLevel.BEGINNER, slug: 'digital-marketing' },
        { id: 5, title: 'Introduction to Psychology', instructor: 'Dr. Lisa Brown', department: 'Psychology', submittedDate: '2025-04-04', thumbnail: '/placeholder-course-5.jpg', status: 'pending', level: CourseLevel.BEGINNER, slug: 'intro-psychology' },
        { id: 6, title: 'Calculus for Engineers', instructor: 'Prof. David Wilson', department: 'Mathematics', submittedDate: '2025-04-03', thumbnail: '/placeholder-course-6.jpg', status: 'approved', level: CourseLevel.ADVANCED, slug: 'calculus-engineers' },
        { id: 7, title: 'Modern World History', instructor: 'Dr. Jennifer Lee', department: 'History', submittedDate: '2025-04-02', thumbnail: '/placeholder-course-7.jpg', status: 'approved', level: CourseLevel.INTERMEDIATE, slug: 'modern-world-history' },
        { id: 8, title: 'Creative Writing Workshop', instructor: 'Prof. James Smith', department: 'English', submittedDate: '2025-04-01', thumbnail: '/placeholder-course-8.jpg', status: 'rejected', level: CourseLevel.BEGINNER, slug: 'creative-writing' },
        { id: 9, title: 'Environmental Science', instructor: 'Dr. Mark Johnson', department: 'Biology', submittedDate: '2025-03-31', thumbnail: '/placeholder-course-9.jpg', status: 'pending', level: CourseLevel.INTERMEDIATE, slug: 'environmental-science' },
        { id: 10, title: 'Public Speaking', instructor: 'Prof. Sarah Miller', department: 'Communications', submittedDate: '2025-03-30', thumbnail: '/placeholder-course-10.jpg', status: 'pending', level: CourseLevel.BEGINNER, slug: 'public-speaking' },
        { id: 11, title: 'Financial Accounting', instructor: 'Dr. Andrew Clark', department: 'Business', submittedDate: '2025-03-29', thumbnail: '/placeholder-course-11.jpg', status: 'pending', level: CourseLevel.INTERMEDIATE, slug: 'financial-accounting' },
        { id: 12, title: 'Human Anatomy 12', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 13, title: 'Human Anatomy 13', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 14, title: 'Human Anatomy 14', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 15, title: 'Human Anatomy 15', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 16, title: 'Human Anatomy 16', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 17, title: 'Human Anatomy 17', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 18, title: 'Human Anatomy 18', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
        { id: 19, title: 'Human Anatomy 19', instructor: 'Prof. Rebecca Martin', department: 'Biology', submittedDate: '2025-03-28', thumbnail: '/placeholder-course-12.jpg', status: 'pending', level: CourseLevel.ADVANCED, slug: 'human-anatomy' },
    ];

    // Filter by status
    const filteredByStatus = status === 'all'
        ? allCourses
        : allCourses.filter(course => course.status === status);

    // Apply search if provided
    const filtered = searchTerm
        ? filteredByStatus.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.department.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : filteredByStatus;

    // Apply sorting
    let sortedCourses = [...filtered];
    if (sortBy === 'newest') {
        sortedCourses.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
    } else if (sortBy === 'oldest') {
        sortedCourses.sort((a, b) => new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime());
    }

    // Calculate pagination
    const itemsPerPage = 5;
    const totalItems = sortedCourses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCourses = sortedCourses.slice(start, end);

    return {
        courses: paginatedCourses,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems,
            hasMore: page < totalPages
        }
    };
};



export default function CourseApprovalPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [status, setStatus] = useState<CourseStatusOption>(CourseStatus.PENDING);
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasMore: false
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<CourseSortOption>('normal');
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

    const loadCourses = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const data = await fetchCourses(page, status, debouncedSearchTerm, sortOption);
            setCourses(data.courses);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, [page, status, debouncedSearchTerm, sortOption]);

    const handleStatusChange = (newStatus: string): void => {
        setStatus(newStatus);
        setPage(1); // Reset to first page when changing filters
        setSelectedCourse(null);
    };

    const handlePageChange = (newPage: number): void => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    const handleCourseSelect = (course: Course): void => {
        setSelectedCourse(course);
    };

    const handleApprove = async (id: number): Promise<void> => {
        // In a real application, this would make an API call
        setCourses(courses.map(course =>
            course.id === id ? { ...course, status: 'approved' } : course
        ));
        if (selectedCourse?.id === id) {
            setSelectedCourse({ ...selectedCourse, status: 'approved' });
        }
    };

    const handleReject = async (id: number): Promise<void> => {
        // In a real application, this would make an API call
        setCourses(courses.map(course =>
            course.id === id ? { ...course, status: 'rejected' } : course
        ));
        if (selectedCourse?.id === id) {
            setSelectedCourse({ ...selectedCourse, status: 'rejected' });
        }
    };

    // Generate pagination range
    const getPaginationRange = () => {
        const totalPages = pagination.totalPages;
        const currentPage = pagination.currentPage;
        const range = [];

        // Always show the first page
        if (currentPage > 2) {
            range.push(1);
            // Add ellipsis if there are pages between first page and 3 pages before current
            if (currentPage > 3) {
                range.push('...');
            }
        }

        // Calculate the range around current page (3 before, current, 3 after)
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Always show the last page
        if (currentPage < totalPages - 1) {
            // Add ellipsis if there are pages between 3 pages after current and last page
            if (currentPage < totalPages - 2) {
                range.push('...');
            }
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Course Approval Dashboard | Staff Admin Panel</title>
                <meta name="description" content="Admin dashboard for approving new course upload requests" />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Danh sách phê duyệt khóa học</h1>
                    <p className="mt-2 text-sm text-gray-600">Kiểm duyệt khóa học</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left panel - Course List */}
                    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow">
                        {/* Search and filters */}
                        <div className="p-4 border-b">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-grow">
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search size={16} className="text-gray-400" />
                                        </div>
                                        <Input
                                            placeholder="Tìm kiếm tên khóa học, giảng viên..."
                                            className="pl-10"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Sort/Filter dropdown menu */}
                                <Filter
                                    sortOption={sortOption}
                                    status={status}
                                    handleStatusChange={handleStatusChange}
                                    setSortOption={setSortOption}
                                />
                            </div>

                            {/* Status tabs */}
                            <Tabs value={status} onValueChange={handleStatusChange} className="mt-4">
                                <TabsList className="grid grid-cols-4">
                                    <TabsTrigger value="pending">Hàng chờ</TabsTrigger>
                                    <TabsTrigger value="approved">Đã phê duyệt</TabsTrigger>
                                    <TabsTrigger value="rejected">Đã từ chối</TabsTrigger>
                                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Course list with lazy loading */}
                        <div className="overflow-hidden">
                            {isLoading ? (
                                <div className="flex justify-center items-center p-12">
                                    <Loader className="animate-spin h-8 w-8 text-blue-500" />
                                </div>
                            ) : courses.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Không tìm thấy khóa học nào được upload</p>
                                </div>
                            ) : (
                                <ApprovalCourses
                                    courses={courses}
                                    selectedCourse={selectedCourse}
                                    handleCourseSelect={handleCourseSelect}
                                    handleApprove={handleApprove}
                                    handleReject={handleReject}
                                />
                            )}

                            {/* Pagination controls */}
                            <Pagination
                                pagination={pagination}
                                handlePageChange={handlePageChange}
                                paginationRange={getPaginationRange()}
                                page={page}
                                courses={courses}
                            />
                        </div>
                    </div>

                    {/* Right panel - Course Details Small */}
                    <RightPanel
                        selectedCourse={selectedCourse}
                        handleApprove={handleApprove}
                        handleReject={handleReject}
                        setIsPreviewOpen={setIsPreviewOpen}
                    />
                </div>
            </div>

            {/* Course Detail Preview Dialog */}
            <CourseDetailsPreview
                courseId={selectedCourse?.id || null}
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
            />
        </div>
    );
}