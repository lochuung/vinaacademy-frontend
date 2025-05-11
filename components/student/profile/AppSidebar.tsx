"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Clock,
  LogOut,
  Settings,
  Search,
  Info,
  LineChart,
  CreditCard,
  ShoppingCart,
  Bell,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar-shadcn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
} from "../../ui/sidebar-shadcn";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className = "" }: AppSidebarProps) {
  const [activeItem, setActiveItem] = useState("Thông tin cá nhân");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { logout, user } = useAuth();
  useEffect(() => {
    setIsClient(true);
    // Simulate loading time (remove this in production and use your actual loading state)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Menu items
  const menuItems = [
    {
      title: "Thông tin cá nhân",
      icon: Home,
      badge: null,
      url: "/profile/info",
    },
    // { title: "Giỏ hàng", icon: ShoppingCart, badge: 5 },
    { title: "Lịch sử thanh toán", icon: LineChart, badge: null, url: "/profile/payment" },
    {
      title: "Thông báo",
      icon: Bell,
      badge: null,
      url: "/profile/notification",
    },
    // { title: "Phương thức thanh toán", icon: CreditCard, badge: null },
    // { title: "Điều khoản dịch vụ", icon: Info, badge: null },
    { title: "Đăng xuất", icon: LogOut, badge: null, url: "/logout" },
  ];

  // If not client-side yet, render skeleton
  if (!isClient) {
    return (
      <Sidebar
        className={`z-10 w-64 h-[80vh] bg-gray-100 border-r-0 ${className}`}
      >
        <SidebarContent className="px-4 py-4">
          <SkeletonSidebar />
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className={`z-10 w-64 bg-gray-100 border-r-0 ${className}`}>
      <SidebarContent className="px-4 py-4">
        {isLoading ? (
          <SkeletonSidebar />
        ) : (
          <>
            {/* Header with profile and settings */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={undefined} alt="Profile" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Chào mừng trở lại,</div>
                  <div className="font-semibold text-gray-700">{user?.fullName}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white shadow-sm border-gray-400"
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
            {/* Search
            <div className="relative mb-6 z-10">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
                <Search className="h-4 w-4 text-black" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 rounded-full border-none bg-white h-9 z-10"
              />
            </div> */}
            {/* Menu items */}
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem
                  key={index}
                  className={`flex justify-between items-center px-3 py-3 rounded-xl transition-colors cursor-pointer ${
                    activeItem === item.title
                      ? "bg-white shadow-md"
                      : "hover:bg-slate-500/60"
                  }`}
                  onClick={() => {
                    setActiveItem(item.title);
                    if (activeItem !== item.title) {
                      if (item.url === "/logout") {
                        logout();
                        //  router.push("/login");
                      } else {
                        router.push(item.url);
                      }
                    }
                  }}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-5 w-5 ${
                        activeItem === item.title
                          ? "text-gray-700"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`ml-3 text-sm ${
                        activeItem === item.title
                          ? "font-medium text-gray-700"
                          : "text-gray-600"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-pink-500 text-white hover:bg-pink-500 mr-2"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </div>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

// Skeleton component for sidebar loading state
function SkeletonSidebar() {
  return (
    <>
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-3">
            <Skeleton className="h-2 w-16 mb-1" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Search skeleton */}
      <Skeleton className="h-9 w-full rounded-full mb-6" />

      {/* Menu items skeleton */}
      <div className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24 ml-3" />
            </div>
            {index === 1 && <Skeleton className="h-5 w-5 rounded-full" />}
          </div>
        ))}
      </div>
    </>
  );
}
