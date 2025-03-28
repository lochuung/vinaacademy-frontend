"use client"; // Chỉ định rằng file này sẽ được render phía client
import { useState, useEffect } from "react"; // Import các hook useState và useEffect từ react
import AnnouncementBar from "@/components/layout/announcement-bar/AnnouncementBar"; // Import component AnnouncementBar

// Định nghĩa component ClientWrapper
const ClientWrapper = () => {
    const [isClient, setIsClient] = useState(false); // Khởi tạo state isClient với giá trị mặc định là false

    // Sử dụng useEffect để cập nhật state isClient khi component được mount
    useEffect(() => {
        setIsClient(true); // Đặt isClient thành true
    }, []); // Mảng phụ thuộc rỗng để chỉ chạy một lần khi component được mount

    // Nếu isClient là true, hiển thị AnnouncementBar, ngược lại trả về null
    return isClient ? <AnnouncementBar onClose={() => { }} /> : null;
};

export default ClientWrapper; // Xuất component ClientWrapper để sử dụng ở nơi khác
