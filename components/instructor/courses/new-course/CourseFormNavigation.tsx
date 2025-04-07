// components/course-creator/CourseFormNavigation.tsx
import {CheckCircle2} from 'lucide-react';
import {CourseSection} from '@/types/new-course';

interface CourseFormNavigationProps {
    activeSection: CourseSection;
    onSectionChange: (section: CourseSection) => void;
    isBasicSectionComplete: boolean;
    isMediaSectionComplete: boolean;
}

export default function CourseFormNavigation({
                                                 activeSection,
                                                 onSectionChange,
                                                 isBasicSectionComplete,
                                                 isMediaSectionComplete
                                             }: CourseFormNavigationProps) {
    return (
        <div className="border-b border-gray-200">
            <nav className="flex">
                <button
                    type="button"
                    className={`relative py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeSection === 'basic'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => onSectionChange('basic')}
                >
                    {isBasicSectionComplete && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2"/>
                    )}
                    <span>Thông tin cơ bản</span>
                </button>
                <button
                    type="button"
                    className={`relative py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeSection === 'media'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => onSectionChange('media')}
                >
                    {isMediaSectionComplete && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2"/>
                    )}
                    <span>Hình ảnh & Video</span>
                </button>
                <button
                    type="button"
                    className={`relative py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeSection === 'pricing'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => onSectionChange('pricing')}
                >
                    <span>Định giá</span>
                </button>
            </nav>
        </div>
    );
}