// components/course-creator/sections/MediaSection.tsx
import {ImagePlus, Video, Info} from 'lucide-react';
import {CourseData} from '@/types/new-course';
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
                onChange={onFileChange}
                onRemove={onThumbnailRemove}
                required
            />

            {/* <FileUpload
                id="promo_video"
                name="promo_video"
                label="Video giới thiệu"
                accept="video/*"
                icon={<Video className="mx-auto h-12 w-12 text-gray-400"/>}
                preview={previewVideo}
                helpText="Video giới thiệu ngắn sẽ giúp học viên hiểu rõ hơn về nội dung khóa học"
                onChange={onFileChange}
                onRemove={onVideoRemove}
            /> */}
        </div>
    );
}