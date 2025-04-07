'use client'; // Chỉ định rằng file này sẽ được render phía client
import {MoonIcon, SunIcon} from '@radix-ui/react-icons'; // Import các icon MoonIcon và SunIcon từ thư viện @radix-ui/react-icons
import {useTheme} from 'next-themes'; // Import hook useTheme từ thư viện next-themes

import {Button} from '@/components/ui/button'; // Import component Button từ thư mục components/ui/button
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'; // Import các component DropdownMenu từ thư mục components/ui/dropdown-menu

// Định nghĩa kiểu dữ liệu cho props của component ThemeToggle
type CompProps = {};

// Định nghĩa component ThemeToggle
export default function ThemeToggle({}: CompProps) {
    const {setTheme} = useTheme(); // Sử dụng hook useTheme để lấy hàm setTheme

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <SunIcon
                        className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'/> {/* Hiển thị icon SunIcon */}
                    <MoonIcon
                        className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'/> {/* Hiển thị icon MoonIcon */}
                    <span className='sr-only'>Toggle theme</span> {/* Văn bản ẩn cho mục đích truy cập */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light {/* Tùy chọn để chuyển sang theme sáng */}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark {/* Tùy chọn để chuyển sang theme tối */}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    System {/* Tùy chọn để sử dụng theme hệ thống */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}