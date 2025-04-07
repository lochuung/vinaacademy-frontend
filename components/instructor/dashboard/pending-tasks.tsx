"use client";

import {CircleAlert, BookMarked, MessageSquare} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

export default function PendingTasks() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Cần xử lý</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg">
                        <div className="flex items-center">
                            <CircleAlert className="h-5 w-5 text-red-500 mr-3"/>
                            <div>
                                <p className="text-sm font-medium">Câu hỏi chưa trả lời</p>
                                <p className="text-xs text-gray-500">3 câu hỏi đang chờ phản hồi từ bạn</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white">Xem</Button>
                    </div>

                    <div
                        className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                        <div className="flex items-center">
                            <BookMarked className="h-5 w-5 text-yellow-500 mr-3"/>
                            <div>
                                <p className="text-sm font-medium">Bài giảng chưa hoàn thành</p>
                                <p className="text-xs text-gray-500">Có 2 bài giảng đang ở trạng thái nháp</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white">Xem</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-blue-500 mr-3"/>
                            <div>
                                <p className="text-sm font-medium">Phản hồi đánh giá</p>
                                <p className="text-xs text-gray-500">5 đánh giá mới cần phản hồi</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white">Xem</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}