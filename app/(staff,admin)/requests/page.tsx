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
import { searchCourses } from "@/services/courseService";
import { CourseSearchRequest, CourseDto } from "@/types/course";
import { PaginatedResponse } from "@/types/api-response";

const CourseApprovalPage = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(0); // API uses 0-based pagination
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [previewCourseId, setPreviewCourseId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [courseData, setCourseData] =
    useState<PaginatedResponse<CourseDto> | null>(null);

  const itemsPerPage = 3;

  // Function to fetch courses with current filters
  const fetchCourses = async () => {
    setIsLoading(true);

    // Map UI filter to API status
    const statusMap: Record<string, string | undefined> = {
      all: undefined,
      pending: "PENDING",
      approved: "PUBLISHED",
      rejected: "REJECTED",
    };

    // Prepare search request
    const searchRequest: CourseSearchRequest = {
      keyword: searchTerm || undefined,
      categorySlug: category !== "all" ? category : undefined,
      status: statusMap[filter] as any,
    };

    try {
      const result = await searchCourses(
        searchRequest,
        currentPage,
        itemsPerPage,
        "createdDate",
        sortDirection
      );

      setCourseData(result);
      // Select first course by default if available
      if (result?.content.length && !selectedCourseId) {
        setSelectedCourseId(result.content[0].id);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Lỗi tải dữ liệu",
        description: "Không thể tải danh sách khóa học. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch courses when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500); // Debounce API calls

    return () => clearTimeout(timer);
  }, [filter, searchTerm, category, sortDirection, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [filter, searchTerm, category, sortDirection]);

  // Calculate counts for stats and filters
  const counts = {
    all: courseData?.totalElements || 0,
    pending:
      courseData?.content.filter((course) => course.status === "PENDING")
        .length || 0,
    approved:
      courseData?.content.filter((course) => course.status === "PUBLISHED")
        .length || 0,
    rejected:
      courseData?.content.filter((course) => course.status === "REJECTED")
        .length || 0,
  };

  const handleApprove = async (id: string) => {
    setIsLoading(true);

    // Here you would make an API call to update the course status
    // For example: await updateCourseStatus(id, "PUBLISHED");

    toast({
      title: "Khóa học đã được xuất bản",
      description: `Khóa học #${id} đã được xuất bản thành công.`,
    });

    // Refresh data after action
    await fetchCourses();
  };

  const handleReject = async (id: string) => {
    setIsLoading(true);

    // Here you would make an API call to update the course status
    // For example: await updateCourseStatus(id, "REJECTED");

    toast({
      title: "Khóa học đã bị từ chối",
      description: `Khóa học #${id} đã bị từ chối.`,
    });

    // Refresh data after action
    await fetchCourses();
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
    // Convert from 1-based UI pagination to 0-based API pagination
    setCurrentPage(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map API data to UI format
  const mappedCourses =
    courseData?.content.map((course) => ({
      id: course.id,
      title: course.name,
      instructor: course.createdBy || "Không xác định",
      category: course.categoryName,
      createdAt: course.createdDate,
      status:
        course.status.toLowerCase() === "published"
          ? "approved"
          : course.status.toLowerCase(),
      level: course.level,
      image: course.image,
      description: course.description,
      price: course.price,
      rating: course.rating,
      totalStudent: course.totalStudent,
      slug: course.slug,
    })) || [];

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
                  onDepartmentChange={setCategory}
                  oldValue={searchTerm}
                />
              </div>
              <DropdownMenu>
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
                    {mappedCourses.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {mappedCourses.map((course) => (
                            <div
                              key={course.id}
                              className={`border rounded-lg p-4 hover:bg-accent/10 transition-colors cursor-pointer ${
                                selectedCourseId === course.id
                                  ? "border-primary"
                                  : ""
                              }`}
                              onClick={() => handleViewDetails(course.id)}
                            >
                              <CourseRequestCard
                                {...course}
                                // Format date properly
                                createdAt={format(
                                  new Date(course.createdAt),
                                  "dd/MM/yyyy"
                                )}
                                department={course.category} // Map category to department prop
                                onApprove={handleApprove}
                                onReject={handleReject}
                                onViewDetails={() =>
                                  handleViewDetails(course.id)
                                }
                              />
                            </div>
                          ))}
                        </div>

                        {(courseData?.totalPages || 0) > 1 && (
                          <PaginationLayout
                            currentPage={currentPage + 1} // Convert back to 1-based for UI
                            totalPages={courseData?.totalPages || 1}
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
                            setCategory("all");
                          }}
                        >
                          Xóa bộ lọc
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="md:col-span-7">
                <RightCourseDetail
                  selectedCourseId={selectedCourseId}
                  courseRequests={mappedCourses}
                  onPreview={handlePreview}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  statusLabels={{
                    approved: "Đã xuất bản", // Updated from "approved" to "published" in Vietnamese
                    pending: "Chờ duyệt",
                    rejected: "Từ chối",
                  }}
                  actionLabels={{
                    approve: "Xuất bản", // Updated from "approve" to "publish" in Vietnamese
                    reject: "Từ chối",
                  }}
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
