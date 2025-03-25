"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Save, Video, Upload, FileText, MessageSquare,
    Monitor, HelpCircle, List, Settings, Trash2, Plus, Check,
    AlertCircle, Play, Download, Lock
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Định nghĩa kiểu dữ liệu
interface Resource {
    id: string;
    title: string;
    type: string;
    url: string;
}

interface Lecture {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz' | 'assignment';
    description: string;
    videoUrl?: string;
    textContent?: string;
    duration?: number; // seconds
    isPublished: boolean;
    isPreviewable: boolean;
    isDownloadable: boolean;
    isRequired: boolean;
    resources: Resource[];
}

// Giả lập dữ liệu bài giảng
const mockLecture: Lecture = {
    id: "l3",
    title: "Biến và kiểu dữ liệu trong JavaScript",
    type: "video",
    description: "Trong bài giảng này, chúng ta sẽ tìm hiểu về các loại biến và kiểu dữ liệu trong JavaScript. Bạn sẽ học cách khai báo biến với let, const, và var, cũng như hiểu về các kiểu dữ liệu cơ bản như string, number, boolean, null, undefined, object và symbol.",
    videoUrl: "https://example.com/video.mp4",
    textContent: "",
    duration: 745, // seconds
    isPublished: false,
    isPreviewable: false,
    isDownloadable: false,
    isRequired: true,
    resources: [
        {
            id: "r1",
            title: "Slide bài giảng",
            type: "pdf",
            url: "https://example.com/slides.pdf"
        },
        {
            id: "r2",
            title: "Code mẫu",
            type: "zip",
            url: "https://example.com/code.zip"
        }
    ]
};

