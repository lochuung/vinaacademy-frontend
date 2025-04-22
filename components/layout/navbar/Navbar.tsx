"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types/navbar";
import { initialCartItems } from "@/data/mockCartData";
import ExploreDropdown from "./explore-dropdown/ExploreDropdown";
import SearchBar from "./search-bar/SearchBar";
import UserLearning from "./user-learning/UserLearning";
import UserMenu from "./user-dropdown/UserMenu";
import ShoppingCart from "./shopping-cart/ShoppingCart";
import NavigationLinks from "./other-link/NavigationLinks";
import SubNavbar from "./sub-navbar/SubNavbar";
import NotificationDropdown from "./notification-badge/NotificationDropdown";
import HomeLink from "../HomeLink";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/context/CategoryContext";
import {
  fetchUserNotifications,
  markAllNotificationsAsRead,
} from "@/services/notificationService";
import {
  NotificationDTO,
  NotificationPageResponse,
  NotificationType,
} from "@/types/notification-type";
import { set } from "date-fns";

interface NavbarProps {
  onNavigateHome?: () => void;
}

const Navbar = ({ onNavigateHome }: NavbarProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const { categories, isLoading } = useCategories(); // Using the shared categories context
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [totalUnread, setTotalUnread] = useState<number>(0);

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    load2notifications();
  };

  const load2notifications = async () => {
    const result = await fetchUserNotifications({
      type: null,
      isRead: false,
      page: 0,
      size: 2,
      sortBy: "createdAt",
      direction: "desc",
    });
    setTotalUnread(result.totalElements);
    setNotifications(result.content);
  };

  useEffect(() => {
    if (isAuthenticated) {
      load2notifications();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <nav className="bg-white text-black shadow-md border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <HomeLink className="text-2xl font-bold">ViNA</HomeLink>
          <div className="hidden md:flex space-x-6">
            <ExploreDropdown categories={isLoading ? [] : categories} />
          </div>
          <SearchBar />
          <NavigationLinks />
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <UserLearning />
                <NotificationDropdown
                  onMarkAllAsRead={handleMarkAllAsRead}
                  notifications={notifications}
                  totalUnread={totalUnread}
                />
              </>
            )}
            <ShoppingCart
              items={cartItems}
              onRemoveItem={handleRemoveFromCart}
            />
            <UserMenu isLoggedIn={isAuthenticated} />
          </div>
        </div>
      </nav>
      {/* <SubNavbar categories={isLoading ? [] : categories} /> */}
    </div>
  );
};

export default Navbar;
