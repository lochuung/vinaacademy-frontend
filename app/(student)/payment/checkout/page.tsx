'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
    const mockCartItems = [
        {
            id: 1,
            price: 899000,
            originalPrice: 1999000,
        },
        {
            id: 2,
            price: 799000,
            originalPrice: 1599000,
        }
    ];

    // Calculate totals
    const totalOriginalPrice = mockCartItems.reduce((sum, item) => sum + item.originalPrice, 0);
    const totalPrice = mockCartItems.reduce((sum, item) => sum + item.price, 0);
    const numberOfCourses = mockCartItems.length;

    // Helper function to format price in VND
    const formatPrice = (price: number) => {
        return `${price.toLocaleString('vi-VN')} đ`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Payment Section */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-6">Phương thức thanh toán</h2>

                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/vnpay-logo.png"
                                    alt="VNPay"
                                    width={40}
                                    height={40}
                                />
                                <span className="font-medium">Cổng thanh toán VNPay</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                                Bạn sẽ được chuyển đến cổng thanh toán an toàn của VNPay để hoàn tất giao dịch
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-medium mb-2">Hướng dẫn thanh toán:</h3>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                                <li>Nhấn nút "Tiến hành thanh toán" bên dưới</li>
                                <li>Bạn sẽ được chuyển đến trang thanh toán của VNPay</li>
                                <li>Hoàn tất thanh toán bằng ngân hàng hoặc phương thức thanh toán bạn chọn</li>
                                <li>Sau khi thanh toán thành công, bạn sẽ được chuyển về trang web của chúng tôi</li>
                            </ul>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow h-fit">
                        <h2 className="text-xl font-semibold mb-6">Tổng quan đơn hàng</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Tổng số khóa học:</span>
                                <span>{numberOfCourses} khóa học</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Giá gốc:</span>
                                <span className="line-through text-gray-500">
                                    {formatPrice(totalOriginalPrice)}
                                </span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Giá:</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Tổng cộng:</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-black text-white py-6 rounded-lg mt-6 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-base font-medium h-16"
                            onClick={() => {
                                // Add your VNPay payment integration logic here
                                console.log('Initiating VNPay payment...');
                            }}
                        >
                            <Image
                                src="/vnpay-logo.png"
                                alt="VNPay"
                                width={28}
                                height={28}
                            />
                            Tiến hành thanh toán
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Bằng việc hoàn tất thanh toán, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;