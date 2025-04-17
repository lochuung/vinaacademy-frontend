// CourseDetail.tsx
'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";

interface CourseDetailProps {
  selectedCourseId: string | null;
  courseRequests: {
    id: string;
    title: string;
    instructor: string;
    department: string;
    createdAt: string;
    status: "pending" | "approved" | "rejected";
  }[];
  onPreview: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const RightCourseDetail = ({
  selectedCourseId,
  courseRequests,
  onPreview,
  onApprove,
  onReject,
}: CourseDetailProps) => {
  const selectedCourse = courseRequests.find(
    (item) => item.id === selectedCourseId
  );

  if (!selectedCourseId || !selectedCourse) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-accent/5 h-full">
        <div className="mb-4 rounded-full bg-accent p-3">
          <Eye className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg">
          Chưa chọn khóa học
        </h3>
        <p className="text-center text-muted-foreground mt-2">
          Chọn một yêu cầu khóa học từ danh sách để xem chi tiết
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-accent/5 h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-xl">
          Chi tiết khóa học
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => onPreview(selectedCourseId)}
        >
          <Eye className="h-4 w-4" />
          Xem chi tiết đầy đủ
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {selectedCourse.title}
            </h2>
            <p className="text-muted-foreground mt-1">
              Đã tạo vào ngày{" "}
              {format(
                new Date(selectedCourse.createdAt),
                "dd/MM/yyyy"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">
                Thông tin giảng viên
              </h4>
              <p className="font-medium">
                {selectedCourse.instructor}
              </p>
              <p className="text-sm">
                Khoa: {selectedCourse.department}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">
                Trạng thái yêu cầu
              </h4>
              <div className="space-x-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${
                    selectedCourse.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedCourse.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedCourse.status === "pending"
                    ? "Đang chờ"
                    : selectedCourse.status === "approved"
                    ? "Đã duyệt"
                    : "Đã từ chối"}
                </span>
              </div>

              {selectedCourse.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onReject(selectedCourse.id)}
                  >
                    Từ chối
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => onApprove(selectedCourse.id)}
                  >
                    Phê duyệt
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Giới thiệu</h4>
          <p className="text-muted-foreground">
            Đề xuất khóa học này tập trung vào{" "}
            {selectedCourse.title} và sẽ được giảng dạy
            bởi {selectedCourse.instructor} từ khoa{" "}
            {selectedCourse.department}. Các tài liệu
            khóa học và đề cương đã được nộp để xem xét.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightCourseDetail;