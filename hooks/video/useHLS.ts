import { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { getAccessToken } from '@/lib/apiClient';
import { getMasterPlaylistUrl } from '@/services/videoService';

interface Quality {
  value: number;
  label: string;
}

interface UseHLSReturn {
  isLoading: boolean;
  error: string | null;
  qualities: Quality[];
  currentQuality: number;
  setCurrentQuality: (level: number) => void;
  handleRetry: () => void;
}

export const useHLS = (
  lessonId: string, 
  videoRef: React.RefObject<HTMLVideoElement>
): UseHLSReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qualities, setQualities] = useState<Quality[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const hlsRef = useRef<Hls | null>(null);
  
  const token = getAccessToken();
  const masterPlaylistUrl = getMasterPlaylistUrl(lessonId);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);

    const initHls = (): void => {
      if (Hls.isSupported()) {
        // Clean up existing HLS instance if any
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls();
        hlsRef.current = hls;

        // Setup request headers for authorization
        hls.config.xhrSetup = function (xhr: XMLHttpRequest): void {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        };

        hls.attachMedia(video);
        hls.loadSource(masterPlaylistUrl);

        hls.on(Hls.Events.MANIFEST_PARSED, (): void => {
          setIsLoading(false);

          // Set available qualities
          const qualityOptions: Quality[] = hls.levels.map((level, index) => ({
            value: index,
            label: `${level.height}p`
          }));

          setQualities([{ value: -1, label: 'Tự động' }, ...qualityOptions]);
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            setError(getErrorMessage(data.type));
            setIsLoading(false);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = masterPlaylistUrl;
        video.addEventListener('loadedmetadata', function () {
          setIsLoading(false);
        });
        setQualities([]);
      } else {
        setError("Trình duyệt của bạn không hỗ trợ HLS streaming.");
        setIsLoading(false);
      }
    };

    initHls();

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [lessonId, masterPlaylistUrl, token, videoRef]);

  // Handle quality change
  const handleQualityChange = (level: number): void => {
    setCurrentQuality(level);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  };

  // Error retry handler
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    // Reinitialize HLS (will be triggered by the next render)
  };

  // Helper function to get error messages
  const getErrorMessage = (errorType: string): string => {
    switch (errorType) {
      case Hls.ErrorTypes.NETWORK_ERROR:
        return "Lỗi kết nối mạng. Vui lòng thử lại sau.";
      case Hls.ErrorTypes.MEDIA_ERROR:
        return "Lỗi phát lại video. Vui lòng thử lại.";
      default:
        return "Không thể tải video. Vui lòng thử lại sau.";
    }
  };

  return {
    isLoading,
    error,
    qualities,
    currentQuality,
    setCurrentQuality: handleQualityChange,
    handleRetry
  };
};
