'use client';

import { useEffect, useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import EmptyCartMessage from '@/components/cart/EmptyCartMessage';
import CartItemCard from '@/components/cart/CartItemCard';
import CheckoutSummary from '@/components/cart/CheckoutSummary';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
    const { cartItems, isLoading, removeFromCart, refreshCart } = useCart();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [localLoading, setLocalLoading] = useState(false);

    // Theo dõi nếu đã gọi refreshCart() để tránh gọi nhiều lần
    const hasRefreshedRef = useRef(false);

    useEffect(() => {
        // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        if (!isAuthenticated && !authLoading) {
            router.push('/login?redirect=/cart');
            return;
        }

        // Chỉ tải lại giỏ hàng một lần khi component được mount
        // và nếu người dùng đã đăng nhập và chưa refresh trước đó
        if (isAuthenticated && !hasRefreshedRef.current) {
            const loadCart = async () => {
                setLocalLoading(true);
                await refreshCart();
                setLocalLoading(false);
                hasRefreshedRef.current = true;
            };

            loadCart();
        }

        // Cleanup function
        return () => {
            hasRefreshedRef.current = false;
        };
    }, [isAuthenticated, authLoading]);

    const handleRemoveItem = async (id: number) => {
        setLocalLoading(true);
        const success = await removeFromCart(id);
        if (!success) {
            toast({
                title: 'Không thể xóa khóa học',
                description: 'Đã xảy ra lỗi khi xóa khóa học khỏi giỏ hàng.',
                variant: 'destructive'
            });
        }
        setLocalLoading(false);
    };

    const handleSaveForLater = (id: number) => {
        toast({
            title: 'Tính năng đang phát triển',
            description: 'Tính năng lưu khóa học sẽ sớm được ra mắt.',
        });
    };

    const handleAddToFavorites = (id: number) => {
        toast({
            title: 'Tính năng đang phát triển',
            description: 'Tính năng thêm vào danh sách yêu thích sẽ sớm được ra mắt.',
        });
    };

    // Hiển thị trạng thái đang tải
    if (isLoading || localLoading || authLoading) {
        return (
            <div className="container mx-auto py-6 px-4 flex justify-center items-center min-h-[60vh]">
                <div className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent w-6 h-6" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <span className="ml-2">Đang tải giỏ hàng...</span>
            </div>
        );
    }

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