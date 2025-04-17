"use client";
import { useState, useEffect } from "react";
import DashboardStats from "@/components/staff/ui/DashBoardStats";
import CourseRequestCard from "@/components/staff/ui/CourseRequestCard";
import FilterTabs from "@/components/staff/ui/FilterTabs";
import SearchFilter from "@/components/staff/ui/SearchFilter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader, Search, SortAsc, SortDesc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaginationLayout from "@/components/staff/ui/Pagination";
import CourseDetailsPreview from "@/components/staff/ui/DetailCoursePreview";
import RightCourseDetail from "@/components/staff/ui/RightCourseDetail";

// Mock data for the demo - in a real app this would come from an API
const mockCourseRequests = [
  {
    id: "1",
    title: "Giới Thiệu về Cấu Trúc Dữ Liệu và Giải Thuật",
    instructor: "TS. Lan Nguyễn",
    department: "Khoa học Máy tính",
    createdAt: "2025-04-10",
    status: "pending" as const,
    level: "Cơ bản"
  },
  {
    id: "2",
    title: "Machine Learning Nâng Cao",
    instructor: "GS. Minh Trần",
    department: "Khoa học Máy tính",
    createdAt: "2025-04-08",
    status: "approved" as const,
    level: "Nâng cao"
  },
  {
    id: "3",
    title: "Vật Lý Lượng Tử",
    instructor: "TS. Hùng Trần",
    department: "Vật lý",
    createdAt: "2025-04-12",
    status: "rejected" as const,
    level: "Nâng cao"
  },
  {
    id: "4",
    title: "Sinh Học Tế Bào",
    instructor: "TS. Mai Lê",
    department: "Sinh học",
    createdAt: "2025-04-05",
    status: "pending" as const,
    level: "Cơ bản"
  },
  {
    id: "5",
    title: "Đại Số Tuyến Tính",
    instructor: "GS. Hải Phạm",
    department: "Toán học",
    createdAt: "2025-04-09",
    status: "approved" as const,
    level: "Cơ bản"
  },
  {
    id: "6",
    title: "Hóa Học Hữu Cơ",
    instructor: "TS. Linh Hoàng",
    department: "Hóa học",
    createdAt: "2025-04-11",
    status: "pending" as const,
    level: "Nâng cao"
  },
  {
    id: "7",
    title: "Lịch Sử Thế Giới",
    instructor: "TS. Thảo Vũ",
    department: "Lịch sử",
    createdAt: "2025-04-03",
    status: "pending" as const,
    level: "Cơ bản"
  },
  {
    id: "8",
    title: "Nhập Môn Triết Học",
    instructor: "GS. Tuấn Nguyễn",
    department: "Triết học",
    createdAt: "2025-04-02",
    status: "approved" as const,
    level: "Trung cấp"
  },
  {
    id: "9",
    title: "Kế Toán Tài Chính",
    instructor: "TS. Hương Trần",
    department: "Kinh doanh",
    createdAt: "2025-04-15",
    status: "pending" as const,
    level: "Cơ bản"
  },
  {
    id: "10",
    title: "Chiến Lược Marketing",
    instructor: "GS. Đức Lê",
    department: "Kinh doanh",
    createdAt: "2025-04-14",
    status: "rejected" as const,
    level: "Trung cấp"
  },
  {
    id: "11",
    title: "Văn Học Anh",
    instructor: "TS. Quỳnh Lê",
    department: "Ngôn ngữ",
    createdAt: "2025-04-01",
    status: "approved" as const,
    level: "Trung cấp"
  },
  {
    id: "12",
    title: "Giải Tích II",
    instructor: "GS. Phương Đỗ",
    department: "Toán học",
    createdAt: "2025-04-07",
    status: "pending" as const,
    level: "Nâng cao"
  },
  {
    id: "13",
    title: "Giải Tích III",
    instructor: "GS. Phương Đỗ",
    department: "Toán học",
    createdAt: "2025-04-07",
    status: "pending" as const,
    level: "Nâng cao"
  },
];

