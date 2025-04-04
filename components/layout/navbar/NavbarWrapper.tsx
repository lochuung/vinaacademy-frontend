"use client";

import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const pathname = usePathname();
    const router = useRouter();

    // Hàm xử lý điều hướng về trang chủ
    const handleNavigateHome = () => {
        router.push('/');
    };

    // Ẩn Navbar nếu ở trang dashboard
    if (pathname === "/dashboard") return null;

    return <Navbar onNavigateHome={handleNavigateHome} />;
}