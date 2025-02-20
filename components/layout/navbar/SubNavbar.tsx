"use client";
import { useState } from "react";
import Link from "next/link";
import { categoriesData } from "@/data/categories";

export default function SubNavbar() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [isHoveringSub, setIsHoveringSub] = useState<boolean>(false);

    return (
        <div
            className="bg-gray-100 shadow-md relative"
            onMouseLeave={() => {
                if (!isHoveringSub) setOpenCategory(null);
            }}
        >
            {/* Thanh danh mục chính */}
            <div className="container mx-auto px-4 py-2 flex justify-center gap-x-8">
                {categoriesData.map((category) => (
                    <div
                        key={category.name}
                        className="relative"
                        onMouseEnter={() => setOpenCategory(category.name)}
                    >
                        <Link
                            href={category.link}
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                        >
                            {category.name}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Sub-category dropdown */}
            {openCategory !== null && (
                <div
                    className="absolute left-0 top-full w-full bg-black shadow-lg border-t border-gray-600"
                    onMouseEnter={() => setIsHoveringSub(true)}
                    onMouseLeave={() => {
                        setIsHoveringSub(false);
                        setOpenCategory(null);
                    }}
                >
                    <div className="container mx-auto flex justify-center space-x-4 py-1">
                        {categoriesData
                            .find((cat) => cat.name === openCategory)
                            ?.subCategories.map((sub) => (
                                <Link
                                    key={sub.name}
                                    href={sub.link}
                                    className="px-4 py-1 text-white hover:bg-gray-700 transition rounded-md"
                                >
                                    {sub.name}
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
