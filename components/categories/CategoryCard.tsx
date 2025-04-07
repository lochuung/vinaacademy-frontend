import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";

interface CategoryCardProps {
    category: {
        id: number;
        name: string;
        description: string;
        link: string;
        image: string;
        coursesCount?: number;
    };
    featured?: boolean;
}

export function CategoryCard({category, featured = false}: CategoryCardProps) {
    // Nếu không có coursesCount, tạo một số ngẫu nhiên để hiển thị
    const coursesCount = category.coursesCount || Math.floor(Math.random() * 100) + 20;

    if (featured) {
        return (
            <Link href={category.link} className="group">
                <div
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl h-full flex flex-col">
                    <div className="relative h-48">
                        <Image src={category.image} alt={category.name} fill className="object-cover"/>
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    </div>
                    <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">
                            {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                        <div className="text-sm text-gray-500">{coursesCount} khóa học</div>
                    </div>
                    <div className="px-6 pb-6">
                        <Button
                            variant="outline"
                            className="w-full group-hover:bg-black group-hover:text-white transition-all duration-300"
                        >
                            Xem khóa học <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={category.link} className="group">
            <div
                className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
                <div className="relative h-40">
                    <Image src={category.image} alt={category.name} fill className="object-cover"/>
                </div>
                <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {category.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{category.description}</p>
                    <div className="text-sm text-gray-500">{coursesCount} khóa học</div>
                </div>
            </div>
        </Link>
    );
}