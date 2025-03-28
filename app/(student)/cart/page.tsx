'use client';

import { CartItem } from '@/types/cart-courses';
import EmptyCartMessage from '@/components/cart/EmptyCartMessage';
import CartItemCard from '@/components/cart/CartItemCard';
import CheckoutSummary from '@/components/cart/CheckoutSummary';

export default function Cart() {
    // Trong thực tế, dữ liệu này nên được lấy từ API hoặc global state
    const cartItems: CartItem[] = [
        {
            id: 1,
            name: "ReactJS cùng Hữu Lộc",
            price: 250000,
            originalPrice: 500000,
            instructor: "Hữu Lộc",
            rating: 4.5,
            totalStudents: 1234,
            totalHours: 12.5,
            lectures: 120,
            level: "Trung cấp",
            image: "/images/courses/react.jpg"
        },
        {
            id: 2,
            name: "NextJS cùng Trí Hùng",
            price: 450000,
            originalPrice: 900000,
            instructor: "Trí Hùng",
            rating: 4.7,
            totalStudents: 2345,
            totalHours: 15,
            lectures: 150,
            level: "Nâng cao",
            image: "/images/courses/react.jpg"
        },
        {
            id: 3,
            name: "Spring cùng Mỹ Linh",
            price: 650000,
            originalPrice: 1300000,
            instructor: "Mỹ Linh",
            rating: 4.8,
            totalStudents: 3456,
            totalHours: 20,
            lectures: 200,
            level: "Sơ cấp",
            image: "/images/courses/react.jpg"
        }
    ];

    // Handlers có thể được chuyển vào các component con
    const handleRemoveItem = (id: number) => {
        console.log(`Remove item ${id}`);
    };

    const handleSaveForLater = (id: number) => {
        console.log(`Save item ${id} for later`);
    };

    const handleAddToFavorites = (id: number) => {
        console.log(`Add item ${id} to favorites`);
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>

            {cartItems.length === 0 ? (
                <EmptyCartMessage />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Cart Content */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemoveItem}
                                    onSaveForLater={handleSaveForLater}
                                    onAddToFavorites={handleAddToFavorites}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <CheckoutSummary cartItems={cartItems} />
                    </div>
                </div>
            )}
        </div>
    );
}