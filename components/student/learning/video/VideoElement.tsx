import { FC } from 'react';
import { Play } from 'lucide-react';

interface VideoElementProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLoading: boolean;
  error: string | null;
  isPlaying: boolean;
  showResumePrompt: boolean;
  togglePlay: () => void;
  handleRetry: () => void;
}

const VideoElement: FC<VideoElementProps> = ({
  videoRef,
  isLoading,
  error,
  isPlaying,
  showResumePrompt,
  togglePlay,
  handleRetry
}) => {
  return (
    <>
      {/* Video element - moved here from the parent component */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        playsInline
        poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      >
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center text-white p-4">
            <span className="block text-lg font-medium mb-2">{error}</span>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleRetry}
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Big play button when paused */}
      {!isPlaying && !isLoading && !error && !showResumePrompt && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-4 hover:bg-opacity-90 transition"
        >
          <Play size={32} className="text-black" />
        </button>
      )}
    </>
  );
};

export default VideoElement;