export default function LectureEditorPage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id as string;
    const lectureId = params.lectureId as string;

    const [lecture, setLecture] = useState<Lecture>(mockLecture);
    const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'settings'>('content');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLecture({
            ...lecture,
            [name]: value
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setLecture({
            ...lecture,
            [name]: checked
        });
    };

    const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLecture({
            ...lecture,
            textContent: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Thông báo thành công
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);

            console.log("Saving lecture:", lecture);
        } catch (error) {
            console.error("Error saving lecture:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Giả lập quá trình upload
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);

                    // Cập nhật URL sau khi upload
                    if (e.target.name === 'video-upload') {
                        setLecture({
                            ...lecture,
                            videoUrl: URL.createObjectURL(file),
                            duration: lecture.duration || 300 // Giả lập thời lượng
                        });
                    }

                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const addResource = () => {
        const newResource: Resource = {
            id: `r${Date.now()}`,
            title: "Tài liệu mới",
            type: "pdf",
            url: ""
        };

        setLecture({
            ...lecture,
            resources: [...lecture.resources, newResource]
        });
    };

    const removeResource = (resourceId: string) => {
        setLecture({
            ...lecture,
            resources: lecture.resources.filter(r => r.id !== resourceId)
        });
    };

    const handleResourceChange = (index: number, field: string, value: string) => {
        const newResources = [...lecture.resources];
        newResources[index] = {
            ...newResources[index],
            [field]: value
        };
        setLecture({ ...lecture, resources: newResources });
    };

    // Format seconds to MM:SS
    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Link href={`/instructor/courses/${courseId}/content`}>
                            <div className="mr-2 text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="h-5 w-5" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-semibold text-gray-900">Chỉnh sửa bài giảng</h1>
                    </div>
                    <div>
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" /> Lưu bài giảng
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {saveSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-green-700">Đã lưu bài giảng thành công!</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <Button
                                type="button"
                                className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'content'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('content')}
                            >
                                <Video className="h-4 w-4 inline mr-2" /> Nội dung bài giảng
                            </Button>
                            <Button
                                type="button"
                                className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'resources'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('resources')}
                            >
                                <FileText className="h-4 w-4 inline mr-2" /> Tài liệu bổ sung
                            </Button>
                            <Button
                                type="button"
                                className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'settings'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings className="h-4 w-4 inline mr-2" /> Cài đặt bài giảng
                            </Button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Nội dung bài giảng */}
                        {activeTab === 'content' && (
                            <div className="space-y-6">
                                {/* Tiêu đề bài giảng */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Tiêu đề bài giảng <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            required
                                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900"
                                            value={lecture.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Mô tả bài giảng */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Mô tả bài giảng
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900"
                                            value={lecture.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Mô tả ngắn gọn nội dung của bài giảng này
                                    </p>
                                </div>

                                {/* Loại nội dung */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Loại nội dung
                                    </label>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        <div className={`relative rounded-lg border p-4 flex flex-col ${lecture.type === 'video' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input
                                                    id="content-type-video"
                                                    name="type"
                                                    type="radio"
                                                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                                                    value="video"
                                                    checked={lecture.type === 'video'}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="content-type-video" className="ml-3 flex flex-col cursor-pointer">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        <Video className="h-4 w-4 inline mr-1" /> Video
                                                    </span>
                                                </label>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Tải lên video bài giảng
                                            </p>
                                        </div>

                                        <div className={`relative rounded-lg border p-4 flex flex-col ${lecture.type === 'text' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input
                                                    id="content-type-text"
                                                    name="type"
                                                    type="radio"
                                                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                                                    value="text"
                                                    checked={lecture.type === 'text'}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="content-type-text" className="ml-3 flex flex-col cursor-pointer">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        <FileText className="h-4 w-4 inline mr-1" /> Bài đọc
                                                    </span>
                                                </label>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Tạo bài giảng dạng văn bản
                                            </p>
                                        </div>

                                        <div className={`relative rounded-lg border p-4 flex flex-col ${lecture.type === 'quiz' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input
                                                    id="content-type-quiz"
                                                    name="type"
                                                    type="radio"
                                                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                                                    value="quiz"
                                                    checked={lecture.type === 'quiz'}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="content-type-quiz" className="ml-3 flex flex-col cursor-pointer">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        <Monitor className="h-4 w-4 inline mr-1" /> Bài kiểm tra
                                                    </span>
                                                </label>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Tạo bài kiểm tra, câu hỏi
                                            </p>
                                        </div>

                                        <div className={`relative rounded-lg border p-4 flex flex-col ${lecture.type === 'assignment' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input
                                                    id="content-type-assignment"
                                                    name="type"
                                                    type="radio"
                                                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                                                    value="assignment"
                                                    checked={lecture.type === 'assignment'}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="content-type-assignment" className="ml-3 flex flex-col cursor-pointer">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        <MessageSquare className="h-4 w-4 inline mr-1" /> Bài tập
                                                    </span>
                                                </label>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Giao bài tập thực hành
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload video */}
                                {lecture.type === 'video' && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload video
                                        </label>

                                        {lecture.videoUrl ? (
                                            <div className="mb-4">
                                                <div className="bg-gray-100 p-4 rounded-md">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <Video className="h-5 w-5 text-gray-400 mr-3" />
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-900 block">Video đã tải lên</span>
                                                                {lecture.duration && (
                                                                    <span className="text-xs text-gray-500">{formatDuration(lecture.duration)}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <Button
                                                                type="button"
                                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                                onClick={() => {
                                                                    // Giả lập xem trước
                                                                    window.alert("Xem trước video");
                                                                }}
                                                            >
                                                                <Play className="h-4 w-4 inline mr-1" />
                                                                Xem
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                className="text-sm font-medium text-black hover:text-gray-700"
                                                            >
                                                                Thay thế
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label
                                                            htmlFor="video-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                                                        >
                                                            <span>Tải video lên</span>
                                                            <input
                                                                id="video-upload"
                                                                name="video-upload"
                                                                type="file"
                                                                accept="video/*"
                                                                className="sr-only"
                                                                onChange={handleFileUpload}
                                                            />
                                                        </label>
                                                        <p className="pl-1">hoặc kéo thả vào đây</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">MP4, MOV tối đa 2GB</p>
                                                    {isUploading && (
                                                        <div className="w-full mt-2">
                                                            <div className="text-xs text-gray-500 mb-1 flex justify-between">
                                                                <span>Đang tải lên ({uploadProgress}%)</span>
                                                                <span>{Math.round(uploadProgress / 100 * 2000) / 1000} / 2 GB</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <div
                                                                    className="bg-black h-2.5 rounded-full transition-all"
                                                                    style={{ width: `${uploadProgress}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Editor cho text content */}
                                {lecture.type === 'text' && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nội dung bài đọc
                                        </label>
                                        <div className="mt-1 border border-gray-300 rounded-md">
                                            <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                                                <div className="flex space-x-2">
                                                    <Button className="p-1 hover:bg-gray-200 rounded">
                                                        <strong className="font-bold">B</strong>
                                                    </Button>
                                                    <Button className="p-1 hover:bg-gray-200 rounded italic">
                                                        <em>I</em>
                                                    </Button>
                                                    <Button className="p-1 hover:bg-gray-200 rounded underline">
                                                        <u>U</u>
                                                    </Button>
                                                    <span className="border-r border-gray-300 mx-1"></span>
                                                    <Button className="p-1 hover:bg-gray-200 rounded">
                                                        <List className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <textarea
                                                className="w-full p-3 h-64 focus:outline-none focus:ring-0 border-0 bg-white text-gray-900"
                                                placeholder="Nhập nội dung bài đọc ở đây..."
                                                value={lecture.textContent || ''}
                                                onChange={handleTextContentChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}

                                {/* Quiz editor */}
                                {lecture.type === 'quiz' && (
                                    <div className="mt-6">
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-yellow-700">
                                                        Tính năng tạo bài kiểm tra đang được phát triển. Vui lòng quay lại sau.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Assignment editor */}
                                {lecture.type === 'assignment' && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mô tả bài tập
                                        </label>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-black focus:border-black bg-white text-gray-900"
                                            placeholder="Mô tả yêu cầu bài tập ở đây..."
                                        ></textarea>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tệp đính kèm
                                            </label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                                                        >
                                                            <span>Tải tệp lên</span>
                                                            <input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">ZIP, PDF, DOC tối đa 50MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tài liệu bổ sung */}
                        {activeTab === 'resources' && (
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tài liệu bổ sung</h3>
                                    <p className="text-sm text-gray-500">
                                        Cung cấp các tài liệu bổ sung để học viên có thể tải xuống
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {lecture.resources && lecture.resources.length > 0 ? (
                                        lecture.resources.map((resource, index) => (
                                            <div key={resource.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                                                <div className="flex items-center flex-grow">
                                                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-grow pr-4">
                                                        <input
                                                            type="text"
                                                            placeholder="Tên tài liệu"
                                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm bg-transparent"
                                                            value={resource.title}
                                                            onChange={(e) => handleResourceChange(index, 'title', e.target.value)}
                                                        />
                                                        <div className="flex items-center mt-1">
                                                            <select
                                                                className="text-xs text-gray-500 border-0 p-0 pr-7 focus:ring-0 bg-transparent"
                                                                value={resource.type}
                                                                onChange={(e) => handleResourceChange(index, 'type', e.target.value)}
                                                            >
                                                                <option value="pdf">PDF</option>
                                                                <option value="doc">DOC</option>
                                                                <option value="zip">ZIP</option>
                                                                <option value="ppt">PPT</option>
                                                                <option value="xlsx">XLSX</option>
                                                            </select>
                                                            <div className="ml-2 flex items-center">
                                                                <input
                                                                    type="text"
                                                                    placeholder="URL tài liệu"
                                                                    className="block w-full border-0 p-0 text-xs text-gray-500 placeholder-gray-400 focus:ring-0 bg-transparent"
                                                                    value={resource.url}
                                                                    onChange={(e) => handleResourceChange(index, 'url', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => removeResource(resource.id)}
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-gray-500">
                                            Chưa có tài liệu bổ sung nào.
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Button
                                        type="button"
                                        onClick={addResource}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Thêm tài liệu
                                    </Button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    Mẹo: Hãy cung cấp tài liệu bổ sung liên quan để học viên có thể củng cố kiến thức sau khi học xong bài giảng.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Cài đặt bài giảng */}
                        {activeTab === 'settings' && (
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Cài đặt bài giảng</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                                checked={lecture.isPublished}
                                                onChange={(e) => setLecture({ ...lecture, isPublished: e.target.checked })}
                                            />
                                            <span className="ml-2 text-sm text-gray-900">Xuất bản bài giảng này</span>
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500 ml-6">
                                            Học viên sẽ có thể xem bài giảng này nếu đã xuất bản
                                        </p>
                                    </div>

                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                                checked={lecture.isPreviewable}
                                                onChange={(e) => setLecture({ ...lecture, isPreviewable: e.target.checked })}
                                            />
                                            <span className="ml-2 text-sm text-gray-900 flex items-center">
                                                <Play className="h-4 w-4 mr-1 text-gray-500" />
                                                Cho phép xem trước
                                            </span>
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500 ml-6">
                                            Bài giảng này sẽ có thể xem miễn phí như một phần xem trước khóa học
                                        </p>
                                    </div>

                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                                checked={lecture.isDownloadable}
                                                onChange={(e) => setLecture({ ...lecture, isDownloadable: e.target.checked })}
                                            />
                                            <span className="ml-2 text-sm text-gray-900 flex items-center">
                                                <Download className="h-4 w-4 mr-1 text-gray-500" />
                                                Cho phép tải về
                                            </span>
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500 ml-6">
                                            Học viên có thể tải video bài giảng này về thiết bị của họ
                                        </p>
                                    </div>

                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                                checked={lecture.isRequired}
                                                onChange={(e) => setLecture({ ...lecture, isRequired: e.target.checked })}
                                            />
                                            <span className="ml-2 text-sm text-gray-900 flex items-center">
                                                <Lock className="h-4 w-4 mr-1 text-gray-500" />
                                                Bắt buộc hoàn thành
                                            </span>
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500 ml-6">
                                            Học viên phải hoàn thành bài giảng này trước khi chuyển tiếp
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Thời lượng bài giảng</h4>
                                            {lecture.type === 'video' && lecture.duration ? (
                                                <div className="flex items-center">
                                                    <Video className="h-4 w-4 text-gray-500 mr-2" />
                                                    <span className="text-sm text-gray-700">{formatDuration(lecture.duration)}</span>
                                                    <Button
                                                        type="button"
                                                        className="ml-3 text-sm text-blue-600 hover:text-blue-800"
                                                        onClick={() => {
                                                            const durationStr = prompt("Nhập thời lượng (phút:giây)", formatDuration(lecture.duration || 0));
                                                            if (durationStr) {
                                                                const [mins, secs] = durationStr.split(':').map(Number);
                                                                if (!isNaN(mins) && !isNaN(secs)) {
                                                                    setLecture({
                                                                        ...lecture,
                                                                        duration: mins * 60 + secs
                                                                    });
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        Chỉnh sửa
                                                    </Button>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500">
                                                    {lecture.type === 'video'
                                                        ? 'Tải lên video để tự động xác định thời lượng.'
                                                        : 'Không áp dụng cho loại nội dung này.'}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                        <Link href={`/instructor/courses/${courseId}/content`}>
                            <Button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Quay lại
                            </Button>
                        </Link>
                        <div>
                            <Button
                                type="button"
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Xem trước
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? 'Đang lưu...' : 'Lưu bài giảng'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}