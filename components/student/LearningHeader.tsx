// components/student/LearningHeader.tsx
"use client";

import { FC } from 'react';
import Link from 'next/link';

interface LearningHeaderProps {
    courseTitle: string;
    progress: number;
}

const LearningHeader: FC<LearningHeaderProps> = ({ courseTitle, progress }) => {
    return (
        <header className="bg-black text-white px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center">
                <Link href="/dashboard" className="mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white hover:text-gray-300 transition"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </Link>

                <div className="flex flex-col mr-8">
                    <h1 className="text-lg font-medium truncate max-w-sm">{courseTitle}</h1>
                    <div className="flex items-center">
                        <div className="w-32 bg-gray-700 rounded-full h-1.5 mr-2">
                            <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-400">{progress}% hoàn thành</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-white hover:text-gray-300 transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <button className="bg-white text-black hover:bg-gray-200 px-4 py-1.5 rounded text-sm font-medium transition">
                    Chia sẻ
                </button>

                <button className="text-white hover:text-gray-300 transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default LearningHeader;