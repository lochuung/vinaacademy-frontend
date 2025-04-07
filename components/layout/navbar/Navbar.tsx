"use client";

import { useState, useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { getCategories } from "@/services/categoryService";
import { CategoryDto } from "@/types/category";

interface NavbarProps {
    onNavigateHome?: () => void;
}

const Navbar = ({ onNavigateHome }: NavbarProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                if (categoriesData && categoriesData.length > 0) {
                    setCategories(categoriesData);
                } else {
                    // Fallback to mock data if API returns empty
                    // This will need type conversion since we're now working with CategoryDto
                    console.log("No categories found, using mock data");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Fallback to mock data on error would need type conversion
                console.log("Error fetching categories, using mock data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const {isAuthenticated} = useAuth();

    return (
        <div>
            <nav className="bg-white text-black shadow-md border-b-2 border-black p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <HomeLink className="text-2xl font-bold">
                        ViNA
                    </HomeLink>
                    <div className="hidden md:flex space-x-6">
                        <ExploreDropdown categories={isLoading ? [] : categories} />
                    </div>
                    <SearchBar />
                    <NavigationLinks />
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && (
                            <>
                                <UserLearning />
                                <NotificationDropdown notifications={[]} />
                            </>
                        )}
                        <ShoppingCart items={cartItems} onRemoveItem={handleRemoveFromCart} />
                        <UserMenu isLoggedIn={isAuthenticated} />
                    </div>
                </div>
            </nav>
            {/* <SubNavbar categories={isLoading ? [] : categories} /> */}
        </div>
    );
};

export default Navbar;