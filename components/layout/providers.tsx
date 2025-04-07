'use client'; // Đánh dấu đây là client component
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
// Nhập SessionProvider cùng với kiểu props của nó từ next-auth để quản lý phiên đăng nhập
import {SessionProvider, SessionProviderProps} from 'next-auth/react';

// Component Providers bọc các thành phần con bên trong các provider cần thiết như ThemeProvider và SessionProvider
export default function Providers({
                                      session,   // Dữ liệu phiên (session) được truyền vào để quản lý trạng thái đăng nhập
                                      children   // Các thành phần con sẽ được hiển thị bên trong Providers
                                  }: {
    session: SessionProviderProps['session'];
    children: React.ReactNode;
}) {
    return (
        <>
            {/* ThemeProvider cung cấp khả năng chuyển đổi chủ đề (theme) cho ứng dụng */}
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                {/* SessionProvider cung cấp thông tin phiên (session) cho các component con */}
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </>
    );
}