"use client"; // Chỉ định đây là client component (chạy ở phía client)

// Nhập hook usePathname từ next/navigation để lấy đường dẫn hiện tại
import { usePathname } from "next/navigation";
// Nhập thành phần Navbar và ClientWrapper để hiển thị các thành phần của layout
import Navbar from "./navbar/Navbar";
import ClientWrapper from "../layout/announcementbar/ClientWrapper";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    // Lấy đường dẫn hiện tại của trang web
    const pathname = usePathname();

    // Kiểm tra xem có nên ẩn Navbar và ClientWrapper hay không.
    // Nếu đang ở các trang dashboard cụ thể, thì ẩn các thành phần layout này.
    const hideLayout = pathname === "/dashboard" ||
        pathname === "/dashboard/overview" ||
        pathname === "/dashboard/users" ||
        pathname === "/dashboard/courses";

    return (
        <>
            {/* Nếu không ẩn layout, hiển thị ClientWrapper */}
            {!hideLayout && <ClientWrapper />}
            {/* Nếu không ẩn layout, hiển thị Navbar */}
            {!hideLayout && <Navbar />}
            {/* Hiển thị các thành phần con (children) */}
            {children}
        </>
    );
}
