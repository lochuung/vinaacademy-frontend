"use client";

import { useState } from "react";
import { CartItem } from '@/types/navbar';
import { initialCartItems } from '@/data/mockCartData';
import ExploreDropdown from "./explore-dropdown/ExploreDropdown";
import SearchBar from "./search-bar/SearchBar";
import UserLearning from "./user-learning/UserLearning";
import UserMenu from "./user-dropdown/UserMenu";
import ShoppingCart from "./shopping-cart/ShoppingCart";
import NavigationLinks from "./other-link/NavigationLinks";
import SubNavbar from "./sub-navbar/SubNavbar";
import { categoriesData } from "@/data/categories";
import NotificationDropdown from "./notification-badge/NotificationDropdown";
import HomeLink from "../HomeLink";

interface NavbarProps {
    onNavigateHome?: () => void;
}

const Navbar = ({ onNavigateHome }: NavbarProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div>
            <nav className="bg-white text-black shadow-md border-b-2 border-black p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <HomeLink className="text-2xl font-bold">
                        ViNA
                    </HomeLink>
                    <div className="hidden md:flex space-x-6">
                        <ExploreDropdown categories={categoriesData} />
                    </div>
                    <SearchBar />
                    <NavigationLinks />
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && (
                            <>
                                <UserLearning />
                                <NotificationDropdown notifications={[]} />
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