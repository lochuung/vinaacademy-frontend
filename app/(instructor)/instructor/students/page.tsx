"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { CoursesPagination } from "@/components/courses/all-courses/CoursesPagination";
import { getInstructorCourses } from "@/services/courseService";
import {
    StudentProgressDto,
    getStudentsProgress,
    getStatusFromDisplayText
} from "@/services/studentProgressService";
import toast from "react-hot-toast";

export default function InstructorStudentsPage() {
    // State cho dữ liệu học viên và phân trang
    const [students, setStudents] = useState<StudentProgressDto[]>([]);
    const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State cho các tham số lọc
    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState<string>("Tất cả");
    const [progressFilter, setProgressFilter] = useState<string>("Tất cả");

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // State để tạm lưu các lọc hiện tại trước khi gọi API
    const [courseId, setCourseId] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<'IN_PROGRESS' | 'COMPLETED' | 'DROPPED' | undefined>(undefined);

    // Load danh sách khóa học của instructor
    useEffect(() => {
        async function loadInstructorCourses() {
            try {
                const coursesData = await getInstructorCourses(0, 100); // Lấy tất cả khóa học
                if (coursesData && coursesData.content) {
                    const coursesList = coursesData.content.map(course => ({
                        id: course.id,
                        name: course.name
                    }));
                    setCourses(coursesList);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách khóa học:", err);
                setError("Không thể tải danh sách khóa học");
            }
        }

        loadInstructorCourses();
    }, []);

    // Load danh sách học viên với các tham số
    useEffect(() => {
        async function loadStudentsProgress() {
            setLoading(true);
            try {
                // API page bắt đầu từ 0, UI page bắt đầu từ 1
                const apiPage = currentPage - 1;

                const result = await getStudentsProgress(
                    apiPage,
                    pageSize,
                    courseId,
                    search.trim() || undefined,
                    status,
                    'startAt',
                    'desc'
                );

                if (result) {
                    setStudents(result.content);
                    setTotalPages(result.totalPages);
                    setTotalItems(result.totalElements);
                } else {
                    setStudents([]);
                    setTotalPages(1);
                    setTotalItems(0);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách học viên:", err);
                setError("Không thể tải danh sách học viên");
                toast.error("Không thể tải danh sách học viên");
            } finally {
                setLoading(false);
            }
        }

        loadStudentsProgress();
    }, [currentPage, pageSize, courseId, status, search]);

    // Khi người dùng chọn một khóa học từ dropdown
    const handleCourseFilterChange = (selectedCourseName: string) => {
        setCourseFilter(selectedCourseName);

        if (selectedCourseName === "Tất cả") {
            setSearch(""); // Xóa tìm kiếm nếu chọn "Tất cả"
        } else {
            setSearch(selectedCourseName); // Đặt tên khóa học làm từ khóa tìm kiếm
        }

        setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
    };

    // Xử lý khi người dùng thay đổi bộ lọc trạng thái tiến độ
    const handleProgressFilterChange = (selectedProgressFilter: string) => {
        setProgressFilter(selectedProgressFilter);
        setStatus(getStatusFromDisplayText(selectedProgressFilter));
        setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
    };

    // Xử lý khi người dùng thay đổi tìm kiếm
    const handleSearchChange = (value: string) => {
        setSearch(value);
        // Không gọi API ngay lập tức mà đợi người dùng ngừng gõ
        // API sẽ được gọi ở useEffect dựa trên thay đổi của search
    };

    // Xử lý chuyển trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quản lý học viên</h1>
                    <p className="text-gray-600 mt-1">Xem tiến độ học tập của học viên trong các khóa học của bạn.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên, email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Bộ lọc nâng cao */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div>
                    <label className="mr-2 font-medium">Khóa học:</label>
                    <select
                        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        value={courseFilter}
                        onChange={(e) => handleCourseFilterChange(e.target.value)}
                    >
                        <option value="Tất cả">Tất cả</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.name}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2 font-medium">Tiến độ:</label>
                    <select
                        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        value={progressFilter}
                        onChange={(e) => handleProgressFilterChange(e.target.value)}
                    >
                        <option value="Tất cả">Tất cả</option>
                        <option value="Đã hoàn thành">Đã hoàn thành</option>
                        <option value="Đang học">Đang học</option>
                        <option value="Chưa bắt đầu">Lâu chưa truy cập</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                            <TableHead className="text-center">Học viên</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Khóa học</TableHead>
                            <TableHead className="text-center">Tiến độ</TableHead>
                            <TableHead className="text-center">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                    Đang tải dữ liệu...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-red-500 py-8">
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : students.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                    Không tìm thấy học viên nào.
                                </TableCell>
                            </TableRow>
                        ) : (
                            students.map((student) => (
                                <TableRow
                                    key={`${student.studentId}-${student.courseId}`}
                                    className="hover:bg-blue-50 transition-colors cursor-pointer"
                                >
                                    <TableCell className="py-4 text-center">
                                        <span className="font-medium">{student.studentName}</span>
                                    </TableCell>
                                    <TableCell className="text-center">{student.studentEmail}</TableCell>
                                    <TableCell className="text-center">{student.courseName}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center gap-2 justify-center">
                                            <Progress value={student.progress} className="w-28 h-2" />
                                            <span className="text-sm font-semibold text-gray-700">{student.progress}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.status === 'COMPLETED' && (
                                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold shadow">Hoàn thành</span>
                                        )}
                                        {student.status === 'IN_PROGRESS' && (
                                            <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold shadow">Đang học</span>
                                        )}
                                        {student.status === 'DROPPED' && (
                                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-semibold shadow">Đã dừng học</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Hiển thị phân trang chỉ khi có dữ liệu */}
            {!loading && !error && students.length > 0 && (
                <div className="mt-4">
                    <CoursesPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    <div className="text-center text-sm text-gray-500 mt-2">
                        Hiển thị {students.length} trong tổng số {totalItems} học viên
                    </div>
                </div>
            )}
        </div>
    );
}