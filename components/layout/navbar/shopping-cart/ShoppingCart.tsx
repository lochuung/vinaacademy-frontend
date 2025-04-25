"use client";
import { useState, useRef, useEffect } from "react";
import { CartItem } from "@/types/navbar";
import { CartButton } from "./CartButton";
import { CartItemList } from "./CartItemList";
import { ViewCartButton } from "./ViewCartButton";

interface ShoppingCartProps {
    items: CartItem[];
    onRemoveItem: (id: number) => void;
    total?: number; // Thêm prop total để nhận giá trị tổng tiền từ Context
}

const ShoppingCart = ({ items, onRemoveItem, total }: ShoppingCartProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Mở dropdown với độ trễ nhỏ để tránh hiệu ứng flicker
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    // Đóng dropdown với độ trễ để tránh đóng ngay khi di chuyển chuột
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Độ trễ 300ms
    };

    // Dọn dẹp khi component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Toggle dropdown khi click vào button
    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div
            className="relative"
            ref={cartRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CartButton
                itemCount={items.length}
                isActive={isOpen}
                onClick={toggleDropdown}
            />

            <div
                className={`absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${isOpen
                    ? "transform-none opacity-100 visible"
                    : "transform translate-y-2 opacity-0 invisible pointer-events-none"
                    }`}
                aria-hidden={!isOpen}
            >
                {/* Mũi tên chỉ hướng */}
                <div
                    className="absolute -top-2 right-3 h-4 w-4 rotate-45 bg-white border-t border-l border-gray-200"></div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Giỏ hàng</h3>
                        <span className="text-sm text-gray-500">{items.length} khóa học</span>
                    </div>

                    <CartItemList
                        items={items}
                        onRemove={onRemoveItem}
                    />

                    {items.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium">Tổng cộng:</span>
                                <span className="font-bold text-lg">
                                    {(total ?? 0).toLocaleString("vi-VN")}đ
                                </span>
                            </div>
                            <ViewCartButton />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;