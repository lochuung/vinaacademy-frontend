import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { CourseDetailsResponse, LessonType } from "@/types/course";


// Course details preview dialog component
const CourseDetailsPreview = ({
  courseDetails,
  isOpen,
  onClose,
  onLessonClick,
}: {
  courseDetails: CourseDetailsResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onLessonClick: (lessonId: string, lessonType: LessonType, videoDuration?: number, readingContent?: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogTitle className="sr-only">Chi tiết bài học</DialogTitle>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : courseDetails && courseDetails?.sections ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {courseDetails.name}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Nội dung khóa học</h3>
              <div className="space-y-4">
                {courseDetails.sections.map((section) => (
                  <div
                    key={section.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 p-3 font-medium">
                      {section.orderIndex}. {section.title}
                    </div>
                    <ul className="divide-y">
                      {section.lessons?.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                          onClick={() => onLessonClick(lesson.id, lesson.type, lesson.videoDuration, lesson.content)}
                        >
                          <div className="flex items-center">
                            {lesson.type === "VIDEO" && (
                              <svg
                                className="w-5 h-5 text-blue-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              
                            )}
                            {lesson.type === "READING" && (
                              <svg
                                className="w-5 h-5 text-green-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                ></path>
                              </svg>
                            )}
                            {lesson.type === "QUIZ" && (
                              <svg
                                className="w-5 h-5 text-orange-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            )}
                            <span>
                              {lesson.orderIndex}. {lesson.title}{" "}
                              {lesson.free && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Free
                                </span>
                              )}
                            </span>
                          </div>
                          {lesson.type === "VIDEO" && lesson.videoDuration && (
                            <span className="text-sm text-gray-500">
                            {(lesson.videoDuration/60).toFixed(0)}:
                            {(lesson.videoDuration % 60).toFixed(0)}
                            {" "}
                          </span>
                          )}
                          {lesson.type === "QUIZ" && lesson.duration && (
                            <span className="text-sm text-gray-500">
                              yêu cầu {lesson.passPoint}/{lesson.totalPoint}{" "}
                              điểm -{" "}
                              {(lesson.duration % 60)
                                .toString()
                                .padStart(2, "0")}
                              {" "}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy bài học nào</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsPreview;
