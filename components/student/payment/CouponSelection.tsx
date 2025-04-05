'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

// Define Coupon type
type Coupon = {
    id: number;
    code: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minPurchaseAmount?: number;
    expirationDate?: Date;
};



type CouponSelectDialogProps = {
    totalPrice: number;
    onCouponSelect: (coupon: Coupon | null) => void;
    coupons: Coupon[];
};

const CouponSelectDialog: React.FC<CouponSelectDialogProps> = ({ totalPrice, onCouponSelect, coupons }) => {
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCouponSelect = (coupon: Coupon) => {
        // Check if coupon is applicable
        const isApplicable = !coupon.minPurchaseAmount || totalPrice >= coupon.minPurchaseAmount;
        
        if (isApplicable) {
            setSelectedCoupon(coupon);
            onCouponSelect(coupon);
            setIsDialogOpen(false);
        } else {
            // Optionally show an error or notification
            alert(`Mã giảm giá này chỉ áp dụng cho đơn hàng từ ${coupon.minPurchaseAmount?.toLocaleString()}đ trở lên`);
        }
    };

    const handleRemoveCoupon = () => {
        setSelectedCoupon(null);
        onCouponSelect(null);
    };

    return (
        <div>
            {selectedCoupon ? (
                <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary" className='mr-2'>
                        {selectedCoupon.code} - {selectedCoupon.description}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={handleRemoveCoupon} className='border-gray-400'>
                        Xóa
                    </Button>
                </div>
            ) : (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-gray-400">
                            Chọn mã giảm giá
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Chọn mã giảm giá</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {coupons.map((coupon) => (
                                <div 
                                    key={coupon.id} 
                                    className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleCouponSelect(coupon)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">{coupon.code}</h3>
                                            <p className="text-sm text-gray-600">{coupon.description}</p>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            Chọn
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default CouponSelectDialog;
export type { Coupon };