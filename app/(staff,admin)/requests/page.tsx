"use client";
import { useState, useEffect } from "react";
import DashboardStats from "@/components/staff/ui/DashBoardStats";
import CourseRequestCard from "@/components/staff/ui/CourseRequestCard";
import FilterTabs from "@/components/staff/ui/FilterTabs";
import SearchFilter from "@/components/staff/ui/SearchFilter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Check, Loader, Search, SortAsc, SortDesc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaginationLayout from "@/components/staff/ui/Pagination";
import CourseDetailsPreview from "@/components/staff/ui/DetailCoursePreview";
import RightCourseDetail from "@/components/staff/ui/RightCourseDetail";
import {
  getStatusCourse,
  searchCoursesDetail,
  updateStatusCourse,
} from "@/services/courseService";
import { CourseSearchRequest, CourseStatusCountDto } from "@/types/course";
import { PaginatedResponse } from "@/types/api-response";
import { CourseDetailsResponse } from "@/types/course";
import { set } from "date-fns";
import RejectCourseDialog from "@/components/staff/ui/RejectCourse";
import { getCurrentUser } from "@/services/authService";
import { NotificationType } from "@/types/notification-type";
import { createNotification } from "@/services/notificationService";

const CourseApprovalPage = () => {
  const { toast } = useToast();

  const [slugOpen, setSlugOpen] = useState<string | null>(null);
  const [nameOpen, setNameOpen] = useState<string | null>(null);
  const [idOpen, setIdOpen] = useState<string | null>(null);
  const [recipid, setRecipid] = useState<string | null>(null);

  const [isDialogOpenReject, setIsDialogOpenReject] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(0); // API uses 0-based pagination
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [previewCourseId, setPreviewCourseId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [coursesCount, setCoursesCount] = useState<CourseStatusCountDto | null>(
    null
  );
  const [total, setTotal] = useState(0);

  const [courseData, setCourseData] =
    useState<PaginatedResponse<CourseDetailsResponse> | null>(null);

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
      const result = await searchCoursesDetail(
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
    //delay 100ms
    //only delay 100ms with code below
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  // Effect to fetch course counts for stats
  const fetchCoursesCount = async () => {
    setIsLoading(true);
    const data = await getStatusCourse();
    setCoursesCount(data);
    if (data) {
      setTotal(data.totalPending + data.totalPublished + data.totalRejected);
    }
    setIsLoading(false);
  };
  // Effect to fetch courses when filters change
  useEffect(() => {
    fetchCoursesCount();
    fetchCourses();
  }, [filter, searchTerm, category, sortDirection, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [filter, searchTerm, category, sortDirection]);

  // Calculate counts for stats and filters

  const handleApprove = async (slug: string) => {
    setIsLoading(true);

    const check = await updateStatusCourse({
      slug: slug,
      status: "PUBLISHED",
    });

    if (check) {
      toast({
        title: "Khóa học đã được xuất bản",
        description: `Khóa học #${slug} đã được xuất bản thành công.`,
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi xuất bản khóa học #${slug}. Vui lòng thử lại.`,
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
    await fetchCoursesCount();
    // Refresh data after action
    await fetchCourses();
  };

  const handleReject = async (slug: string, comment: string, name: string, id: string, recipid: string) => {
    setIsLoading(true);

    const check = await updateStatusCourse({
      slug: slug,
      status: "REJECTED",
    });

    if (check) {
      toast({
        title: "Khóa học đã bị từ chối",
        description: `Khóa học #${slug} đã bị từ chối.`,
        className: "bg-green-500 text-white",
      });

      const notificationData = {
        title: `Khóa học "${name}" của bạn đã bị từ chối`,
        content: `Lí do: ${comment}`,
        targetUrl: `/instructor/courses/${id}/content`,
        userId: recipid,
        type: NotificationType.COURSE_APPROVAL,
      };

      createNotification(notificationData);
    } else {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi Từ chôi khóa học #${slug}. Vui lòng thử lại.`,
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
    await fetchCoursesCount();
    // Refresh data after action
    await fetchCourses();
  };

  const openRejectDialog = (slug: string, name: string, id: string, recipid: string) => {
    setSlugOpen(slug);
    setNameOpen(name);
    setIdOpen(id);
    setRecipid(recipid);
    setIsDialogOpenReject(true);
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
  };

  // Map API data to UI format
  const mappedCourses: CourseDetailsResponse[] =
    courseData?.content.map((course) => ({
      ...course,
    })) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-8 py-8">
        <RejectCourseDialog
          slug={slugOpen || ""}
          handleSubmitReject={handleReject}
          setDialogOpen={setIsDialogOpenReject}
          isDialogOpen={isDialogOpenReject}
          nameg={nameOpen || ""}
          id={idOpen || ""}
          recipid={recipid || ""}
        />

        <div className="space-y-8 max-w-7xl mx-auto">
          <DashboardStats
            totalRequests={total}
            pendingRequests={coursesCount?.totalPending || 0}
            approvedRequests={coursesCount?.totalPublished || 0}
            rejectedRequests={coursesCount?.totalRejected || 0}
          />

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Yêu Cầu Khóa Học</h2>
              <div className="w-full md:w-auto">
                <FilterTabs
                  filter={filter}
                  onFilterChange={setFilter}
                  counts={{
                    all: total,
                    pending: coursesCount?.totalPending || 0,
                    approved: coursesCount?.totalPublished || 0,
                    rejected: coursesCount?.totalRejected || 0,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
              <div className="flex-1">
                <SearchFilter
                  onSearchChange={setSearchTerm}
                  onCategoryChange={setCategory}
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
                    {sortDirection === "desc" ? (
                      <Check size={18} className="ml-3" />
                    ) : null}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortDirection("asc")}>
                    <SortAsc className="h-4 w-4 mr-2" /> Cũ nhất trước
                    {sortDirection === "asc" ? (
                      <Check size={18} className="ml-3" />
                    ) : null}
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
                                courseDto={course}
                                onApprove={handleApprove}
                                onReject={openRejectDialog}
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
                  onReject={openRejectDialog}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <CourseDetailsPreview
        courseDetails={
          mappedCourses.find((course) => course.id === previewCourseId) || null
        }
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onLessonClick={(lessonId) => {
          // Handle lesson click here, e.g., navigate to lesson details
          console.log(`Lesson clicked: ${lessonId}`);
        }}
      />
    </div>
  );
};

export default CourseApprovalPage;
