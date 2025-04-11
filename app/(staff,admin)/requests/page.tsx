// pages/admin/course-approvals.tsx
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
    Search, Check, X, Eye, ChevronLeft, ChevronRight,
    Loader, ArrowUpDown, Calendar} from 'lucide-react';
import { useDebounce } from 'use-debounce';
import CourseDetailsPreview from '@/components/staff/DetailCourse';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define TypeScript interfaces
enum CourseLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
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

interface CoursesResponse {
    courses: Course[];
    pagination: PaginationData;
}

// Sort types
type SortOption = 'newest' | 'oldest' | 'normal';

// Mock API call to fetch courses
const fetchCourses = async (
    page: number = 1,
    status: string = 'pending',
    searchTerm: string = '',
    sortBy: SortOption = 'normal'
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
    const [status, setStatus] = useState<string>('pending');
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
    const [sortOption, setSortOption] = useState<SortOption>('normal');
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

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            <ArrowUpDown className="mr-2 h-4 w-4" />
                                            Bộ lọc
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => handleStatusChange('all')}>
                                                <span className="flex justify-between items-center w-full">
                                                    Tất cả
                                                    <div className="">
                                                        {status == "all" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>

                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                                                <span className="flex justify-between items-center w-full">
                                                    Hàng chờ
                                                    <div className="">
                                                        {status == "pending" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange('approved')}>
                                                <span className="flex justify-between items-center w-full">
                                                    Đã duyệt
                                                    <div className="">
                                                        {status == "approved" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange('rejected')}>
                                                <span className="flex justify-between items-center w-full">
                                                    Đã từ chối
                                                    <div className="">
                                                        {status == "rejected" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Xếp theo ngày</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => setSortOption('normal')}>
                                                <Calendar className="mr-2 h-4 w-4" />
                                                <span className="flex justify-between items-center w-full">
                                                    Bình thường
                                                    <div className="">
                                                        {sortOption == "normal" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSortOption('newest')}>
                                                <Calendar className="mr-2 h-4 w-4" />
                                                <span className="flex justify-between items-center w-full">
                                                    Mới nhất
                                                    <div className="">
                                                        {sortOption == "newest" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSortOption('oldest')}>
                                                <Calendar className="mr-2 h-4 w-4" />
                                                <span className="flex justify-between items-center w-full">
                                                    Cũ nhất
                                                    <div className="">
                                                        {sortOption == "oldest" ? <Check size={16} /> : null}
                                                    </div>
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
                                <ul className="divide-y divide-gray-200">
                                    {courses.map((course) => (
                                        <li
                                            key={course.id}
                                            className={`px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedCourse?.id === course.id ? 'bg-blue-50' : ''}`}
                                            onClick={() => handleCourseSelect(course)}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0 h-12 w-12 relative rounded overflow-hidden">
                                                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">IMG</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                                                    <p className="text-sm text-gray-500">{course.instructor}</p>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                                        <p className="text-xs text-gray-400">{course.department}</p>
                                                        <span className="text-xs text-gray-300">•</span>
                                                        <p className="text-xs text-gray-400">Submitted {new Date(course.submittedDate).toLocaleDateString()}</p>
                                                        <Badge variant="outline" className="text-xs h-5 bg-gray-300">
                                                            {course.level}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 flex items-center space-x-2">
                                                    {course.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleApprove(course.id);
                                                                }}
                                                            >
                                                                <Check size={16} />
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleReject(course.id);
                                                                }}
                                                            >
                                                                <X size={16} />
                                                            </Button>
                                                        </>
                                                    )}

                                                    {course.status === 'approved' && (
                                                        <Badge variant="secondary" className='bg-green-400 hover:bg-green-300'>Đã duyệt</Badge>
                                                    )}

                                                    {course.status === 'rejected' && (
                                                        <Badge variant="destructive">Đã từ chối</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Pagination controls */}
                            <div className="px-4 py-4 flex items-center justify-between border-t border-gray-200">
                                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                    <p className="text-sm text-gray-700">
                                        Đang hiển thị từ <span className="font-medium">{courses.length ? (page - 1) * 5 + 1 : 0}</span> đến{' '}
                                        <span className="font-medium">{Math.min(page * 5, pagination.totalItems)}</span> trong{' '}
                                        <span className="font-medium">{pagination.totalItems}</span> kết quả
                                    </p>
                                    <div className="flex space-x-1">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1 || isLoading}
                                            className="h-8 w-8"
                                        >
                                            <ChevronLeft size={16} />
                                        </Button>

                                        {getPaginationRange().map((pageNum, i) =>
                                            pageNum === '...' ? (
                                                <span key={`ellipsis-${i}`} className="flex items-center justify-center h-8 w-8">
                                                    ...
                                                </span>
                                            ) : (
                                                <Button
                                                    key={`page-${pageNum}`}
                                                    variant={page === pageNum ? "default" : "outline"}
                                                    size="icon"
                                                    onClick={() => handlePageChange(Number(pageNum))}
                                                    className="h-8 w-8"
                                                >
                                                    {pageNum}
                                                </Button>
                                            )
                                        )}

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page >= pagination.totalPages || isLoading}
                                            className="h-8 w-8"
                                        >
                                            <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right panel - Course Details */}
                    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow">
                        {selectedCourse ? (
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedCourse.title}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Giảng viên</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCourse.instructor}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Danh mục</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCourse.department}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                                        <p className="mt-1 text-sm text-gray-900">{new Date(selectedCourse.submittedDate).toLocaleDateString()}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Trạng thái</h3>
                                        <div className="mt-1">
                                            {selectedCourse.status === 'pending' && (
                                                <Badge variant="outline" className="bg-yellow-300 text-yellow-800 hover:bg-yellow-300/40">
                                                    Hàng chờ
                                                </Badge>
                                            )}
                                            {selectedCourse.status === 'approved' && (
                                                <Badge variant="outline" className="bg-green-400/60 text-green-800 hover:bg-green-300/50">
                                                    Đã duyệt
                                                </Badge>
                                            )}
                                            {selectedCourse.status === 'rejected' && (
                                                <Badge variant="outline" className="bg-red-400/70 text-red-800 hover:bg-red-400/50">
                                                    Đã từ chối
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Level</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCourse.level}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Slug</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCourse.slug}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Actions</h3>

                                    <div className="space-y-2">
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            onClick={() => setIsPreviewOpen(true)}
                                        >
                                            <Eye size={16} className="mr-2" />
                                            Xem chi tiết thông tin khóa học này
                                        </Button>

                                        {selectedCourse.status === 'pending' && (
                                            <>
                                                <Button
                                                    className="w-full bg-green-500"
                                                    variant="default"
                                                    onClick={() => handleApprove(selectedCourse.id)}
                                                >
                                                    <Check size={16} className="mr-2" />
                                                    Duyệt khóa học
                                                </Button>

                                                <Button
                                                    className="w-full"
                                                    variant="destructive"
                                                    onClick={() => handleReject(selectedCourse.id)}
                                                >
                                                    <X size={16} className="mr-2" />
                                                    Từ chối khóa học
                                                </Button>
                                            </>
                                        )}

                                        {selectedCourse.status === 'approved' && (
                                            <Button
                                                className="w-full bg-red-600/70 hover:bg-red-500 text-white hover:text-white"
                                                variant="outline"
                                                onClick={() => handleReject(selectedCourse.id)}
                                            >
                                                <X size={16} className="mr-2 " />
                                                Từ chối khoá học
                                            </Button>
                                        )}

                                        {selectedCourse.status === 'rejected' && (
                                            <Button
                                                className="w-full bg-green-500/70 hover:bg-green-400/70 text-white hover:text-white"
                                                variant="outline"
                                                onClick={() => handleApprove(selectedCourse.id)}
                                            >
                                                <Check size={16} className="mr-2" />
                                                Duyệt khóa học
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center p-6 text-center">
                                <div className="max-w-md">
                                    <h3 className="text-lg font-medium text-gray-900">Chưa chọn khóa học nào</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Chọn một khóa học trong danh sách để xem thông tin chi tiết
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
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