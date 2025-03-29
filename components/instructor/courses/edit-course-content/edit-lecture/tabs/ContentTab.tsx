import { useState } from 'react';
import { Video, FileText, MessageSquare, Monitor, HelpCircle, List, Play } from 'lucide-react';
import VideoUploader from '../content/VideoUploader';
import TextEditor from '../content/TextEditor';
import ContentTypeSelector from '../content/ContentTypeSelector';
import QuizEditor from '../content/QuizEditor';
import AssignmentEditor from '../content/AssignmentEditor';
import { Lecture } from '@/types/lecture';

interface ContentTabProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function ContentTab({ lecture, setLecture }: ContentTabProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLecture({
            ...lecture,
            [name]: value
        });
    };

    const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLecture({
            ...lecture,
            textContent: e.target.value
        });
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

    return (
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
            <ContentTypeSelector lecture={lecture} handleInputChange={handleInputChange} />

            {/* Upload video */}
            {lecture.type === 'video' && (
                <VideoUploader
                    lecture={lecture}
                    setLecture={setLecture}
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                    handleFileUpload={handleFileUpload}
                />
            )}

            {/* Editor cho text content */}
            {lecture.type === 'text' && (
                <TextEditor
                    textContent={lecture.textContent || ''}
                    handleTextContentChange={handleTextContentChange}
                />
            )}

            {/* Quiz editor */}
            {lecture.type === 'quiz' && <QuizEditor />}

            {/* Assignment editor */}
            {lecture.type === 'assignment' && <AssignmentEditor />}
        </div>
    );
}