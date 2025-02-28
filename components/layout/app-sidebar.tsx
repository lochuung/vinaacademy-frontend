'use client'; // Chỉ định rằng file này sẽ được render phía client
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import các component Avatar từ thư mục components/ui/avatar
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'; // Import các component Collapsible từ thư mục components/ui/collapsible
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'; // Import các component DropdownMenu từ thư mục components/ui/dropdown-menu
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar
} from '@/components/ui/sidebar'; // Import các component Sidebar từ thư mục components/ui/sidebar
import { navItems } from '@/constants/data'; // Import dữ liệu navItems từ thư mục constants/data
import {
    BadgeCheck,
    Bell,
    ChevronRight,
    ChevronsUpDown,
    CreditCard,
    GalleryVerticalEnd,
    LogOut
} from 'lucide-react'; // Import các icon từ thư viện lucide-react
import { signOut, useSession } from 'next-auth/react'; // Import các hàm signOut và useSession từ thư viện next-auth/react
import Link from 'next/link'; // Import component Link từ thư viện next/link
import { usePathname } from 'next/navigation'; // Import hook usePathname từ thư viện next/navigation
import * as React from 'react'; // Import tất cả các export từ thư viện react
import { Icons } from '../icons'; // Import các icon từ thư mục icons
import PageContainer from '@/components/layout/page-container'; // Import component PageContainer từ thư mục components/layout/page-container
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import các component Card từ thư mục components/ui/card

export const company = {
    name: 'Vina Academy', // Tên công ty
    logo: GalleryVerticalEnd, // Logo công ty
    plan: 'Đồng hành cùng tri thức Việt' // Gói dịch vụ của công ty
};

// Định nghĩa component AppSidebar
export default function AppSidebar() {
    const { data: session } = useSession(); // Lấy dữ liệu phiên từ useSession
    const pathname = usePathname(); // Lấy đường dẫn hiện tại
    const { state, isMobile } = useSidebar(); // Lấy trạng thái sidebar và kiểm tra xem có phải là thiết bị di động không

    return (
        <Sidebar collapsible='icon'> {/* Sidebar có thể thu gọn */}
            <SidebarHeader>
                <div className='flex gap-2 py-2 text-sidebar-accent-foreground'>
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                        <company.logo className='size-4' /> {/* Hiển thị logo công ty */}
                    </div>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>{company.name}</span> {/* Hiển thị tên công ty */}
                        <span className='truncate text-xs'>{company.plan}</span> {/* Hiển thị gói dịch vụ của công ty */}
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className='overflow-x-hidden'>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel> {/* Nhãn nhóm sidebar */}
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                            return item?.items && item?.items?.length > 0 ? (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className='group/collapsible'
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={pathname === item.url}
                                            >
                                                {item.icon && <Icon />} {/* Hiển thị icon của mục */}
                                                <span>{item.title}</span> {/* Hiển thị tiêu đề của mục */}
                                                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' /> {/* Hiển thị icon ChevronRight */}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={pathname === subItem.url}
                                                        >
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span> {/* Hiển thị tiêu đề của sub-item */}
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url}
                                    >
                                        <Link href={item.url}>
                                            <Icon /> {/* Hiển thị icon của mục */}
                                            <span>{item.title}</span> {/* Hiển thị tiêu đề của mục */}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size='lg'
                                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                                >
                                    <Avatar className='h-8 w-8 rounded-lg'>
                                        <AvatarImage
                                            src={session?.user?.image || ''}
                                            alt={session?.user?.name || ''}
                                        />
                                        <AvatarFallback className='rounded-lg'>
                                            {session?.user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>
                                            {session?.user?.name || ''}
                                        </span>
                                        <span className='truncate text-xs'>
                                            {session?.user?.email || ''}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className='ml-auto size-4' /> {/* Hiển thị icon ChevronsUpDown */}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                                side='bottom'
                                align='end'
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className='p-0 font-normal'>
                                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                        <Avatar className='h-8 w-8 rounded-lg'>
                                            <AvatarImage
                                                src={session?.user?.image || ''}
                                                alt={session?.user?.name || ''}
                                            />
                                            <AvatarFallback className='rounded-lg'>
                                                {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
                                                    'CN'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='grid flex-1 text-left text-sm leading-tight'>
                                            <span className='truncate font-semibold'>
                                                {session?.user?.name || ''}
                                            </span>
                                            <span className='truncate text-xs'>
                                                {' '}
                                                {session?.user?.email || ''}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

