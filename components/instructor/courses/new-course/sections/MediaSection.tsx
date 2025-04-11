import { useState } from 'react';
import { ImagePlus, Video, Info } from 'lucide-react';
import { CourseData } from '@/types/new-course';
import FileUpload from '../FileUpload';
import InfoAlert from '../InfoAlert';

interface MediaSectionProps {
    courseData: CourseData;
    previewThumbnail: string | null;
    previewVideo: string | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onThumbnailRemove: () => void;
    onVideoRemove: () => void;
}

export default function MediaSection({
    courseData,
    previewThumbnail,
    previewVideo,
    onFileChange,
    onThumbnailRemove,
    onVideoRemove
}: MediaSectionProps) {
    const [thumbnailError, setThumbnailError] = useState<string | null>(null);
    
    // This function could be called on form submission or when leaving the section
    const validateThumbnail = () => {
        if (!previewThumbnail) {
            setThumbnailError("Vui lòng tải lên ảnh thumbnail cho khóa học");
            return false;
        }
        setThumbnailError(null);
        return true;
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
        <div className="p-6 space-y-6">
            <InfoAlert title="Tại sao hình ảnh quan trọng?">
                <p>
                    Hình ảnh thể hiện trọng điểm sẽ giúp thu hút người học vào khóa học của bạn.
                    Nghiên cứu cho thấy rằng các khóa học có hình ảnh đẹp có tỷ lệ đăng ký cao hơn 25%.
                </p>
            </InfoAlert>
            <FileUpload
                id="thumbnail"
                name="thumbnail"
                label="Ảnh thumbnail"
                accept="image/*"
                icon={<ImagePlus className="mx-auto h-12 w-12 text-gray-400"/>}
                preview={previewThumbnail}
                helpText="Kích thước đề xuất: 1280x720 pixel, tỷ lệ 16:9"
                onChange={handleFileChange}
                onRemove={handleThumbnailRemove}
                required
            />
            {thumbnailError && (
                <div className="text-red-500 text-sm mt-1">{thumbnailError}</div>
            )}
            
            {/* Video upload section is commented out in your original code */}
        </div>
    );
}