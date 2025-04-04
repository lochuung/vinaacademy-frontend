'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';

// Component UserNav hiển thị thông tin người dùng và menu dropdown khi đã đăng nhập
export function UserNav() {
    // Sử dụng hook useSession để lấy thông tin phiên đăng nhập hiện tại
    const { data: session } = useSession();

    // Nếu có thông tin phiên (người dùng đã đăng nhập)
    if (session) {
        return (
            <DropdownMenu>
                {/* Button trigger cho dropdown, sử dụng avatar của người dùng */}
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                        <div className='h-8 w-8'>
                            <Avatar className='h-8 w-8'>
                                {/* Hiển thị hình ảnh avatar; nếu không có image, dùng fallback */}
                                <AvatarImage
                                    src={session.user?.image ?? ''}
                                    alt={session.user?.name ?? ''}
                                />
                                {/* Hiển thị ký tự đầu tiên của tên nếu không có hình ảnh */}
                                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                {/* Nội dung của dropdown */}
                <DropdownMenuContent className='w-56' align='end' forceMount>
                    {/* Hiển thị thông tin người dùng */}
                    <DropdownMenuLabel className='font-normal'>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                                {session.user?.name}
                            </p>
                            <p className='text-xs leading-none text-muted-foreground'>
                                {session.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Nhóm các mục trong menu dropdown */}
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                            {/* Phím tắt hiển thị cho mục Profile */}
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            New Team
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {/* Mục đăng xuất, khi click gọi hàm signOut */}
                    <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}