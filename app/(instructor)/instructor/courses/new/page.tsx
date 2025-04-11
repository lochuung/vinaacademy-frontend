"use client";

import {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {CourseData, CourseSection} from '@/types/new-course';

// Import custom components
import CourseFormHeader from '@/components/instructor/courses/new-course/CourseFormHeader';
import CourseFormNavigation from '@/components/instructor/courses/new-course/CourseFormNavigation';
import BasicInfoSection from '@/components/instructor/courses/new-course/sections/BasicInfoSection';
import MediaSection from '@/components/instructor/courses/new-course/sections/MediaSection';
import PricingSection from '@/components/instructor/courses/new-course/sections/PricingSection';
import FormFooter from '@/components/instructor/courses/new-course/FormFooter';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { boolean } from 'zod';
import { isValid } from 'date-fns';

export default function CreateCoursePage() {
    const [activeSection, setActiveSection] = useState<CourseSection>('basic');
    const [courseData, setCourseData] = useState<CourseData>({
        title: '',
        subtitle: '',
        description: '',
        category: '',
        level: '',
        language: 'vietnamese',
        price: 0,
        oldPrice: 0,
        thumbnail: null,
        promo_video: null,
        discounted: false,
        subscription: false
    });

    // Thêm state để theo dõi tiến trình
    const [progress, setProgress] = useState(33);
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
    const [previewVideo, setPreviewVideo] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const handleNumberChange = (e: InputNumberValueChangeEvent) => {
        const {name, value} = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCourseData({
            ...courseData,
            [name]: checked
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files && files.length > 0) {
            setCourseData({
                ...courseData,
                [name]: files[0]
            });

            // Tạo URL preview
            if (name === 'thumbnail') {
                const url = URL.createObjectURL(files[0]);
                setPreviewThumbnail(url);
            } else if (name === 'promo_video') {
                const url = URL.createObjectURL(files[0]);
                setPreviewVideo(url);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý tạo khóa học
        if (!isBasicSectionComplete()) {
            updateSection('basic');
            return;
        }
        if (!isMediaSectionComplete()) {
            updateSection('media');
            return;
        }
        if (!isPriceSectionComplete()) {
            updateSection('pricing');
            return;
        }
        console.log(courseData);
        // Sau khi tạo, chuyển hướng đến trang chỉnh sửa chi tiết
    };

    const updateSection = (section: CourseSection) => {
        setActiveSection(section);

        // Cập nhật tiến trình
        if (section === 'basic') setProgress(33);
        if (section === 'media') setProgress(66);
        if (section === 'pricing') setProgress(100);
    };

    // Navigate logic for form footer
    const handleBackClick = () => {
        if (activeSection === 'media') updateSection('basic');
        if (activeSection === 'pricing') updateSection('media');
    };

    const handleContinueClick = () => {
        if (activeSection === 'basic') updateSection('media');
        if (activeSection === 'media') updateSection('pricing');
    };

    // Check xem section hiện tại có đầy đủ thông tin chưa
    const isBasicSectionComplete = () => {
        return courseData.title !== '' && courseData.description !== '' &&
            courseData.category !== '' && courseData.level !== '';
    };

    const isPriceSectionComplete = () => {
        var isOk = courseData.price > 0;
        
        if (courseData.discounted) {
            isOk = courseData.oldPrice > 0 && courseData.price < courseData.oldPrice;
        }

       return isOk;
    }


    const isMediaSectionComplete = () => {
        return courseData.thumbnail !== null;
    };

    const handleThumbnailRemove = () => {
        setPreviewThumbnail(null);
        setCourseData({...courseData, thumbnail: null});
    };

    const handleVideoRemove = () => {
        setPreviewVideo(null);
        setCourseData({...courseData, promo_video: null});
    };

    return (
        <div className="py-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <CourseFormHeader progress={progress}/>

                <Card className="overflow-hidden mb-6 border-0 shadow-md">
                    <CourseFormNavigation
                        activeSection={activeSection}
                        onSectionChange={updateSection}
                        isBasicSectionComplete={isBasicSectionComplete()}
                        isMediaSectionComplete={isMediaSectionComplete()}
                        isPriceSectionComplete={isPriceSectionComplete()}
                    />

                    
                        <CardContent className="p-0">
                            {activeSection === 'basic' && (
                                <BasicInfoSection
                                    courseData={courseData}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeSection === 'media' && (
                                <MediaSection
                                    courseData={courseData}
                                    previewThumbnail={previewThumbnail}
                                    previewVideo={previewVideo}
                                    onFileChange={handleFileChange}
                                    onThumbnailRemove={handleThumbnailRemove}
                                    onVideoRemove={handleVideoRemove}
                                />
                            )}

                            {activeSection === 'pricing' && (
                                <PricingSection
                                    courseData={courseData}
                                    onNumberChange={handleNumberChange}
                                    onInputChange={handleInputChange}
                                    onCheckboxChange={handleCheckboxChange}
                                />
                            )}
                        </CardContent>

                        <FormFooter
                            activeSection={activeSection}
                            onBack={handleBackClick}
                            onContinue={handleContinueClick}
                            onSubmit={handleSubmit}
                        />
                    
                </Card>

                <div className="flex justify-center">
                    <div className="text-center text-sm text-gray-500 mt-4">
                        <p>
                            Bạn cần trợ giúp? <a href="#" className="text-black font-medium">Truy cập trung tâm hỗ
                            trợ</a> hoặc{" "}
                            <a href="#" className="text-black font-medium">liên hệ với chúng tôi</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}