"use client"; // Chỉ định đây là client component (chạy ở phía client)

// Nhập hook usePathname từ next/navigation để lấy đường dẫn hiện tại
import { usePathname } from "next/navigation";
// Nhập thành phần Navbar và ClientWrapper để hiển thị các thành phần của layout
import Navbar from "./navbar/Navbar";
import ClientWrapper from "../layout/announcementbar/ClientWrapper";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    // Lấy đường dẫn hiện tại của trang web
    const pathname = usePathname();

    // Mảng các tiền tố đường dẫn cần ẩn layout
    const hiddenLayoutPaths = [
        "/dashboard",
        "/dashboard/overview",
        "/dashboard/users",
        "/dashboard/courses"
    ];

    // Kiểm tra xem có nên ẩn layout dựa trên đường dẫn hiện tại
    const hideLayout =
        // Kiểm tra các đường dẫn dashboard cụ thể
        hiddenLayoutPaths.includes(pathname) ||
        // Kiểm tra tất cả các đường dẫn instructor - ẩn tất cả các trang instructor
        (pathname && pathname.startsWith("/instructor")) ||
        // Kiểm tra tất cả các đường dẫn admin - ẩn tất cả các trang admin
        (pathname && pathname.startsWith("/admin")) ||
        // Kiểm tra tất cả các đường dẫn student - ẩn tất cả các trang student
        (pathname && pathname.startsWith("/learning"));

        return (
            <div className="relative">
                 {/* Nếu không ẩn layout, hiển thị ClientWrapper/Navbar */}
                {!hideLayout && (
                    <div className="fixed top-0 left-0 right-0 z-50 w-full">
                        <ClientWrapper />
                        <Navbar />
                    </div>
                )}
                {/* Nếu ẩn thì giữ nguyên top, còn không thì lùi top xuông */}
                <div className={`pt-${!hideLayout ? "36" : "0"}`}>
                    {children}

                </div>
            </div>
           
        );
}