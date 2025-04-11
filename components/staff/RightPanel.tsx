import { Check, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

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

enum CourseLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
}

interface RightPanelProps {
    selectedCourse: Course | null;
    setIsPreviewOpen: (isOpen: boolean) => void;
    handleApprove: (courseId: number) => void;
    handleReject: (courseId: number) => void;
}

const RightPanel = ({
    selectedCourse,
    setIsPreviewOpen,
    handleApprove,
    handleReject }: RightPanelProps) => {
    return (
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
    )
}

export default RightPanel;