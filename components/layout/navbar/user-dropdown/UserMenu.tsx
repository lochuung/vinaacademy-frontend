"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar-shadcn";
import { getImageUrl } from "@/utils/imageUtils";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated, user } = useAuth();

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
    }, 300); // Độ trễ 300ms - giống ShoppingCart
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
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isAuthenticated ? (
        <div
          className={`flex items-center space-x-2 cursor-pointer p-1.5 rounded-full transition-colors duration-200 ${
            isOpen ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {user ? (
            <div className="flex items-center">
              {user.avatarUrl ? (
                <Avatar className="border-2 w-[32px] h-[32px] border-gray-100 shadow-sm">
                  <AvatarImage
                    src={getImageUrl(user.avatarUrl) || "/default-avatar.png"}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                  />
                </Avatar>
              ) : (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  <FaUserCircle size={24} className="text-gray-700" />
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="hidden lg:flex space-x-2">
          <Link
            href="/login"
            className="px-4 py-2 border border-black text-black rounded hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Đăng ký
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <UserDropdown isVisible={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default UserMenu;
