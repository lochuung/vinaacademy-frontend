import { Course } from "@/types/new-course";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

type ApprovalCourseProps = {
    courses: Course[];
    selectedCourse: Course | null;
    handleCourseSelect: (course: Course) => void;
    handleApprove: (courseId: number) => Promise<void>;
    handleReject: (courseId: number) => Promise<void>;
}

const ApprovalCourses = ({ courses, selectedCourse, handleCourseSelect, handleApprove, handleReject }: ApprovalCourseProps) => {
    return (
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
    )
}

export default ApprovalCourses;