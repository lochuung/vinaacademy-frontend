"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Upload,
    Info,
    CheckCircle2,
    ImagePlus,
    Video,
    DollarSign,
    Save,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Định nghĩa kiểu dữ liệu cho file trong TypeScript
type CourseFile = File | null;

interface CourseData {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: string;
    language: string;
    price: string;
    thumbnail: CourseFile;
    promo_video: CourseFile;
    discounted: boolean;
    subscription: boolean;
}

export default function CreateCoursePage() {
    const [activeSection, setActiveSection] = useState<'basic' | 'media' | 'pricing'>('basic');
    const [courseData, setCourseData] = useState<CourseData>({
        title: '',
        subtitle: '',
        description: '',
        category: '',
        level: '',
        language: 'vietnamese',
        price: '',
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
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCourseData({
            ...courseData,
            [name]: checked
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
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
        console.log(courseData);
        // Sau khi tạo, chuyển hướng đến trang chỉnh sửa chi tiết
    };

    const updateSection = (section: 'basic' | 'media' | 'pricing') => {
        setActiveSection(section);

        // Cập nhật tiến trình
        if (section === 'basic') setProgress(33);
        if (section === 'media') setProgress(66);
        if (section === 'pricing') setProgress(100);
    };

    // Check xem section hiện tại có đầy đủ thông tin chưa
    const isBasicSectionComplete = () => {
        return courseData.title !== '' && courseData.description !== '' &&
            courseData.category !== '' && courseData.level !== '';
    };

    const isMediaSectionComplete = () => {
        return courseData.thumbnail !== null;
    };

    return (
        <div className="py-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Link href="/instructor/courses">
                            <div className="p-2 mr-2 rounded-full hover:bg-gray-200 transition-colors">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-500">
                        <span className="mr-2">Tiến trình:</span>
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <Progress value={progress} className="h-full" />
                        </div>
                        <span className="ml-2">{progress}%</span>
                    </div>
                </div>

                <Card className="overflow-hidden mb-6 border-0 shadow-md">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                type="button"
                                className={`relative py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeSection === 'basic'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => updateSection('basic')}
                            >
                                {isBasicSectionComplete() && (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                )}
                                <span>Thông tin cơ bản</span>
                            </button>
                            <button
                                type="button"
                                className={`relative py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeSection === 'media'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => updateSection('media')}
                            >
                                {isMediaSectionComplete() && (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                )}
                                <span>Hình ảnh & Video</span>
                            </button>
                            <button
                                type="button"
                                className={`relative py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeSection === 'pricing'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => updateSection('pricing')}
                            >
                                <span>Định giá</span>
                            </button>
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="p-0">
                            {activeSection === 'basic' && (
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Tên khóa học <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            required
                                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
                                            placeholder="Ví dụ: Lập trình Web với React và Node.js"
                                            value={courseData.title}
                                            onChange={handleInputChange}
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Đặt tên dễ hiểu và hấp dẫn để thu hút học viên (60-100 ký tự)
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả ngắn
                                        </label>
                                        <input
                                            type="text"
                                            name="subtitle"
                                            id="subtitle"
                                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
                                            placeholder="Mô tả ngắn gọn về khóa học"
                                            value={courseData.subtitle}
                                            onChange={handleInputChange}
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Mô tả ngắn gọn về những gì học viên sẽ học được (120-160 ký tự)
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả chi tiết <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={6}
                                            required
                                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
                                            placeholder="Mô tả chi tiết về nội dung khóa học, đối tượng học viên, kết quả đạt được..."
                                            value={courseData.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                Danh mục <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="category"
                                                name="category"
                                                required
                                                className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
                                                value={courseData.category}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Chọn danh mục</option>
                                                <option value="web-development">Lập trình Web</option>
                                                <option value="mobile-development">Lập trình Mobile</option>
                                                <option value="data-science">Data Science</option>
                                                <option value="ui-ux">UI/UX Design</option>
                                                <option value="marketing">Marketing</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                                                Trình độ <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="level"
                                                name="level"
                                                required
                                                className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
                                                value={courseData.level}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Chọn trình độ</option>
                                                <option value="beginner">Người mới bắt đầu</option>
                                                <option value="intermediate">Trung cấp</option>
                                                <option value="advanced">Nâng cao</option>
                                                <option value="all-levels">Tất cả trình độ</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'media' && (
                                <div className="p-6 space-y-6">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
                                        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm text-blue-700">
                                            <p className="font-medium mb-1">Tại sao hình ảnh quan trọng?</p>
                                            <p>Hình ảnh và video chất lượng cao sẽ giúp thu hút người học vào khóa học của bạn. Nghiên cứu cho thấy rằng các khóa học có hình ảnh đẹp có tỷ lệ đăng ký cao hơn 25%.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Ảnh thumbnail <span className="text-red-500">*</span>
                                        </label>

                                        {previewThumbnail ? (
                                            <div className="mb-3 relative">
                                                <div className="overflow-hidden rounded-lg shadow-md aspect-video">
                                                    <img
                                                        src={previewThumbnail}
                                                        alt="Thumbnail preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                    onClick={() => {
                                                        setPreviewThumbnail(null);
                                                        setCourseData({ ...courseData, thumbnail: null });
                                                    }}
                                                >
                                                    Thay đổi ảnh
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                                                <div className="space-y-1 text-center">
                                                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-500">
                                                            <span>Tải ảnh lên</span>
                                                            <input
                                                                id="thumbnail"
                                                                name="thumbnail"
                                                                type="file"
                                                                accept="image/*"
                                                                className="sr-only"
                                                                onChange={handleFileChange}
                                                            />
                                                        </label>
                                                        <p className="pl-1">hoặc kéo thả</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 2MB</p>
                                                </div>
                                            </div>
                                        )}
                                        <p className="mt-2 text-sm text-gray-500 flex items-center">
                                            <CheckCircle2 className="h-4 w-4 text-gray-400 mr-1" />
                                            Kích thước đề xuất: 1280x720 pixel, tỷ lệ 16:9
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Video giới thiệu
                                        </label>

                                        {previewVideo ? (
                                            <div className="mb-3 relative">
                                                <div className="overflow-hidden rounded-lg shadow-md aspect-video bg-black">
                                                    <video
                                                        src={previewVideo}
                                                        controls
                                                        className="w-full h-full object-contain"
                                                    ></video>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                    onClick={() => {
                                                        setPreviewVideo(null);
                                                        setCourseData({ ...courseData, promo_video: null });
                                                    }}
                                                >
                                                    Thay đổi video
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="space-y-1 text-center">
                                                    <Video className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label
                                                            htmlFor="promo_video"
                                                            className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-500"
                                                        >
                                                            <span>Tải video lên</span>
                                                            <input
                                                                id="promo_video"
                                                                name="promo_video"
                                                                type="file"
                                                                accept="video/*"
                                                                className="sr-only"
                                                                onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">MP4, MOV tối đa 100MB, độ dài 2-5 phút</p>
                                                </div>
                                            </div>
                                        )}
                                        <p className="mt-2 text-sm text-gray-500 flex items-center">
                                            <CheckCircle2 className="h-4 w-4 text-gray-400 mr-1" />
                                            Video giới thiệu ngắn sẽ giúp học viên hiểu rõ hơn về nội dung khóa học
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'pricing' && (
                                <div className="p-6 space-y-6">
                                    <div className="bg-green-50 p-5 rounded-lg border border-green-200 flex items-start">
                                        <DollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                        <div className="text-sm text-green-700">
                                            <p className="font-medium mb-1">Định giá khóa học của bạn</p>
                                            <p>Đặt giá hợp lý cho khóa học của bạn. Nếu đây là khóa học đầu tiên của bạn, bạn có thể cân nhắc đặt giá thấp hơn để thu hút học viên. Khóa học có giá trị trong khoảng 200,000đ - 1,500,000đ thường có tỷ lệ đăng ký cao nhất.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                            Giá khóa học (VNĐ) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="focus:ring-black focus:border-black block w-full pr-16 p-3 sm:text-base border-gray-300 rounded-md bg-white text-gray-900"
                                                placeholder="0"
                                                min="0"
                                                step="1000"
                                                value={courseData.price}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm mr-4">VNĐ</span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Giá khóa học cần phải trong khoảng từ 0 VNĐ (miễn phí) đến 5,000,000 VNĐ
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Các tùy chọn giá</h3>
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5 mt-1">
                                                        <input
                                                            id="discounted"
                                                            name="discounted"
                                                            type="checkbox"
                                                            className="custom-checkbox"
                                                            checked={courseData.discounted}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <label htmlFor="discounted" className="text-base font-medium text-gray-700">
                                                            Bật khuyến mãi
                                                        </label>
                                                        <p className="text-sm text-gray-500 mt-1">Tạo mã giảm giá hoặc đặt giá khuyến mãi cho khóa học</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5 mt-1">
                                                        <input
                                                            id="subscription"
                                                            name="subscription"
                                                            type="checkbox"
                                                            className="custom-checkbox"
                                                            checked={courseData.subscription}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <label htmlFor="subscription" className="text-base font-medium text-gray-700">
                                                            Đưa vào gói subscription
                                                        </label>
                                                        <p className="text-sm text-gray-500 mt-1">Cho phép học viên truy cập khóa học này thông qua gói subscription</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                            {activeSection !== 'basic' && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        if (activeSection === 'media') updateSection('basic');
                                        if (activeSection === 'pricing') updateSection('media');
                                    }}
                                    className="flex items-center"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Quay lại
                                </Button>
                            )}

                            {activeSection === 'basic' && (
                                <div></div> // Placeholder trống để giữ layout
                            )}

                            {activeSection !== 'pricing' ? (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        if (activeSection === 'basic') updateSection('media');
                                        if (activeSection === 'media') updateSection('pricing');
                                    }}
                                    className="bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Tiếp tục
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Tạo khóa học
                                </Button>
                            )}
                        </div>
                    </form>
                </Card>

                <div className="flex justify-center">
                    <div className="text-center text-sm text-gray-500 mt-4">
                        <p>Bạn cần trợ giúp? <a href="#" className="text-black font-medium">Truy cập trung tâm hỗ trợ</a> hoặc <a href="#" className="text-black font-medium">liên hệ với chúng tôi</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}