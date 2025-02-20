"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
    {
        id: 1,
        name: "Lập trình",
        link: "/categories/programming",
        subCategories: [
            { id: 11, name: "JavaScript", link: "/categories/programming/javascript" },
            { id: 12, name: "Python", link: "/categories/programming/python" },
            { id: 13, name: "Java", link: "/categories/programming/java" },
        ],
    },
    {
        id: 2,
        name: "Thiết kế",
        link: "/categories/design",
        subCategories: [
            { id: 21, name: "UI/UX Design", link: "/categories/design/ui-ux" },
            { id: 22, name: "Graphic Design", link: "/categories/design/graphic" },
        ],
    },
];

export default function SubNavbar() {
    const [openCategory, setOpenCategory] = useState<number | null>(null);

    return (
        <div className="bg-gray-100 shadow-md relative">
            {/* Căn giữa category chính */}
            <div className="container mx-auto px-4 py-2 flex justify-center gap-x-8">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative"
                        onMouseEnter={() => setOpenCategory(category.id)}
                        onMouseLeave={() => setOpenCategory(null)}
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
                <div className="absolute left-0 top-full w-full bg-black shadow-lg border-t border-gray-600">
                    <div className="container mx-auto flex justify-center space-x-4 py-1">
                        {categories
                            .find((cat) => cat.id === openCategory)
                            ?.subCategories.map((sub) => (
                                <Link
                                    key={sub.id}
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
