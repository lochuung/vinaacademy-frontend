// components/course-creator/CourseFormNavigation.tsx
import {CheckCircle2, Info, FileText, Image, DollarSign} from 'lucide-react';
import {CourseSection} from '@/types/new-course';
import { motion } from 'framer-motion';

interface CourseFormNavigationProps {
    activeSection: CourseSection;
    onSectionChange: (section: CourseSection) => void;
    isBasicSectionComplete: boolean;
    isMediaSectionComplete: boolean;
    isPriceSectionComplete: boolean;
}

export default function CourseFormNavigation({
    activeSection,
    onSectionChange,
    isBasicSectionComplete,
    isMediaSectionComplete,
    isPriceSectionComplete
}: CourseFormNavigationProps) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <nav className="-mb-px flex flex-wrap sm:flex-nowrap">
                <motion.button
                    type="button"
                    className={`relative py-4 px-3 sm:px-6 flex-1 flex justify-center sm:justify-start items-center font-medium text-sm transition-all ${
                        activeSection === 'basic'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                    }`}
                    onClick={() => onSectionChange('basic')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex items-center">
                        <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full mr-2 transition-colors ${
                            isBasicSectionComplete 
                                ? 'bg-green-100 text-green-600' 
                                : activeSection === 'basic' 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-gray-100 text-gray-500'
                        }`}>
                            {isBasicSectionComplete ? (
                                <CheckCircle2 className="h-5 w-5"/>
                            ) : (
                                <FileText className="h-5 w-5"/>
                            )}
                        </div>
                        <span className="hidden sm:block">Thông tin cơ bản</span>
                        <span className="block sm:hidden">Cơ bản</span>
                    </div>
                    
                    {activeSection === 'basic' && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                            layoutId="activeNavIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </motion.button>
                
                <motion.button
                    type="button"
                    className={`relative py-4 px-3 sm:px-6 flex-1 flex justify-center sm:justify-start items-center font-medium text-sm transition-all ${
                        activeSection === 'media'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                    }`}
                    onClick={() => onSectionChange('media')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex items-center">
                        <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full mr-2 transition-colors ${
                            isMediaSectionComplete 
                                ? 'bg-green-100 text-green-600' 
                                : activeSection === 'media' 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-gray-100 text-gray-500'
                        }`}>
                            {isMediaSectionComplete ? (
                                <CheckCircle2 className="h-5 w-5"/>
                            ) : (
                                <Image className="h-5 w-5"/>
                            )}
                        </div>
                        <span className="hidden sm:block">Hình ảnh</span>
                        <span className="block sm:hidden">Ảnh</span>
                    </div>
                    
                    {activeSection === 'media' && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                            layoutId="activeNavIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </motion.button>
                
                <motion.button
                    type="button"
                    className={`relative py-4 px-3 sm:px-6 flex-1 flex justify-center sm:justify-start items-center font-medium text-sm transition-all ${
                        activeSection === 'pricing'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                    }`}
                    onClick={() => onSectionChange('pricing')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex items-center">
                        <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full mr-2 transition-colors ${
                            isPriceSectionComplete 
                                ? 'bg-green-100 text-green-600' 
                                : activeSection === 'pricing' 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-gray-100 text-gray-500'
                        }`}>
                            {isPriceSectionComplete ? (
                                <CheckCircle2 className="h-5 w-5"/>
                            ) : (
                                <DollarSign className="h-5 w-5"/>
                            )}
                        </div>
                        <span className="hidden sm:block">Định giá</span>
                        <span className="block sm:hidden">Giá</span>
                    </div>
                    
                    {activeSection === 'pricing' && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                            layoutId="activeNavIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </motion.button>
            </nav>
        </div>
    );
}