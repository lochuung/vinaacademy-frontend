// components/course-creator/FileUpload.tsx
import {ReactNode} from 'react';
import {CheckCircle2} from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
    id: string;
    name: string;
    label: string;
    accept: string;
    icon: ReactNode;
    preview?: string | null;
    previewComponent?: ReactNode;
    helpText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove?: () => void;
    required?: boolean;
}

export default function FileUpload({
                                       id,
                                       name,
                                       label,
                                       accept,
                                       icon,
                                       preview,
                                       previewComponent,
                                       helpText,
                                       onChange,
                                       onRemove,
                                       required = false
                                   }: FileUploadProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {preview || previewComponent ? (
                <div className="mb-3 relative">
                    {previewComponent || (
                        <div className="overflow-hidden rounded-lg shadow-md aspect-video">
                            {accept.includes('image') ? (
                                <Image
                                    src={preview as string}
                                    width={500}
                                    height={500}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    src={preview as string}
                                    controls
                                    className="w-full h-full object-contain bg-black"
                                ></video>
                            )}
                        </div>
                    )}
                    <button
                        type="button"
                        className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={onRemove}
                    >
                        Thay đổi {accept.includes('image') ? 'ảnh' : 'video'}
                    </button>
                </div>
            ) : (
                <div
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative"
                    onClick={() => document.getElementById(id+"upload")?.click()}>
                    <div className="space-y-1 text-center">
                        {icon}
                        <div className="flex text-sm text-gray-600 justify-center">
                            <label
                                htmlFor={id}
                                className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-500"
                            >
                                <span>Tải {accept.includes('image') ? 'ảnh' : 'video'} lên</span>
                                <input
                                    id={id+"upload"}
                                    name={name}
                                    type="file"
                                    accept={accept}
                                    className="sr-only"
                                    onChange={onChange}
                                />
                            </label>
                            {accept.includes('image') && <p className="pl-1">hoặc kéo thả</p>}
                        </div>
                        <p className="text-xs text-gray-500">
                            {accept.includes('image')
                                ? 'PNG, JPG, GIF tối đa 2MB'
                                : 'MP4, MOV tối đa 100MB, độ dài 2-5 phút'}
                        </p>
                    </div>
                </div>
            )}
            <p className="mt-2 text-sm text-gray-500 flex items-center">
                <CheckCircle2 className="h-4 w-4 text-gray-400 mr-1"/>
                {helpText}
            </p>
        </div>
    );
}