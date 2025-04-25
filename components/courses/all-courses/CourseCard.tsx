import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface CourseCardProps {
    course: {
        id: number | string;
        slug: string;
        title: string;
        instructor?: string;
        image: string;
        price: string;
        originalPrice?: string;
        rating: number;
        students: number;
        level: string;
        duration?: string;
        bestSeller?: boolean;
        category?: string;
    };
}

export function CourseCard({ course }: CourseCardProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link href={`/courses/${course.slug}`}>
            <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {course.bestSeller && (
                        <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded">
                            Bán chạy nhất
                        </div>
                    )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {course.title}
                    </h3>

                    {course.instructor && (
                        <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
                    )}

                    <div className="flex items-center gap-1 mb-3">
                        <span className="text-black font-bold">{course.rating.toFixed(1)}</span>
                        <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(course.rating) ? "text-yellow-400  fill-yellow-400" : "text-gray-300 fill-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({course.students.toLocaleString()})</span>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-baseline justify-between">
                            <span className="font-bold text-lg">
                                {parseInt(course.price) === 0
                                    ? "Miễn phí"
                                    : `${parseInt(course.price).toLocaleString("vi-VN")}₫`}
                            </span>
                            {course.originalPrice && parseInt(course.originalPrice) > parseInt(course.price) ? (
                                <span className="text-gray-500 line-through text-sm">
                                    {parseInt(course.originalPrice).toLocaleString("vi-VN")}₫
                                </span>
                            ) : <span></span>}
                        </div>

                        <div className="mt-3 text-xs flex flex-wrap gap-1">
                            <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                                {course.level}
                            </span>
                            {course.category && (
                                <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                                    {course.category}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}