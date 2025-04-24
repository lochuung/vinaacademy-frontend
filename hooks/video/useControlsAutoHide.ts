import { useState, useRef, useEffect } from 'react';

interface UseControlsAutoHideReturn {
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  registerContainer: (element: HTMLDivElement | null) => void;
}

export const useControlsAutoHide = (isPlaying: boolean): UseControlsAutoHideReturn => {
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    
    // Also show controls when playback state changes
    setShowControls(true);
    
    if (isPlaying && controlsTimeoutRef.current === null) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else if (!isPlaying) {
      // If paused, clear any existing timeouts
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = null;
      }
    }

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const registerContainer = (element: HTMLDivElement | null) => {
    containerRef.current = element;
  };

  return { 
    showControls, 
    setShowControls, 
    registerContainer 
  };
};
