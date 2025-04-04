'use client';

import Image from 'next/image';
import { Separator } from '../../ui/separator';
import CouponSelectDialog, { Coupon } from './CouponSelection';
import { useState } from 'react';

type CartItem = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
};

type OrderSummaryProps = {
    cartItems: CartItem[];
    coupons: Coupon[];
};




const OrderSummary = ( {cartItems, coupons} : OrderSummaryProps) => {
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    // Calculate totals
    const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const numberOfCourses = cartItems.length;

    // Helper function to format price in VND
    const formatPrice = (price: number) => {
        return `${price.toLocaleString('vi-VN')} đ`;
    };

    // Calculate final price after applying coupon
    const calculateFinalPrice = () => {
        if (!selectedCoupon) return totalPrice;

        if (selectedCoupon.discountType === 'percentage') {
            const discountAmount = totalPrice * (selectedCoupon.discountValue / 100);
            return Math.max(0, totalPrice - discountAmount);
        } else {
            return Math.max(0, totalPrice - selectedCoupon.discountValue);
        }
    };

    const finalPrice = calculateFinalPrice();

    return (
        <div className="bg-white p-6 rounded-lg shadow h-fit">
            {/* Scrollable Product List */}
            <h2 className="text-xl font-semibold mb-6 text-center">Tổng quan đơn hàng</h2>
            <div className="max-h-[280px] overflow-y-auto pr-2 mb-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center mb-4 pb-4 border-b last:border-b-0"
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-md mr-4"
                        />
                        <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="line-through text-xs text-gray-500">
                                    {formatPrice(item.originalPrice)}
                                </span>
                                <span className="font-semibold">
                                    {formatPrice(item.price)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Coupon Selection */}
            <CouponSelectDialog 
                totalPrice={totalPrice} 
                onCouponSelect={(coupon) => setSelectedCoupon(coupon)}
                coupons={coupons}
            />

            <Separator className="my-4 bg-slate-400" />
            
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
                    <span>Giá sau giảm:</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>
                
                {/* Coupon Discount Display */}
                {selectedCoupon && (
                    <div className="flex justify-between text-green-600">
                        <span>Voucher:</span>
                        <span>
                            {selectedCoupon.discountType === 'percentage'
                                ? `-${selectedCoupon.discountValue}%`
                                : `-${formatPrice(selectedCoupon.discountValue)}`}
                        </span>
                    </div>
                )}
                
                
                
                <Separator className='bg-slate-400' />
                
                <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(finalPrice)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
export type { CartItem };