import { Button } from '@/components/ui/button';
import { CartItemDisplay, useCart } from '@/context/CartContext';
import PromoCodeInput from './PromoCodeInput';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface CheckoutSummaryProps {
    cartItems: CartItemDisplay[];
}

export default function CheckoutSummary({ cartItems }: CheckoutSummaryProps) {
    const { applyCoupon, totalPrice, totalOriginalPrice } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleApplyPromoCode = async (code: string) => {
        setIsProcessing(true);
        try {
            const success = await applyCoupon(code);
            if (success) {
                toast({
                    title: 'Mã giảm giá đã được áp dụng',
                    description: 'Giá khóa học đã được cập nhật',
                });
            } else {
                toast({
                    title: 'Mã giảm giá không hợp lệ',
                    description: 'Vui lòng kiểm tra lại mã giảm giá',
                    variant: 'destructive'
                });
            }
        } catch (error) {
            toast({
                title: 'Lỗi khi áp dụng mã giảm giá',
                description: 'Đã xảy ra lỗi, vui lòng thử lại sau',
                variant: 'destructive'
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCheckout = () => {
        // Trong thực tế, cần chuyển đến trang thanh toán
        setIsProcessing(true);

        // Giả lập xử lý thanh toán
        setTimeout(() => {
            setIsProcessing(false);
            toast({
                title: 'Đang chuyển hướng đến trang thanh toán',
                description: 'Vui lòng chờ trong giây lát',
            });

            // Chuyển hướng đến trang thanh toán
            router.push('/checkout');
        }, 1000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h2 className="font-semibold mb-4">Tổng cộng:</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span>Giá gốc:</span>
                    <span className="line-through text-gray-500">
                        {totalOriginalPrice.toLocaleString("vi-VN")}đ
                    </span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Giá ưu đãi:</span>
                    <span>
                        {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                </div>
                <Button
                    className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg mt-4"
                    onClick={handleCheckout}
                    disabled={isProcessing || cartItems.length === 0}
                >
                    {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
                </Button>
                <div className="text-xs text-center text-gray-500 mt-4">
                    Đảm bảo hoàn tiền trong 30 ngày
                </div>

                {/* Promotions Section */}
                <PromoCodeInput
                    onApply={handleApplyPromoCode}
                    isDisabled={isProcessing}
                />
            </div>
        </div>
    );
}