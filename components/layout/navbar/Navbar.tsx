"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types/navbar";
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
import { useCart } from "@/context/CartContext"; // Import useCart hook
import {
  fetchUserNotifications,
  markAllNotificationsAsRead,
} from "@/services/notificationService";
import {
  NotificationDTO,
  NotificationPageResponse,
  NotificationType,
} from "@/types/notification-type";
import { useToast } from "@/hooks/use-toast"; // Import useToast hook
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onNavigateHome?: () => void;
}

const Navbar = ({ onNavigateHome }: NavbarProps) => {
  const { categories, isLoading } = useCategories(); // Using the shared categories context
  const { isAuthenticated, user } = useAuth();
  const { cartItems, removeFromCart, totalPrice } = useCart(); // Sử dụng context giỏ hàng
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [totalUnread, setTotalUnread] = useState<number>(0);
  const [formattedCartItems, setFormattedCartItems] = useState<CartItem[]>([]);
  const roleStaffAdmin =
    user?.roles.findLast(
      (role) => role.name === "admin" || role.name === "staff"
    ) || null;


  // Chuyển đổi cartItems từ CartContext sang định dạng CartItem cho ShoppingCart component
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const formatted = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: `${item.price.toLocaleString("vi-VN")}đ`,
        image: item.image || "/images/course-placeholder.jpg",
      }));
      setFormattedCartItems(formatted);
    } else {
      setFormattedCartItems([]);
    }
  }, [cartItems]);

  const handleRemoveFromCart = async (id: number) => {
    try {
      const success = await removeFromCart(id);
      if (success) {
        toast({
          title: "Đã xóa khỏi giỏ hàng",
          description: "Khóa học đã được xóa khỏi giỏ hàng của bạn",
        });
      } else {
        toast({
          title: "Không thể xóa khóa học",
          description: "Đã xảy ra lỗi khi xóa khóa học khỏi giỏ hàng.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Không thể xóa khóa học",
        description: "Đã xảy ra lỗi khi xóa khóa học khỏi giỏ hàng.",
        variant: "destructive",
      });
    }
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
                {roleStaffAdmin && (
                   <Link href={"/requests"}>Duyệt khóa học</Link>
                )}
                <UserLearning />
                <NotificationDropdown
                  onMarkAllAsRead={handleMarkAllAsRead}
                  notifications={notifications}
                  totalUnread={totalUnread}
                />
                <ShoppingCart
                  items={formattedCartItems}
                  onRemoveItem={handleRemoveFromCart}
                  total={totalPrice} // Truyền tổng giá trị từ CartContext
                />
              </>
            )}
            <UserMenu />
          </div>
        </div>
      </nav>
      {/* <SubNavbar categories={isLoading ? [] : categories} /> */}
    </div>
  );
};

export default Navbar;
