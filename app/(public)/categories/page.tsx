"use client";

import { useState, useEffect } from "react";
import { categoriesData } from "@/data/categories";
import { HeroSection } from "@/components/categories/HeroSection";
import { FeaturedCategories } from "@/components/categories/FeaturedCategories";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { FAQSection } from "@/components/categories/FAQSection";
import { CallToAction } from "@/components/categories/CallToAction";

// FAQ Data
const faqData = [
    {
        question: "Làm thế nào để bắt đầu một khóa học?",
        answer: "Bạn có thể bắt đầu bằng cách duyệt qua các danh mục, chọn một khóa học phù hợp với nhu cầu của bạn, đăng ký và bắt đầu học ngay trên nền tảng của chúng tôi."
    },
    {
        question: "Các khóa học có chứng chỉ không?",
        answer: "Nhiều khóa học của chúng tôi cung cấp chứng chỉ hoàn thành. Thông tin về chứng chỉ được liệt kê rõ trong trang chi tiết của từng khóa học."
    },
    {
        question: "Làm thế nào để liên hệ với giảng viên?",
        answer: "Sau khi đăng ký khóa học, bạn có thể liên hệ trực tiếp với giảng viên thông qua hệ thống nhắn tin nội bộ hoặc diễn đàn của khóa học."
    },
    {
        question: "Tôi có thể học trên thiết bị nào?",
        answer: "Nền tảng của chúng tôi hoạt động trên tất cả các thiết bị hiện đại bao gồm máy tính, máy tính bảng và điện thoại thông minh. Bạn cũng có thể tải xuống các bài học để học offline."
    },
    {
        question: "Làm thế nào để yêu cầu hoàn tiền?",
        answer: "Chúng tôi cung cấp chính sách hoàn tiền trong vòng 30 ngày nếu bạn không hài lòng với khóa học. Bạn có thể gửi yêu cầu hoàn tiền thông qua trang hỗ trợ của chúng tôi."
    }
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState(categoriesData);
    const [searchQuery, setSearchQuery] = useState("");
    const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);

    // Lọc danh mục khi người dùng tìm kiếm
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setCategories(categoriesData);
        } else {
            const filtered = categoriesData.filter(
                (category) =>
                    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    category.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setCategories(filtered);
        }
    }, [searchQuery]);

    // Lấy 3 danh mục nổi bật (có nhiều khóa học nhất)
    useEffect(() => {
        // Giả sử categoriesData đã có trường coursesCount hoặc tương tự
        // Trong thực tế bạn sẽ cần tính toán hoặc lấy từ API
        const featured = [...categoriesData]
            .sort((a, b) => {
                const aCount = a.coursesCount || 0;
                const bCount = b.coursesCount || 0;
                return bCount - aCount;
            })
            .slice(0, 3);

        setFeaturedCategories(featured);
    }, []);

    const resetSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Featured Categories */}
            <FeaturedCategories categories={featuredCategories} />

            {/* All Categories */}
            <CategoriesGrid
                categories={categories}
                resetSearch={resetSearch}
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqData} />

            {/* Call to Action */}
            <CallToAction
                title="Sẵn sàng bắt đầu hành trình học tập?"
                description="Khám phá hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu trong nhiều lĩnh vực khác nhau."
                buttonText="Tìm khóa học ngay"
                buttonHref="/courses"
            />
        </div>
    );
}