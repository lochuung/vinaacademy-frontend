"use client";

import { use, useEffect, useState } from "react";
import CourseGridView from "@/components/instructor/courses/CourseGridView";
import CourseListView from "@/components/instructor/courses/CourseListView";
import SearchAndFilterBar from "@/components/instructor/courses/SearchAndFilterBar";
import { Spinner } from "@/components/common/pinner";
import { useAuth } from "@/context/AuthContext";
import Pagination from "@/components/common/Paginator";
import { useRouter } from "next/navigation";
import { createSuccessToast } from "@/components/ui/toast-cus";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";



export default function InstructorCoursesPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    courses,
    pagination,
    loading,
    error,
    page,
    handlePageChange,
    refreshCourses
  } = useInstructorCourses();

  // Kiểm tra nếu user có role là instructor
  useEffect(() => {
    if (isAuthenticated && user && !user.roles.some(role => role.code === "INSTRUCTOR")) {
      router.push("/instructor/courses");
    }
  }, [isAuthenticated, user, router]);

  // Kiểm tra thông báo tạo khóa học thành công
  useEffect(() => {
    const toastData = sessionStorage.getItem("createdCourse");
    if (toastData) {
      const { title, id } = JSON.parse(toastData);
      sessionStorage.removeItem("createdCourse");

      createSuccessToast(`Khóa học "${title}" đã được tạo thành công.`);

      // Làm mới danh sách khóa học
      refreshCourses();
    }
  }, [refreshCourses]);

  // Lọc khóa học theo từ khóa tìm kiếm
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Vui lòng đăng nhập để tiếp tục.</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Khóa học của tôi
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <SearchAndFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-700">
              {error}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-md text-center">
              <p className="text-gray-600 mb-4">Bạn chưa có khóa học nào.</p>
              <button
                onClick={() => router.push("/instructor/courses/new")}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Tạo khóa học mới
              </button>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? ( 
                <CourseGridView courses={filteredCourses} />
              ) : (
                <CourseListView courses={filteredCourses} />
              )}

              {/* Phân trang */}
              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}