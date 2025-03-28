"use client";

import Link from "next/link";
import WelcomeSection from "@/components/layout/home/WelcomeSection";
import BannerSection from "@/components/layout/home/BannerSection";
import RecentCoursesSection from "@/components/layout/home/RecentCoursesSection";
import LearningRecommendations from "@/components/layout/home/LearningRecommendations";
import TopRatedCourses from "@/components/layout/home/TopRatedCourses";
import NewCoursesSection from "@/components/layout/home/NewCoursesSection";

const userName = "Nguyễn Văn A";
const userAvatar = "";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-10 py-10">
      <WelcomeSection userName={userName} userAvatar={userAvatar} />

      <BannerSection />

      <div className="w-full max-w-6xl mt-4">
        <RecentCoursesSection />

        <LearningRecommendations />

        <TopRatedCourses />

        <NewCoursesSection />
      </div>
    </div>
  );
}