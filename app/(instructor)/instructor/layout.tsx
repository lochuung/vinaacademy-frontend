"use client";

import React, {ReactNode} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
    Layers,
    Video,
    FileText,
    Settings,
    Users,
    BarChart2,
    Plus,
    MessageSquare
} from 'lucide-react';

interface InstructorLayoutProps {
    children: ReactNode;
}

export default function InstructorLayout({children}: InstructorLayoutProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/instructor/courses' && pathname === path) {
            return 'bg-gray-900 text-white';
        }
        // Special case for new course path to not highlight courses
        if (pathname === '/instructor/courses/new') {
            return path === '/instructor/courses/new' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white';
        }
        return pathname.includes(path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white';
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 bg-black">
                    <div className="flex items-center h-16 px-4 bg-gray-900">
                        <h1 className="text-xl font-bold text-white">Instructor Portal</h1>
                    </div>
                    <div className="flex flex-col flex-grow overflow-y-auto">
                        <nav className="flex-grow px-2 py-4 space-y-1">
                            <Link href="/instructor/dashboard">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/dashboard')}`}>
                                    <BarChart2 className="w-5 h-5 mr-3"/>
                                    Dashboard
                                </div>
                            </Link>
                            <Link href="/instructor/courses">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/courses')}`}>
                                    <Layers className="w-5 h-5 mr-3"/>
                                    Khóa học của tôi
                                </div>
                            </Link>
                            <Link href="/instructor/courses/new">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/courses/new')}`}>
                                    <Plus className="w-5 h-5 mr-3"/>
                                    Tạo khóa học mới
                                </div>
                            </Link>
                            <Link href="/instructor/communication">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/communication')}`}>
                                    <MessageSquare className="w-5 h-5 mr-3"/>
                                    Tin nhắn
                                </div>
                            </Link>
                            <Link href="/instructor/content">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/content')}`}>
                                    <Video className="w-5 h-5 mr-3"/>
                                    Thư viện nội dung
                                </div>
                            </Link>
                            {/* <Link href="/instructor/materials">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/materials')}`}>
                                    <FileText className="w-5 h-5 mr-3"/>
                                    Tài liệu
                                </div>
                            </Link> */}
                            <Link href="/instructor/students">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/students')}`}>
                                    <Users className="w-5 h-5 mr-3"/>
                                    Học viên
                                </div>
                            </Link>
                            <Link href="/instructor/settings">
                                <div
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/instructor/settings')}`}>
                                    <Settings className="w-5 h-5 mr-3"/>
                                    Cài đặt
                                </div>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top navigation */}
                <div className="bg-white shadow-sm z-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center md:hidden">
                                    <button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M4 6h16M4 12h16M4 18h16"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {/* Header content */}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link href="/">
                                        <button
                                            className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium">
                                            Về trang chủ
                                        </button>
                                    </Link>
                                </div>
                                {/* Profile dropdown */}
                                <div className="ml-4 relative flex-shrink-0">
                                    <div>
                                        <button
                                            className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                            <span className="sr-only">Open user menu</span>
                                            <div
                                                className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="font-medium text-gray-700">JD</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    {children}
                </main>
            </div>
        </div>
    );
}