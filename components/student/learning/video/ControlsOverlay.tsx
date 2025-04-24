import { FC } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize } from 'lucide-react';
import QualityMenu from './QualityMenu';

interface ControlsOverlayProps {
  showControls: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  skipBackward: () => void;
  skipForward: () => void;
  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFullscreen: () => void;
  formatTime: (seconds: number) => string;
  qualities: { value: number; label: string }[];
  currentQuality: number;
  onQualityChange: (level: number) => void;
  showQualityMenu: boolean;
  setShowQualityMenu: (show: boolean) => void;
}

const ControlsOverlay: FC<ControlsOverlayProps> = ({
  showControls,
  isPlaying,
  isMuted,
  volume,
  currentTime,
  duration,
  togglePlay,
  skipBackward,
  skipForward,
  toggleMute,
  handleVolumeChange,
  handleSeek,
  toggleFullscreen,
  formatTime,
  qualities,
  currentQuality,
  onQualityChange,
  showQualityMenu,
  setShowQualityMenu
}) => {
  const toggleQualityMenu = () => setShowQualityMenu(!showQualityMenu);

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      style={{ pointerEvents: showControls ? 'auto' : 'none' }}
    >
      {/* Progress bar */}
      <div className="mb-2 flex items-center">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%)`,
          }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        {/* Left control group */}
        <div className="flex items-center space-x-4">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-blue-500 transition"
            aria-label={isPlaying ? "Tạm dừng" : "Phát"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Skip buttons */}
          <button
            onClick={skipBackward}
            className="text-white hover:text-blue-500 transition"
            aria-label="Tua lùi 10s"
          >
            <ChevronLeft size={20} />
            <span className="sr-only">Tua lùi 10s</span>
          </button>

          <button
            onClick={skipForward}
            className="text-white hover:text-blue-500 transition"
            aria-label="Tua tiến 10s"
          >
            <ChevronRight size={20} />
            <span className="sr-only">Tua tiến 10s</span>
          </button>

          {/* Volume control */}
          <div className="flex items-center">
            <button
              onClick={toggleMute}
              className="text-white hover:text-blue-500 transition mr-2"
              aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)`,
              }}
              aria-label="Âm lượng"
            />
          </div>

          {/* Time display */}
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </div>
        </div>

        {/* Right control group */}
        <div className="flex items-center space-x-4">
          {/* Quality selector */}
          <QualityMenu
            qualities={qualities}
            currentQuality={currentQuality}
            onQualityChange={onQualityChange}
            isOpen={showQualityMenu}
            toggleMenu={toggleQualityMenu}
          />

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-blue-500 transition"
            aria-label="Toàn màn hình"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlsOverlay;
