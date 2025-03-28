"use client";

import { useRouter } from 'next/navigation';

interface HomeLinkProps {
    className?: string;
    children: React.ReactNode;
}

export default function HomeLink({ className, children }: HomeLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Xóa mọi state hoặc query parameters
        window.sessionStorage.removeItem('searchFilters');

        // Force reload đến trang chủ
        window.location.href = '/';
    };

    return (
        <a
            href="/"
            className={className}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}