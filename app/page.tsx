import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/ui/Carousel";
import Footer from "@/components/ui/Footer";
import Banner from "@/components/ui/Banner";

const userName = "Nguyễn Văn A";
const userAvatar = "";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-10 py-10">

      {/* Welcome Section */}
      <div className="flex items-center justify-start gap-4 py-4 w-full max-w-6xl px-5">
        {/* Avatar */}
        {userAvatar ? (
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 border-2 border-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a9 9 0 0115 0"
              />
            </svg>
          </div>
        )}

        {/* Welcome Text */}
        <span className="text-xl font-semibold text-black">Welcome back, {userName}! 👋</span>
      </div>

      <div className="w-full max-w-6xl px-5">
        <Banner />
      </div>
      <div className="w-full max-w-6xl">
        {/* Tiêu đề và liên kết */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-black px-4">Tiếp tục học</h1>
          <Link href="/my-courses" className="text-lg font-medium text-blue-600 hover:text-blue-800 pr-4">
            Khóa học của tôi
          </Link>
        </div>

        {/* 3 khóa học gần nhất */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white p-6 rounded-xl shadow-md">
              <Image
                src={`/course${num}.jpg`}
                alt={`Course ${num}`}
                width={180}
                height={120}
                className="rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-4 text-black">Khóa học {num}</h3>
              <p className="text-gray-600 text-sm">Mô tả ngắn về khóa học.</p>
            </div>
          ))}
        </div>

        {/* Gợi ý học tập */}
        <div className="mt-4 w-full">
          <h2 className="text-3xl font-bold text-black px-4">Học gì tiếp theo?</h2>
          <h5 className="text-xl font-semibold text-gray-800 mt-1 px-4">Gợi ý cho bạn</h5>
          <div className="w-full">
            <Carousel />
          </div>
          {/* Được đánh giá cao */}
          <h5 className="text-xl font-semibold text-gray-800 px-4">Được đánh giá cao</h5>
          <div className="w-full">
            <Carousel />
          </div>
        </div>

        {/* Các khóa học mới */}
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-black px-4">Khám phá khóa học mới</h2>
          <div className="w-full">
            <Carousel />
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}