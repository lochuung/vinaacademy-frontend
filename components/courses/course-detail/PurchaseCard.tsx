"use client";
import {Clock, PlayCircle, Download, Award, ArrowRight} from 'lucide-react';
import Image from 'next/image';

interface PurchaseCardProps {
    course: {
        price: number;
        image: string;
        name: string;
        totalLesson: number;
        totalSection: number;
        level: string;
    };
}

export default function PurchaseCard({course}: PurchaseCardProps) {
    return (
        <div className="bg-white border shadow-lg rounded-lg overflow-hidden" aria-label="Đăng ký khóa học">
            {/* Course Preview Image */}
            <div className="aspect-video relative">
                <Image
                    src={course.image}
                    alt={`Ảnh xem trước khóa học ${course.name}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white opacity-80" aria-hidden="true"/>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <div className="text-3xl font-bold mb-2"
                         aria-label={`Giá khóa học: ${course.price.toLocaleString('vi-VN')} đồng`}>
                        {course.price.toLocaleString('vi-VN')}₫
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white py-3 px-4 rounded font-medium"
                        aria-label="Đăng ký học ngay"
                    >
                        Đăng ký học ngay
                    </button>

                    <button
                        className="w-full border border-black py-3 px-4 rounded font-medium hover:bg-gray-50"
                        aria-label="Thêm vào giỏ hàng"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>

                <div className="text-center my-4 text-sm text-gray-600">
                    <p>Đảm bảo hoàn tiền trong 30 ngày</p>
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-bold mb-3 text-lg">Khóa học này bao gồm:</h3>
                    <ul className="space-y-3 text-sm" aria-label="Thông tin chi tiết khóa học">
                        <li className="flex items-center">
                            <PlayCircle className="h-5 w-5 mr-3 text-gray-600" aria-hidden="true"/>
                            <span>{course.totalLesson} bài học</span>
                        </li>
                        <li className="flex items-center">
                            <Clock className="h-5 w-5 mr-3 text-gray-600" aria-hidden="true"/>
                            <span>Học mọi lúc, mọi nơi</span>
                        </li>
                        <li className="flex items-center">
                            <Download className="h-5 w-5 mr-3 text-gray-600" aria-hidden="true"/>
                            <span>Truy cập trọn đời</span>
                        </li>
                        <li className="flex items-center">
                            <Award className="h-5 w-5 mr-3 text-gray-600" aria-hidden="true"/>
                            <span>Chứng chỉ hoàn thành</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-6 pt-4 border-t">
                    <button
                        className="w-full flex justify-center items-center text-[#a435f0] font-medium hover:text-[#8710d8]"
                        aria-label="Chia sẻ khóa học"
                    >
                        Chia sẻ khóa học
                        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
