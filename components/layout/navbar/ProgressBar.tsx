// Định nghĩa interface cho các props của component ProgressBar
interface ProgressBarProps {
    progress: number; // Prop progress là một số, đại diện cho phần trăm tiến độ
}

// Định nghĩa component ProgressBar
export const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5"> {/* Container của ProgressBar */}
            <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" // Thanh tiến độ
                style={{ width: `${progress}%` }} // Đặt chiều rộng của thanh tiến độ theo phần trăm tiến độ
            />
        </div>
    );
};

export default ProgressBar; // Xuất component ProgressBar để sử dụng ở nơi khác