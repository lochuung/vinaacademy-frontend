"use client"; // Chỉ định đây là client component

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const pathname = usePathname();

    // Ẩn Navbar nếu ở trang dashboard
    if (pathname === "/dashboard") return null;

    return <Navbar />;
}
