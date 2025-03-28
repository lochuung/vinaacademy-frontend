interface ProgressBarProps {
    progress: number; // Prop progress là một số, đại diện cho phần trăm tiến độ
}

// Định nghĩa component ProgressBar
export const ProgressBar = ({ progress }: ProgressBarProps) => {
    // Chọn màu sắc dựa trên tiến trình
    const getProgressColor = () => {
        if (progress === 100) return "bg-black"; // Hoàn thành 100% -> màu đen
        if (progress >= 80) return "bg-gray-900";
        if (progress >= 60) return "bg-gray-700";
        if (progress >= 40) return "bg-gray-500";
        if (progress >= 20) return "bg-gray-400";
        return "bg-gray-300"; // Chưa đạt 20% -> màu xám nhạt
    };

    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
                className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
