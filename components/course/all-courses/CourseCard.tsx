// components/CourseCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface CourseCardProps {
    course: {
        id: number | string;
        title: string;
        instructor: string;
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
    const [duration, setDuration] = useState(course.duration || "—");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!course.duration && isMounted) {
            // Chỉ thực hiện random ở phía client sau khi component đã được mount
            setDuration(`${Math.floor(Math.random() * 20) + 5} giờ`);
        }
    }, [course.duration, isMounted]);

    return (
        <Link href={`/courses/${course.id}`}>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-video">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                    {course.bestSeller && (
                        <div className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">
                            Bán chạy nhất
                        </div>
                    )}
                </div>

                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>

                    <div className="flex items-center gap-1 mb-2">
                        <span className="text-amber-800 font-bold">{course.rating.toFixed(1)}</span>
                        <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(course.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">({course.students})</span>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-baseline">
                            <span className="font-bold text-lg">{parseInt(course.price).toLocaleString()}₫</span>
                            {course.originalPrice && parseInt(course.originalPrice) > parseInt(course.price) && (
                                <span className="text-gray-500 line-through text-sm ml-2">
                                    {parseInt(course.originalPrice).toLocaleString()}₫
                                </span>
                            )}
                        </div>

                        <div className="mt-2 text-xs">
                            <span className="inline-block bg-gray-100 px-2 py-1 mr-1 mb-1 rounded">
                                {course.level}
                            </span>
                            <span className="inline-block bg-gray-100 px-2 py-1 mr-1 mb-1 rounded">
                                {duration}
                            </span>
                            {course.category && (
                                <span className="inline-block bg-gray-100 px-2 py-1 mr-1 mb-1 rounded">
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