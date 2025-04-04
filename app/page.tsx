"use client";

import WelcomeSection from "@/components/layout/home/WelcomeSection";
import BannerSection from "@/components/layout/home/BannerSection";
import RecentCoursesSection from "@/components/layout/home/RecentCoursesSection";
import LearningRecommendations from "@/components/layout/home/LearningRecommendations";
import TopRatedCourses from "@/components/layout/home/TopRatedCourses";
import NewCoursesSection from "@/components/layout/home/NewCoursesSection";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const userAvatar = "";

export default function Home() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const [contentLoading, setContentLoading] = useState(true);
    const username = user?.fullName || user?.email || user?.username || "Người dùng";

    // Simulate content loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setContentLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-10 py-10">
            {authLoading ? (
                <div className="w-full max-w-6xl">
                    <Skeleton className="h-24 w-full rounded-lg mb-6" />
                </div>
            ) : isAuthenticated && (
                <WelcomeSection userName={username} userAvatar={userAvatar} />
            )}

            {contentLoading ? (
                <Skeleton className="h-64 w-full max-w-6xl rounded-lg mb-6" />
            ) : (
                <BannerSection />
            )}

            <div className="w-full max-w-6xl mt-4">
                {contentLoading ? (
                    <>
                        <div className="mb-8">
                            <Skeleton className="h-10 w-48 mb-4" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Skeleton className="h-64 rounded-lg" />
                                <Skeleton className="h-64 rounded-lg" />
                                <Skeleton className="h-64 rounded-lg" />
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <Skeleton className="h-10 w-64 mb-4" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Skeleton className="h-64 rounded-lg" />
                                <Skeleton className="h-64 rounded-lg" />
                                <Skeleton className="h-64 rounded-lg" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <RecentCoursesSection />
                        <LearningRecommendations />
                        <TopRatedCourses />
                        <NewCoursesSection />
                    </>
                )}
            </div>
        </div>
    );
}