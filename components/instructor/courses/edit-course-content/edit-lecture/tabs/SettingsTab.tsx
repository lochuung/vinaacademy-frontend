import { Play, Download, Lock, Video } from 'lucide-react';
import { Lecture } from '@/types/lecture';
import SettingsCheckbox from '../settings/SettingsCheckbox';

interface SettingsTabProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function SettingsTab({ lecture, setLecture }: SettingsTabProps) {
    // Format seconds to MM:SS
    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cài đặt bài giảng</h3>
            </div>

            <div className="space-y-6">
                <SettingsCheckbox
                    checked={lecture.isPublished}
                    onChange={(checked) => setLecture({ ...lecture, isPublished: checked })}
                    label="Xuất bản bài giảng này"
                    description="Học viên sẽ có thể xem bài giảng này nếu đã xuất bản"
                />

                <SettingsCheckbox
                    checked={lecture.isPreviewable}
                    onChange={(checked) => setLecture({ ...lecture, isPreviewable: checked })}
                    label="Cho phép xem trước"
                    description="Bài giảng này sẽ có thể xem miễn phí như một phần xem trước khóa học"
                    icon={<Play className="h-4 w-4 mr-1 text-gray-500" />}
                />

                <SettingsCheckbox
                    checked={lecture.isDownloadable}
                    onChange={(checked) => setLecture({ ...lecture, isDownloadable: checked })}
                    label="Cho phép tải về"
                    description="Học viên có thể tải video bài giảng này về thiết bị của họ"
                    icon={<Download className="h-4 w-4 mr-1 text-gray-500" />}
                />

                <SettingsCheckbox
                    checked={lecture.isRequired}
                    onChange={(checked) => setLecture({ ...lecture, isRequired: checked })}
                    label="Bắt buộc hoàn thành"
                    description="Học viên phải hoàn thành bài giảng này trước khi chuyển tiếp"
                    icon={<Lock className="h-4 w-4 mr-1 text-gray-500" />}
                />

                <div className="pt-6 border-t border-gray-200">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Thời lượng bài giảng</h4>
                        {lecture.type === 'video' && lecture.duration ? (
                            <div className="flex items-center">
                                <Video className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700">{formatDuration(lecture.duration)}</span>
                                <button
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
                                </button>
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
    );
}