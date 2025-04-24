import { FC } from 'react';

interface ResumePromptProps {
  savedProgress: number | null;
  formatTime: (seconds: number) => string;
  handleResumePlayback: () => void;
  handleStartFromBeginning: () => void;
}

const ResumePrompt: FC<ResumePromptProps> = ({
  savedProgress,
  formatTime,
  handleResumePlayback,
  handleStartFromBeginning
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-xl max-w-md text-white">
        <h3 className="text-xl font-semibold mb-4">Tiếp tục xem?</h3>
        <p className="mb-5 text-gray-300">
          Bạn đã xem video này đến {formatTime(savedProgress || 0)}. Bạn muốn tiếp tục xem từ vị trí đó?
        </p>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition flex-1"
            onClick={handleResumePlayback}
          >
            Tiếp tục xem
          </button>
          <button
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
            onClick={handleStartFromBeginning}
          >
            Xem từ đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePrompt;
