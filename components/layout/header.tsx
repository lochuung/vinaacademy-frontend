import React from 'react';
import {SidebarTrigger} from '../ui/sidebar';
import {Separator} from '../ui/separator';
import {Breadcrumbs} from '../breadcrumbs';
import {UserNav} from './user-nav';
import ThemeToggle from './ThemeToggle/theme-toggle';

export default function Header() {
    return (
        // Phần header chính của trang với layout linh hoạt
        <header
            className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            {/* Phần bên trái của header: chứa nút kích hoạt sidebar, dòng phân cách và breadcrumbs */}
            <div className='flex items-center gap-2 px-4'>
                {/* Nút kích hoạt hiển thị sidebar */}
                <SidebarTrigger className='-ml-1'/>
                {/* Thanh phân cách dọc giữa sidebar và phần breadcrumbs */}
                <Separator orientation='vertical' className='mr-2 h-4'/>
                {/* Điều hướng dạng breadcrumbs */}
                <Breadcrumbs/>
            </div>

            {/* Phần bên phải của header: chứa thông tin người dùng và nút chuyển đổi giao diện */}
            <div className='flex items-center gap-2 px-4'>
                {/* Phần hiển thị khác (ẩn trên thiết bị nhỏ, chỉ hiển thị trên md trở lên) */}
                <div className='hidden md:flex'>
                </div>
                {/* Điều hướng người dùng: avatar, menu người dùng,... */}
                <UserNav/>
                {/* Nút chuyển đổi chủ đề (light/dark) */}
                <ThemeToggle/>
            </div>
        </header>
    );
}