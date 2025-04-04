"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import ClientWrapper from "./announcement-bar/ClientWrapper";
import Footer from "./Footer";
import LogoClickHandler from "./LogoClickHandler"; // Import the new component

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Danh sách từ khóa để ẩn layout nếu đường dẫn chứa bất kỳ từ nào trong đây
    const hiddenKeywords = ["/dashboard", "/instructor", "/admin", "/learning"];

    // Kiểm tra nếu pathname chứa một trong các từ khóa trên
    const shouldHideLayout = hiddenKeywords.some(keyword => pathname.includes(keyword));

    return (
        <>
            {!shouldHideLayout && <ClientWrapper />}
            {!shouldHideLayout && <Navbar />}
            {!shouldHideLayout && <LogoClickHandler />}
            {children}
            {!shouldHideLayout && <Footer />}
        </>
    );
}