const CourseApprovalPage = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [previewCourseId, setPreviewCourseId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const itemsPerPage = 3;

  // Apply filters, sorting and search
  const filteredRequests = [...mockCourseRequests]
    .filter((request) => {
      const matchesFilter = filter === "all" || request.status === filter;
      const matchesSearch =
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        department === "all" ||
        request.department.toLowerCase().replace(/\s+/g, "-") === department;
      return matchesFilter && matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Calculate pagination
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredRequests.slice(startIndex, endIndex);

  // Calculate counts for stats and filters
  const counts = {
    all: mockCourseRequests.length,
    pending: mockCourseRequests.filter((req) => req.status === "pending")
      .length,
    approved: mockCourseRequests.filter((req) => req.status === "approved")
      .length,
    rejected: mockCourseRequests.filter((req) => req.status === "rejected")
      .length,
  };

  const handleApprove = (id: string) => {
    toast({
      title: "Khóa học đã được phê duyệt",
      description: `Yêu cầu khóa học #${id} đã được phê duyệt.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Khóa học đã bị từ chối",
      description: `Yêu cầu khóa học #${id} đã bị từ chối.`,
    });
  };

  const handleViewDetails = (id: string) => {
    setSelectedCourseId(id);
  };

  const handlePreview = (id: string) => {
    setPreviewCourseId(id);
    setIsPreviewOpen(true);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 300);
  };

  // Simulate loading effect when filter changes
  useEffect(() => {
    setIsLoading(true);
    // Reset to first page when filters change
    setCurrentPage(1);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter, searchTerm, department, sortDirection]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-8 py-8">
        <div className="space-y-8 max-w-7xl mx-auto">
          <DashboardStats
            totalRequests={counts.all}
            pendingRequests={counts.pending}
            approvedRequests={counts.approved}
            rejectedRequests={counts.rejected}
          />

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Yêu Cầu Khóa Học</h2>
              <div className="w-full md:w-auto">
                <FilterTabs
                  filter={filter}
                  onFilterChange={setFilter}
                  counts={counts}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
              <div className="flex-1">
                <SearchFilter
                  onSearchChange={setSearchTerm}
                  onDepartmentChange={setDepartment}
                  oldValue={searchTerm}
                />
              </div>
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-3 h-9 text-sm"
                  >
                    Sắp xếp theo ngày
                    {sortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => setSortDirection("desc")}>
                    <SortDesc className="h-4 w-4 mr-2" /> Mới nhất trước
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortDirection("asc")}>
                    <SortAsc className="h-4 w-4 mr-2" /> Cũ nhất trước
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
              <div className="md:col-span-5 space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div>
                    {currentItems.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {currentItems.map((request) => (
                            <div
                              key={request.id}
                              className={`border rounded-lg p-4 hover:bg-accent/10 transition-colors cursor-pointer ${
                                selectedCourseId === request.id
                                  ? "border-primary"
                                  : ""
                              }`}
                              onClick={() => handleViewDetails(request.id)}
                            >
                              <CourseRequestCard
                                {...request}
                                createdAt={format(
                                  new Date(request.createdAt),
                                  "dd/MM/yyyy"
                                )}
                                
                                onApprove={handleApprove}
                                onReject={handleReject}
                                onViewDetails={() =>
                                  handleViewDetails(request.id)
                                }
                              />
                            </div>
                          ))}
                        </div>

                        {totalPages > 1 && (
                          <PaginationLayout
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="mb-4 rounded-full bg-accent p-3">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">
                          Không tìm thấy yêu cầu khóa học nào
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">
                          Không có yêu cầu nào phù hợp với bộ lọc hiện tại.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setFilter("all");
                            setSearchTerm("");
                            setDepartment("all");
                          }}
                        >
                          Xóa bộ lọc
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Course details column - now using the CourseDetail component */}
              <div className="md:col-span-7">
                <RightCourseDetail
                  selectedCourseId={selectedCourseId}
                  courseRequests={currentItems}
                  onPreview={handlePreview}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <CourseDetailsPreview
        courseId={previewCourseId}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default CourseApprovalPage;
