// components/lecture/tabs/ContentTab.tsx
import {useState} from 'react';
import VideoUploader from '../content/VideoUploader';
import TextEditor from '../content/TextEditor';
import QuizEditor from '../content/quiz/QuizEditor';
import AssignmentEditor from '../content/AssignmentEditor';
import {Lecture} from '@/types/lecture';
import { Video, FileText, MessageSquare, Monitor } from 'lucide-react';

interface ContentTabProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function ContentTab({lecture, setLecture}: ContentTabProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        
        // For other fields, simply update the value
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

    // Get appropriate type label and icon for the current lecture type
    const getTypeInfo = () => {
        switch(lecture.type) {
            case 'video':
                return {
                    label: 'Video',
                    icon: <Video className="h-4 w-4 inline mr-1"/>
                };
            case 'reading':
                return {
                    label: 'Bài đọc',
                    icon: <FileText className="h-4 w-4 inline mr-1"/>
                };
            case 'quiz':
                return {
                    label: 'Bài kiểm tra',
                    icon: <Monitor className="h-4 w-4 inline mr-1"/>
                };
            case 'assignment':
                return {
                    label: 'Bài tập',
                    icon: <MessageSquare className="h-4 w-4 inline mr-1"/>
                };
            default:
                return {
                    label: 'Không xác định',
                    icon: <FileText className="h-4 w-4 inline mr-1"/>
                };
        }
    };

    const { label: typeLabel, icon: typeIcon } = getTypeInfo();

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

            {/* Display lecture type (read-only) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loại nội dung
                </label>
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                            {typeIcon}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">{typeLabel}</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                Loại nội dung không thể thay đổi sau khi đã tạo. Để sử dụng loại nội dung khác, vui lòng xóa bài giảng này và tạo bài giảng mới.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content based on type */}
            {lecture.type === 'video' && (
                <VideoUploader
                    lecture={lecture}
                    setLecture={setLecture}
                />
            )}

            {lecture.type === 'reading' && (
                <TextEditor
                    textContent={lecture.textContent || ''}
                    handleTextContentChange={handleTextContentChange}
                />
            )}

            {lecture.type === 'quiz' && (
                <QuizEditor lecture={lecture} setLecture={setLecture}/>
            )}

            {lecture.type === 'assignment' && <AssignmentEditor/>}
        </div>
    );
}