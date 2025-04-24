import { useState, useEffect } from 'react';
import { getVideoProgress, saveVideoProgress } from '@/services/videoProgressService';

interface UseVideoProgressReturn {
  savedProgress: number | null;
  hasProgressLoaded: boolean;
  showResumePrompt: boolean;
  setShowResumePrompt: (show: boolean) => void;
  saveCurrentProgress: (currentTime: number) => void;
}

export const useVideoProgress = (
  lessonId: string,
  duration: number,
  videoRef: React.RefObject<HTMLVideoElement>
): UseVideoProgressReturn => {
  const [savedProgress, setSavedProgress] = useState<number | null>(null);
  const [hasProgressLoaded, setHasProgressLoaded] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Load saved video progress
  useEffect(() => {
    const loadVideoProgress = async () => {
      try {
        const progress = await getVideoProgress(lessonId);
        if (progress && progress > 0) {
          setSavedProgress(progress);
          // Only show resume prompt if the saved position is not at beginning 
          // and not too close to the end (e.g., within 10 seconds of the end)
          if (progress > 5 && (!duration || progress < duration - 10)) {
            setShowResumePrompt(true);
          }
        }
        setHasProgressLoaded(true);
      } catch (error) {
        console.error("Error loading video progress:", error);
        setHasProgressLoaded(true);
      }
    };

    loadVideoProgress();
  }, [lessonId, duration]);

  // Save progress periodically while playing
  useEffect(() => {
    const saveProgressInterval = setInterval(() => {
      if (videoRef.current &&
          videoRef.current.currentTime > 0 &&
          videoRef.current.duration > 0 &&
          !videoRef.current.paused) {

        const currentVideoTime = videoRef.current.currentTime;
        const videoDuration = videoRef.current.duration;

        // Save progress if not at beginning or very end
        if (currentVideoTime > 10 && videoDuration - currentVideoTime > 5) {
          saveVideoProgress(lessonId, currentVideoTime)
            .catch(err => console.error("Failed to save video progress", err));
        }
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(saveProgressInterval);
  }, [lessonId, videoRef]);

  // Save progress on page leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (videoRef.current && videoRef.current.currentTime > 0) {
        saveVideoProgress(lessonId, videoRef.current.currentTime);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (videoRef.current && videoRef.current.currentTime > 0) {
        saveVideoProgress(lessonId, videoRef.current.currentTime);
      }
    };
  }, [lessonId, videoRef]);

  // Function to save current progress - for manual calls (e.g., when seeking)
  const saveCurrentProgress = (currentTime: number) => {
    if (currentTime > 10 && duration - currentTime > 10) {
      saveVideoProgress(lessonId, currentTime)
        .catch(err => console.error("Failed to save video progress", err));
    }
  };

  return {
    savedProgress,
    hasProgressLoaded,
    showResumePrompt,
    setShowResumePrompt,
    saveCurrentProgress
  };
};
