"use client";

import { use, useEffect, useState } from "react";
import CourseGridView from "@/components/instructor/courses/CourseGridView";
import CourseListView from "@/components/instructor/courses/CourseListView";
import SearchAndFilterBar from "@/components/instructor/courses/SearchAndFilterBar";
import { mockCourses } from "@/data/mockInstructorCourse";
import { toast } from "@/hooks/use-toast";

export default function InstructorCoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc khóa học theo từ khóa tìm kiếm
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const toastData = sessionStorage.getItem("createdCourse");
    if (toastData) {
      const { title, id } = JSON.parse(toastData);
      sessionStorage.removeItem("createdCourse");
      console.log("Toast data:", toastData);
      toast({
        title: `Khóa học ${title} đã được tạo thành công.`,
        description: (
          <div>
            {" "}
            Bấm vào đây để chuyển đến trang chỉnh sửa khóa học.
            <br /> Tại đây bạn sẽ điều chỉnh bài học của mình và xuất bản để chờ
            duyệt
          </div>
        ),
        variant: "default",
        className: "bg-green-500 text-white",
        onClick: () => {
          window.location.href = `/instructor/courses/${id}/content`;
        },
      });
    }
  }, []);

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

          {viewMode === "grid" ? (
            <CourseGridView courses={filteredCourses} />
          ) : (
            <CourseListView courses={filteredCourses} />
          )}
        </div>
      </div>
    </div>
  );
}
