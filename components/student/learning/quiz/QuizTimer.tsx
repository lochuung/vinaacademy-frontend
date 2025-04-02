import { FC, useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
    remainingTime: number; // thời gian còn lại tính bằng giây
}

const QuizTimer: FC<QuizTimerProps> = ({ remainingTime }) => {
    const [warningLevel, setWarningLevel] = useState<'normal' | 'warning' | 'danger'>('normal');

    useEffect(() => {
        // Đặt cấp độ cảnh báo dựa trên thời gian còn lại
        if (remainingTime <= 60) { // Dưới 1 phút - nguy hiểm
            setWarningLevel('danger');
        } else if (remainingTime <= 300) { // Dưới 5 phút - cảnh báo
            setWarningLevel('warning');
        } else {
            setWarningLevel('normal');
        }
    }, [remainingTime]);

    // Định dạng thời gian thành HH:MM:SS
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hours > 0 ? hours.toString().padStart(2, '0') : null,
            minutes.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].filter(Boolean).join(':');
    };

    // Xác định lớp CSS dựa trên cấp độ cảnh báo
    const getTimerClasses = () => {
        const baseClasses = "flex items-center font-mono text-white px-4 py-2 rounded-md";

        switch (warningLevel) {
            case 'danger':
                return `${baseClasses} bg-red-600 animate-pulse`;
            case 'warning':
                return `${baseClasses} bg-yellow-500`;
            default:
                return `${baseClasses} bg-blue-500`;
        }
    };

    return (
        <div className={getTimerClasses()}>
            <Clock size={18} className="mr-2" />
            <span className="text-lg">{formatTime(remainingTime)}</span>
        </div>
    );
};

export default QuizTimer;