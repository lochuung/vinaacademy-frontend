"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Book, Users, FileText, PlayCircle, ChevronDown, ChevronUp} from "lucide-react";
import {useState} from "react";
import {Avatar} from "@/components/ui/avatar";

interface Section {
    id: number;
    name: string;
    order: number;
}

interface Instructor {
    id: number;
    name: string;
    email: string;
    isOwner: boolean;
    avatarUrl?: string;
}

interface CourseDetailsProps {
    course: {
        name: string;
        sections: Section[];
        totalSection: number;
        totalLesson: number;
        instructors: Instructor[];
        description: string;
    };
}

export default function CourseDetails({course}: CourseDetailsProps) {
    return (
        <section className="bg-white border rounded-lg p-6 mb-8">
            <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6" role="tablist" aria-label="Thông tin khóa học">
                    <TabsTrigger value="curriculum">
                        <Book className="h-4 w-4 mr-2" aria-hidden="true"/> Nội dung
                    </TabsTrigger>
                    <TabsTrigger value="overview">
                        <FileText className="h-4 w-4 mr-2" aria-hidden="true"/> Tổng quan
                    </TabsTrigger>
                    <TabsTrigger value="instructors">
                        <Users className="h-4 w-4 mr-2" aria-hidden="true"/> Giảng viên
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="space-y-4" role="tabpanel" aria-labelledby="curriculum">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Nội dung khóa học</h2>
                        <div className="flex items-center text-sm text-gray-600">
                            <span>{course.totalSection} chương</span>
                            <span className="mx-2">•</span>
                            <span>{course.totalLesson} bài học</span>
                        </div>
                    </div>

                    <CourseCurriculum sections={course.sections}/>
                </TabsContent>

                <TabsContent value="overview" role="tabpanel" aria-labelledby="overview">
                    <div className="prose max-w-none">
                        <h2 className="text-xl font-bold mb-4">Mô tả khóa học</h2>
                        <div className="whitespace-pre-wrap">{course.description}</div>

                        <h2 className="text-xl font-bold mt-8 mb-4">Bạn sẽ học được gì</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Hiểu và áp dụng các khái niệm cơ bản của Java</li>
                            <li>Xây dựng các ứng dụng Java đơn giản</li>
                            <li>Làm việc với dữ liệu và cấu trúc điều khiển</li>
                            <li>Hiểu về lập trình hướng đối tượng trong Java</li>
                        </ul>
                    </div>
                </TabsContent>

                <TabsContent value="instructors" role="tabpanel" aria-labelledby="instructors">
                    <h2 className="text-xl font-bold mb-6">Giảng viên</h2>

                    <div className="space-y-8">
                        {course.instructors.map((instructor) => (
                            <div key={instructor.id} className="flex flex-col md:flex-row gap-4">
                                <Avatar
                                    src={instructor.avatarUrl || '/images/default-avatar.png'}
                                    alt={`Ảnh giảng viên ${instructor.name}`}
                                    size={96}
                                    className="w-24 h-24"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{instructor.name}</h3>
                                    <p className="text-gray-600 mb-2">{instructor.isOwner ? 'Giảng viên chính' : 'Trợ giảng'}</p>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Giảng viên với hơn 5 năm kinh nghiệm trong lĩnh vực lập trình Java và phát triển
                                        phần mềm.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}

function CourseCurriculum({sections}: { sections: Section[] }) {
    const [expandedSections, setExpandedSections] = useState<number[]>([sections[0]?.id]);

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    return (
        <div className="space-y-3">
            {sections.map((section) => (
                <div key={section.id} className="border rounded-lg overflow-hidden">
                    <button
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        onClick={() => toggleSection(section.id)}
                    >
                        <div className="flex items-center">
                            <span className="font-medium">{section.order}. {section.name}</span>
                        </div>
                        {expandedSections.includes(section.id) ? (
                            <ChevronUp className="h-5 w-5"/>
                        ) : (
                            <ChevronDown className="h-5 w-5"/>
                        )}
                    </button>

                    {expandedSections.includes(section.id) && (
                        <div className="p-4 border-t">
                            {/* Sample lessons - in a real app, these would come from the API */}
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="flex items-center py-3 border-b last:border-b-0">
                                    <PlayCircle className="h-5 w-5 mr-3 text-gray-600"/>
                                    <span>Bài {num}: Nội dung bài học</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
