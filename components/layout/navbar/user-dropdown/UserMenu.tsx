"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import { getCurrentUser } from "@/services/authService";
import { User } from "@/types/auth";

interface UserMenuProps {
  isLoggedIn: boolean;
}

const UserMenu = ({ isLoggedIn }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  useEffect(() => {
    handleUser();
  }, []);

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
      {isLoggedIn ? (
        <div
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full transition-colors duration-200 ${
            isOpen ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {user ? (
            <div className="flex items-center space-x-4">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full"
                />
              ) : (
                <FaUserCircle size={26} className="text-black" />
              )}

              {/* <span className="text-sm font-medium text-gray-800 truncate">
                
              </span> */}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 border border-black text-black rounded hover:bg-gray-200"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Đăng ký
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <UserDropdown isVisible={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default UserMenu;
