"use client"; // Chỉ định đây là client component

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import ClientWrapper from "../layout/announcementbar/ClientWrapper";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Ẩn Navbar và ClientWrapper nếu ở trang dashboard
    const hideLayout = pathname === "/dashboard" || pathname === "/dashboard/overview" || pathname === "/dashboard/users" || pathname === "/dashboard/courses";

    return (
        <>
            {!hideLayout && <ClientWrapper />}
            {!hideLayout && <Navbar />}
            {children}
        </>
    );
}
