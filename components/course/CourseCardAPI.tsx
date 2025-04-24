import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CourseDto } from "@/types/course";
import { Star, Clock, Users, Lightbulb } from "lucide-react";

interface CourseCardAPIProps {
  course: CourseDto;
}

const CourseCardAPI: React.FC<CourseCardAPIProps> = ({ course }) => {
  // Format price
  const formatPrice = (price: number) => {
    return price === 0
      ? "Miễn phí"
      : new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }).format(price);
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "Cơ bản";
      case "INTERMEDIATE":
        return "Trung cấp";
      case "ADVANCED":
        return "Nâng cao";
      default:
        return level;
    }
  };

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full"
    >
      <div className="relative h-40">
        {course.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL || ""}/images/${course.image}`}
            alt={course.name}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Lightbulb className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs py-1 px-2 rounded">
          {getLevelText(course.level)}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-3">
        <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {course.name}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-2">
          {course.description?.length > 80
            ? `${course.description.substring(0, 80)}...`
            : course.description}
        </p>

        <div className="mt-auto flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-1 text-yellow-500 fill-yellow-500" />
              <span>
                {course.rating?.toFixed(1) || "0.0"} ({course.totalRating || 0})
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{course.totalStudent || 0} học viên</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="text-sm font-semibold text-blue-600">
              {formatPrice(course.price)}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>{course.totalLesson} bài học</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCardAPI;
