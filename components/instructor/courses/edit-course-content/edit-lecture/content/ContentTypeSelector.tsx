import {Video, FileText, MessageSquare, Monitor} from 'lucide-react';
import {Lecture} from '@/types/lecture';

interface ContentTypeSelectorProps {
    lecture: Lecture;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ContentTypeSelector({lecture, handleInputChange}: ContentTypeSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Loại nội dung
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TypeOption
                    id="content-type-video"
                    type="video"
                    label="Video"
                    description="Tải lên video bài giảng"
                    icon={<Video className="h-4 w-4 inline mr-1"/>}
                    isSelected={lecture.type === 'video'}
                    onChange={handleInputChange}
                />

                <TypeOption
                    id="content-type-text"
                    type="text"
                    label="Bài đọc"
                    description="Tạo bài giảng dạng văn bản"
                    icon={<FileText className="h-4 w-4 inline mr-1"/>}
                    isSelected={lecture.type === 'text'}
                    onChange={handleInputChange}
                />

                <TypeOption
                    id="content-type-quiz"
                    type="quiz"
                    label="Bài kiểm tra"
                    description="Tạo bài kiểm tra, câu hỏi"
                    icon={<Monitor className="h-4 w-4 inline mr-1"/>}
                    isSelected={lecture.type === 'quiz'}
                    onChange={handleInputChange}
                />

                <TypeOption
                    id="content-type-assignment"
                    type="assignment"
                    label="Bài tập"
                    description="Giao bài tập thực hành"
                    icon={<MessageSquare className="h-4 w-4 inline mr-1"/>}
                    isSelected={lecture.type === 'assignment'}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

interface TypeOptionProps {
    id: string;
    type: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TypeOption({id, type, label, description, icon, isSelected, onChange}: TypeOptionProps) {
    return (
        <div
            className={`relative rounded-lg border p-4 flex flex-col ${isSelected ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
            <div className="flex items-center">
                <input
                    id={id}
                    name="type"
                    type="radio"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                    value={type}
                    checked={isSelected}
                    onChange={onChange}
                />
                <label htmlFor={id} className="ml-3 flex flex-col cursor-pointer">
                    <span className="block text-sm font-medium text-gray-900">
                        {icon} {label}
                    </span>
                </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
                {description}
            </p>
        </div>
    );
}