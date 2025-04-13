'use client';

import { Button } from "@/components/ui/button";
import { CourseDetailsResponse, SectionDto, UserDto } from "@/types/course";
import { Book, Clock, Globe, Play, Share2 } from "lucide-react";
import Image from 'next/image';

interface PurchaseCardProps {
    course: CourseDetailsResponse;
    instructors: UserDto[];
    sections: SectionDto[];
}

export default function PurchaseCard({ course, instructors, sections }: PurchaseCardProps) {
    // Calculate total course duration in seconds
    const totalDuration = course.sections.reduce((total, section) => {
        return total + (section.lessons?.reduce((sectionTotal, lesson) => {
            return sectionTotal + (lesson.videoDuration || 0);
        }, 0) ?? 0);
    }, 0);

    // Format duration to hours and minutes
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours > 0 ? `${hours} giờ ` : ''}${minutes} phút`;
    };

    return (
        <div className="border rounded-lg shadow-lg overflow-hidden">
            {/* Course preview image with play button overlay */}
            <div className="relative">
                <div className="aspect-video w-full relative">
                    <Image
                        src={course.image || "/images/course-placeholder.jpg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                            <Play className="w-8 h-8 text-[#a435f0] ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchase info and action buttons */}
            <div className="p-6">
                <div className="mb-6">
                    <p className="text-2xl font-bold mb-2">{course.price.toLocaleString('vi-VN')}₫</p>
                    <div className="space-y-3 mt-4">
                        <Button variant="default" className="w-full bg-[#a435f0] hover:bg-[#8710d8]">
                            Đăng ký học ngay
                        </Button>
                        <Button variant="outline" className="w-full">
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">Đảm bảo hoàn tiền trong 30 ngày</p>
                </div>

                {/* Course included features */}
                <div className="space-y-3 text-sm">
                    <h3 className="font-bold">Khóa học này bao gồm:</h3>
                    <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-gray-600" />
                        <span>{formatDuration(totalDuration)} video học tập</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Book className="w-4 h-4 text-gray-600" />
                        <span>{course.totalLesson} bài học</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span>Học mọi lúc mọi nơi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-600" />
                        <span>Truy cập vĩnh viễn</span>
                    </div>
                </div>

                {/* Share and gift buttons */}
                <div className="flex gap-2 mt-6 text-sm font-medium">
                    <Button variant="ghost" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Chia sẻ
                    </Button>
                    <Button variant="ghost" className="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Tặng kèm
                    </Button>
                </div>
            </div>
        </div>
    );
}
