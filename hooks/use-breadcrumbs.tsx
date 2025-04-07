'use client';

import {usePathname} from 'next/navigation';
import {useMemo} from 'react';

// Định nghĩa kiểu dữ liệu cho một mục breadcrumb với tiêu đề và liên kết
type BreadcrumbItem = {
    title: string;
    link: string;
};

// Định nghĩa bản đồ route custom: mỗi đường dẫn sẽ tương ứng với một mảng các BreadcrumbItem
// Điều này cho phép đặt tiêu đề tùy chỉnh cho các đường dẫn cụ thể
const routeMapping: Record<string, BreadcrumbItem[]> = {
    '/dashboard': [{title: 'Dashboard', link: '/dashboard'}],
    '/dashboard/employee': [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Employee', link: '/dashboard/employee'}
    ],
    '/dashboard/product': [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Product', link: '/dashboard/product'}
    ]
    // Có thể thêm nhiều mapping tùy chỉnh khác nếu cần
};

// Hook useBreadcrumbs: trả về danh sách breadcrumb dựa trên đường dẫn hiện tại
export function useBreadcrumbs() {
    // Lấy đường dẫn hiện tại từ hook usePathname của Next.js
    const pathname = usePathname();

    // Sử dụng useMemo để ghi nhớ kết quả breadcrumbs dựa trên pathname
    const breadcrumbs = useMemo(() => {
        // Nếu tồn tại mapping tùy chỉnh cho pathname hiện tại, trả về mapping đó
        if (routeMapping[pathname]) {
            return routeMapping[pathname];
        }

        // Nếu không có mapping tùy chỉnh, tạo breadcrumb dựa trên từng phân đoạn của đường dẫn
        // Split pathname thành các phần, bỏ các phần rỗng
        const segments = pathname.split('/').filter(Boolean);
        return segments.map((segment, index) => {
            // Xây dựng đường dẫn cho từng breadcrumb bằng cách nối các phân đoạn lại với nhau
            const path = `/${segments.slice(0, index + 1).join('/')}`;
            return {
                // Viết hoa chữ cái đầu tiên của phân đoạn để làm tiêu đề
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                link: path
            };
        });
    }, [pathname]);

    // Trả về danh sách Breadcrumb được tính toán
    return breadcrumbs;
}