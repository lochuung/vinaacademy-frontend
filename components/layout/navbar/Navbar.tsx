"use client";
import { useState } from "react";
import Link from "next/link";
import { CartItem, LearningCourse } from '@/types/navbar';
import { initialCartItems, initialLearningCourses } from '@/data/mockData';
import ExploreDropdown from "./ExploreDropdown";
import SearchBar from "./SearchBar";
import UserLearning from "./UserLearning";
import UserMenu from "./UserMenu";
import ShoppingCart from "./ShoppingCart";
import NavigationLinks from "./NavigationLinks";
import SubNavbar from "./SubNavbar";
import { categoriesData } from "@/data/categories";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [learningCourses, setLearningCourses] = useState<LearningCourse[]>(initialLearningCourses);

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div>
            <nav className="bg-white text-black shadow-md border-b-2 border-black p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        VINA ACADEMY
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <ExploreDropdown categories={categoriesData} />
                    </div>
                    <SearchBar />
                    <NavigationLinks />
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && (
                            <>
                                <UserLearning courses={learningCourses} />
                                <NotificationDropdown /> {/* Hiển thị dropdown thông báo */}
                            </>
                        )}
                        <ShoppingCart items={cartItems} onRemoveItem={handleRemoveFromCart} />
                        <UserMenu isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </nav>
            <SubNavbar />
        </div>
    );
};

export default Navbar;