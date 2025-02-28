import type { Metadata } from "next"; // Import kiểu dữ liệu Metadata từ next
import { Geist, Geist_Mono } from "next/font/google"; // Import các font Geist và Geist_Mono từ next/font/google
import "./globals.css"; // Import file CSS toàn cục

import LayoutWrapper from "@/components/layout/LayoutWrapper"; // Import component LayoutWrapper từ thư mục components/layout
import { Toaster } from "@/components/ui/sonner"; // Import component Toaster từ thư mục components/ui/sonner

// Khởi tạo font Geist với biến CSS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Khởi tạo font Geist_Mono với biến CSS
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Định nghĩa metadata cho trang
export const metadata: Metadata = {
  title: "ViNA ACADEMY", // Tiêu đề của trang
  description: "Nền tảng học trực tuyến hàng đầu Việt Nam", // Updated description in Vietnamese
};

// Định nghĩa component RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Sử dụng các biến font và bật tính năng antialiased
      >
        <LayoutWrapper>{children}</LayoutWrapper> {/* Bọc nội dung con trong LayoutWrapper */}
        <Toaster /> {/* Hiển thị Toaster */}
      </body>
    </html>
  );
}
