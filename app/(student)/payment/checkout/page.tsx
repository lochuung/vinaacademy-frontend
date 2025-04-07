'use client';

import React, {useState} from 'react';
import PaymentSelection, {PaymentMethod, SavedCard} from '@/components/student/payment/PaymentSelection';
import OrderSummary, {CartItem} from '@/components/student/payment/OrderSummary';
import {Coupon} from '@/components/student/payment/CouponSelection';


const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vnpay');
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    // Mock cart items
    const mockCartItems: CartItem[] = [
        {
            id: 1,
            name: "Khóa học Lập trình Web Fullstack",
            price: 899000,
            originalPrice: 1999000,
            image: "/api/placeholder/100/100"
        },
        {
            id: 2,
            name: "Khóa học React Nâng cao",
            price: 1099000,
            originalPrice: 2299000,
            image: "/api/placeholder/100/100"
        },
        {
            id: 3,
            name: "Khóa học Node.js Chuyên sâu",
            price: 1299000,
            originalPrice: 2499000,
            image: "/api/placeholder/100/100"
        }
    ];

    // Mock saved cards
    const savedCards: SavedCard[] = [
        {
            id: 'card1',
            last4: '4242',
            brand: 'Visa',
            expMonth: 12,
            expYear: 2025
        },
        {
            id: 'card2',
            last4: '5555',
            brand: 'Mastercard',
            expMonth: 6,
            expYear: 2024
        }
    ];

    //Coupons data
    const availableCoupons: Coupon[] = [
        {
            id: 1,
            code: 'SUMMER20',
            description: 'Giảm 20% cho đơn hàng trên 500,000đ',
            discountType: 'percentage',
            discountValue: 20,
            minPurchaseAmount: 500000
        },
        {
            id: 2,
            code: 'NEWUSER50K',
            description: 'Giảm 50,000đ cho đơn hàng đầu tiên',
            discountType: 'fixed',
            discountValue: 50000
        }
    ];

    const handlePaymentMethodChange = (method: PaymentMethod) => {
        setPaymentMethod(method);
    };

    const handlePaymentInitiate = (method: PaymentMethod, cardId?: string) => {
        console.log('Payment initiated:', {
            method,
            cardId: cardId || 'No card selected',
            totalItems: mockCartItems.length,
            totalPrice: mockCartItems.reduce((sum, item) => sum + item.price, 0)
        });
        // Add your payment processing logic here
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-8 -mt-8 pt-4">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Payment Method Section */}
                    <div className="md:col-span-2">
                        <PaymentSelection
                            savedCards={savedCards}
                            onPaymentMethodChange={handlePaymentMethodChange}
                            onPaymentInitiate={handlePaymentInitiate}
                        />
                    </div>

                    {/* Order Summary */}
                    <div>
                        <OrderSummary cartItems={mockCartItems} coupons={availableCoupons}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;