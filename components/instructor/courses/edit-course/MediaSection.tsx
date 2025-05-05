import { useRef, useState } from 'react';
import { ImagePlus, X, Check, Image as ImageIcon, Upload } from 'lucide-react';
import { CourseData } from '@/types/new-course';
import InfoAlert from '../new-course/InfoAlert';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaSectionProps {
    courseData: CourseData;
    previewThumbnail: string | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onThumbnailRemove: () => void;
}

export default function MediaSection({
    courseData,
    previewThumbnail,
    onFileChange,
    onThumbnailRemove
}: MediaSectionProps) {
    const [thumbnailError, setThumbnailError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // This function could be called on form submission or when leaving the section
    const validateThumbnail = () => {
        if (!previewThumbnail) {
            setThumbnailError("Vui lòng tải lên ảnh thumbnail cho khóa học");
            return false;
        }
        setThumbnailError(null);
        return true;
    };
    
    // Handle drag events for file upload
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Create a synthetic event
            const fileInput = fileInputRef.current;
            if (fileInput) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(e.dataTransfer.files[0]);
                fileInput.files = dataTransfer.files;
                
                const event = {
                    target: fileInput
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                
                onFileChange(event);
                setThumbnailError(null);
            }
        }
    };
    
    // Modified onFileChange handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(e);
        setThumbnailError(null); // Clear error when file is selected
    };
    
    // Modified onThumbnailRemove
    const handleThumbnailRemove = () => {
        onThumbnailRemove();
        // Optionally set error when thumbnail is removed
        setThumbnailError("Vui lòng tải lên ảnh thumbnail cho khóa học");
    };

    return (
        <div className="p-6 space-y-8">
            <InfoAlert 
                title="Cập nhật hình ảnh khóa học" 
                icon={<ImageIcon className="h-6 w-6 text-blue-500" />}
                variant="blue"
            >
                <p>
                    Hình ảnh thu hút sẽ giúp khóa học của bạn nổi bật và thu hút người học.
                    Bạn có thể giữ nguyên ảnh hiện tại hoặc tải lên ảnh mới để cập nhật giao diện.
                </p>
            </InfoAlert>
            
            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Ảnh thumbnail <span className="text-red-500">*</span></h3>
                <p className="text-sm text-gray-500">Ảnh thumbnail sẽ xuất hiện trong danh sách khóa học và là ấn tượng đầu tiên với học viên</p>
                
                {!previewThumbnail ? (
                    <div 
                        className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                            isDragging 
                                ? 'border-blue-500 bg-blue-50' 
                                : thumbnailError 
                                    ? 'border-red-300 bg-red-50' 
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="thumbnail"
                            id="thumbnail-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        
                        <div className="space-y-2">
                            <div className="mx-auto h-12 w-12 text-gray-400">
                                <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                            </div>
                            <div className="flex flex-col items-center text-sm text-gray-600">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    type="button"
                                    className="relative px-4 py-2 font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    <Upload className="h-4 w-4 inline mr-1" />
                                    Chọn ảnh
                                </motion.button>
                                <p className="mt-3">hoặc kéo và thả file ảnh vào đây</p>
                                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF tối đa 10MB</p>
                                <p className="text-xs text-gray-500">Kích thước đề xuất: 1280x720 pixel, tỷ lệ 16:9</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm"
                    >
                        <div className="relative">
                            <img 
                                src={previewThumbnail} 
                                alt="Thumbnail preview" 
                                className="w-full object-cover h-52 sm:h-64"
                            />
                            <div className="absolute top-0 right-0 p-2">
                                <button
                                    type="button"
                                    onClick={handleThumbnailRemove}
                                    className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                                >
                                    <X className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/70 to-transparent p-4">
                                <div className="flex items-center text-white">
                                    <Check className="h-5 w-5 mr-1.5 text-green-400" />
                                    <span className="text-sm font-medium">Đã chọn thumbnail</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    {courseData.thumbnail?.name || "Ảnh thumbnail hiện tại"}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Thay đổi ảnh
                                </motion.button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
                
                <AnimatePresence>
                    {thumbnailError && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm mt-2 overflow-hidden"
                        >
                            {thumbnailError}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}