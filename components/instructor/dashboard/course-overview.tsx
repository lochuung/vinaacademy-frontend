"use client";

import Link from 'next/link';
import {BookOpen, Clock, Star} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

interface CourseOverviewProps {
    className?: string;
}

export default function CourseOverview({className}: CourseOverviewProps) {
    // Giả lập dữ liệu
    const stats = {
        courses: 5,
        completionRate: 72
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Tổng quan khóa học</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Tổng số khóa học</p>
                                    <h3 className="text-2xl font-bold">{stats.courses}</h3>
                                </div>
                                <BookOpen className="h-8 w-8 text-gray-400"/>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Tỷ lệ hoàn thành</p>
                                    <h3 className="text-2xl font-bold">{stats.completionRate}%</h3>
                                </div>
                                <Clock className="h-8 w-8 text-gray-400"/>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-gray-100 py-2 px-4 text-sm font-medium text-gray-500">
                            <div className="col-span-5">Tên khóa học</div>
                            <div className="col-span-2 text-center">Học viên</div>
                            <div className="col-span-2 text-center">Đánh giá</div>
                            <div className="col-span-3 text-right">Doanh thu</div>
                        </div>

                        <div className="divide-y">
                            <div className="grid grid-cols-12 py-3 px-4 items-center">
                                <div className="col-span-5 font-medium">Lập trình JavaScript từ cơ bản đến nâng cao
                                </div>
                                <div className="col-span-2 text-center">128</div>
                                <div className="col-span-2 text-center flex justify-center">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-current text-yellow-400 mr-1"/>
                                        <span>4.7</span>
                                    </div>
                                </div>
                                <div className="col-span-3 text-right font-medium">12,400,000 đ</div>
                            </div>

                            <div className="grid grid-cols-12 py-3 px-4 items-center">
                                <div className="col-span-5 font-medium">React và NextJS cho người mới bắt đầu</div>
                                <div className="col-span-2 text-center">86</div>
                                <div className="col-span-2 text-center flex justify-center">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-current text-yellow-400 mr-1"/>
                                        <span>4.5</span>
                                    </div>
                                </div>
                                <div className="col-span-3 text-right font-medium">8,600,000 đ</div>
                            </div>

                            <div className="grid grid-cols-12 py-3 px-4 items-center">
                                <div className="col-span-5 font-medium">NodeJS và ExpressJS Advanced</div>
                                <div className="col-span-2 text-center">42</div>
                                <div className="col-span-2 text-center flex justify-center">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-current text-yellow-400 mr-1"/>
                                        <span>4.2</span>
                                    </div>
                                </div>
                                <div className="col-span-3 text-right font-medium">4,200,000 đ</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link href="/instructor/courses">
                            <Button variant="outline" className="border-black bg-white text-black hover:bg-gray-100">
                                Xem tất cả khóa học
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}