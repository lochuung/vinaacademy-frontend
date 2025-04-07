import {Button} from '@/components/ui/button';
import {CartItem} from '@/types/cart-courses';
import PromoCodeInput from './PromoCodeInput';

interface CheckoutSummaryProps {
    cartItems: CartItem[];
}

export default function CheckoutSummary({cartItems}: CheckoutSummaryProps) {
    // Tính toán tổng giá gốc
    const totalOriginalPrice = cartItems.reduce(
        (total, item) => total + item.originalPrice,
        0
    );

    // Tính toán tổng giá ưu đãi
    const totalDiscountPrice = cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    const handleApplyPromoCode = (code: string) => {
        console.log(`Applying promo code: ${code}`);
        // Xử lý logic áp dụng mã giảm giá ở đây
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout');
        // Xử lý logic thanh toán ở đây
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h2 className="font-semibold mb-4">Tổng cộng:</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span>Giá gốc:</span>
                    <span className="line-through text-gray-500">
                        {totalOriginalPrice.toLocaleString()}đ
                    </span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Giá ưu đãi:</span>
                    <span>
                        {totalDiscountPrice.toLocaleString()}đ
                    </span>
                </div>
                <Button
                    className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg mt-4"
                    onClick={handleCheckout}
                >
                    Thanh toán
                </Button>
                <div className="text-xs text-center text-gray-500 mt-4">
                    Đảm bảo hoàn tiền trong 30 ngày
                </div>

                {/* Promotions Section */}
                <PromoCodeInput onApply={handleApplyPromoCode}/>
            </div>
        </div>
    );
}