import { useState, useEffect } from 'react';

interface UseVolumeControlReturn {
  volume: number;
  isMuted: boolean;
  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useVolumeControl = (
  videoRef: React.RefObject<HTMLVideoElement>
): UseVolumeControlReturn => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Keep video element in sync with volume state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, videoRef]);

  // Toggle mute state
  const toggleMute = () => setIsMuted(!isMuted);

  // Handle volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // Automatically update muted state based on volume
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return {
    volume,
    isMuted, 
    toggleMute,
    handleVolumeChange
  };
};
