"use client";
import { Star, Users, Award, Clock, Globe } from 'lucide-react';
import Image from 'next/image';

interface Instructor {
  id: number;
  name: string;
  email: string;
  isOwner: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: any;
}

interface CourseProps {
  course: {
    id: string;
    name: string;
    description: string;
    image: string;
    rating: number;
    totalRating: number;
    totalStudent: number;
    level: string;
    language: string;
    instructors: Instructor[];
    category: Category;
    updatedAt?: string;
  };
}

export default function CourseHeader({ course }: CourseProps) {
  const mainInstructor = course.instructors.find(instr => instr.isOwner) || course.instructors[0];
  
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="lg:w-2/3 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold" id="course-title">{course.name}</h1>
            <p className="text-xl" id="course-description">{course.description}</p>
          </div>
          
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Đánh giá khóa học">
            <div className="flex items-center">
              <span className="text-[#f69c08] font-bold" aria-label={`Đánh giá ${course.rating.toFixed(1)} trên 5 sao`}>
                {course.rating.toFixed(1)}
              </span>
              <div className="flex text-[#f69c08] ml-1" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                    className={i < Math.floor(course.rating) ? "" : "opacity-50"}
                  />
                ))}
              </div>
              <span className="ml-1 underline">({course.totalRating} đánh giá)</span>
            </div>
            
            <div className="flex items-center">
              <Users size={16} className="mr-1" aria-hidden="true" />
              <span>{course.totalStudent.toLocaleString()} học viên</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <p className="mr-3">Tạo bởi <span className="underline font-medium">{mainInstructor.name}</span></p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm" aria-label="Thông tin thêm">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" aria-hidden="true" />
              <span>Cập nhật {course.updatedAt || "10/2023"}</span>
            </div>
            <div className="flex items-center">
              <Globe size={16} className="mr-1" aria-hidden="true" />
              <span>{course.language}</span>
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-1" aria-hidden="true" />
              <span>Trình độ {course.level === 'BEGINNER' ? 'Cơ bản' : course.level === 'INTERMEDIATE' ? 'Trung cấp' : 'Nâng cao'}</span>
            </div>
          </div>
        </div>
        
        {/* Course Preview Image on Mobile */}
        <div className="lg:hidden w-full">
          <div className="aspect-video rounded-lg overflow-hidden relative">
            <Image 
              src={course.image}
              alt={`Ảnh khóa học ${course.name}`}
              fill
              className="object-cover"
              priority // Important images should load with priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
