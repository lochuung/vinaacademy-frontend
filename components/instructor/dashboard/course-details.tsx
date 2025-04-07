"use client";

import {Star} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export default function CourseDetails() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Chi tiết khóa học</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="popular">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="popular">Phổ biến nhất</TabsTrigger>
                        <TabsTrigger value="recent">Cập nhật gần đây</TabsTrigger>
                        <TabsTrigger value="revenue">Doanh thu cao</TabsTrigger>
                    </TabsList>
                    <TabsContent value="popular" className="space-y-4">
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa
                                        học
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Học
                                        viên
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt
                                        xem
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Đánh
                                        giá
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Lập trình JavaScript từ cơ
                                            bản đến nâng cao
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">128</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">5,420</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center">
                                            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1"/>
                                            <span className="text-sm text-gray-900">4.7</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">React và NextJS cho người mới
                                            bắt đầu
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">86</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">3,250</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center">
                                            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1"/>
                                            <span className="text-sm text-gray-900">4.5</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">NodeJS và ExpressJS
                                            Advanced
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">42</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">1,120</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center">
                                            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1"/>
                                            <span className="text-sm text-gray-900">4.2</span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="recent" className="space-y-4">
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa
                                        học
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày
                                        cập nhật
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bài
                                        giảng
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng
                                        thái
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">UI/UX Design cho người mới
                                            bắt đầu
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">15/03/2025</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">8</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Nháp
                                            </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">React và NextJS cho người mới
                                            bắt đầu
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">10/03/2025</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">12</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Đã xuất bản
                                            </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">NodeJS và ExpressJS
                                            Advanced
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">05/03/2025</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">10</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Đã xuất bản
                                            </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="revenue" className="space-y-4">
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa
                                        học
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh
                                        thu
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Học
                                        viên
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Giá
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Lập trình JavaScript từ cơ
                                            bản đến nâng cao
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">12,400,000 đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">128</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">349,000 đ</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">React và NextJS cho người mới
                                            bắt đầu
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">8,600,000 đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">86</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">299,000 đ</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">NodeJS và ExpressJS
                                            Advanced
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">4,200,000 đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">42</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">399,000 đ</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}