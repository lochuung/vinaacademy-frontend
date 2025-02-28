import AppSidebar from '@/components/layout/app-sidebar'; // Import component AppSidebar từ thư mục components/layout
import Header from '@/components/layout/header'; // Import component Header từ thư mục components/layout
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'; // Import các component Sidebar từ thư mục components/ui
import type { Metadata } from 'next'; // Import kiểu dữ liệu Metadata từ next
import { cookies } from 'next/headers'; // Import hàm cookies từ next/headers
import AuthProvider from '@/providers/SessionProvider'; // Import AuthProvider từ thư mục providers
import OverViewPage from '@/app/dashboard/overview/page'; // Import OverViewPage từ thư mục features/overview/components

export const metadata: Metadata = {
    title: 'Admin Dashboard', // Tiêu đề của trang
    description: 'Admin Dashboard', // Mô tả của trang
};

// Định nghĩa component DashboardLayout
export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    // Lưu trạng thái của sidebar trong cookie
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

    return (
        <AuthProvider> {/* Bọc toàn bộ ứng dụng trong AuthProvider */}
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar /> {/* Hiển thị sidebar */}
                <SidebarInset>
                    <Header /> {/* Hiển thị header */}
                    {/* Nội dung chính của trang */}
                    {children}
                    {/* Kết thúc nội dung chính của trang */}
                </SidebarInset>
            </SidebarProvider>
        </AuthProvider>
    );
}
