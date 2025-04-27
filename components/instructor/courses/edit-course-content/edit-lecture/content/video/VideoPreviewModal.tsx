import { useRef, useState, useEffect } from 'react';
import { X, Loader2, AlertTriangle, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useHLS } from '@/hooks/video/useHLS';

interface VideoPreviewModalProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    hlsVideoRef: React.MutableRefObject<HTMLVideoElement>;
    lectureId: string;
    lectureTitle: string;
    duration: number;
    onClose: () => void;
}

interface HLSVideoPreviewProps {
    videoRef: React.MutableRefObject<HTMLVideoElement>;
    lectureId: string;
    onPlayingChange: (isPlaying: boolean) => void;
}

const HLSVideoPreview: React.FC<HLSVideoPreviewProps> = ({ videoRef, lectureId, onPlayingChange }) => {
    // Use HLS hook to handle streaming
    const { isLoading, error } = useHLS(lectureId, videoRef);

    // Listen for play/pause events from the video element
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handlePlay = () => onPlayingChange(true);
        const handlePause = () => onPlayingChange(false);

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);

        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
        };
    }, [videoRef, onPlayingChange]);

    return (
        <div className="relative w-full aspect-video">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 mb-4">
                            <svg className="animate-spin" viewBox="0 0 50 50">
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    className="text-gray-300"
                                />
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="75"
                                    className="text-blue-500"
                                />
                            </svg>
                        </div>
                        <p className="text-white text-lg font-medium">Đang tải video...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-10">
                    <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                    <h3 className="text-center text-xl font-medium text-white mb-2">Không thể phát video</h3>
                    <p className="text-center text-gray-300 max-w-md">{error}</p>
                    <button 
                        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full rounded-lg shadow-lg"
                playsInline
                controls
                autoPlay
            ></video>
        </div>
    );
};

const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
    videoRef,
    hlsVideoRef,
    lectureId,
    lectureTitle,
    duration,
    onClose
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(duration);
    
    const modalRef = useRef<HTMLDivElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            } else if (e.key === ' ' || e.key === 'k') {
                // Space or K key toggles play/pause
                e.preventDefault();
                togglePlay();
            } else if (e.key === 'f') {
                // F key toggles fullscreen
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === 'm') {
                // M key toggles mute
                e.preventDefault();
                toggleMute();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Initialize video event listeners
    useEffect(() => {
        const video = duration > 0 ? hlsVideoRef.current : videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        const handleDurationChange = () => {
            setVideoDuration(video.duration);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
        };
    }, [duration, hlsVideoRef, videoRef]);

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Auto-hide controls
    useEffect(() => {
        const startControlsTimer = () => {
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
            
            if (isPlaying) {
                controlsTimerRef.current = setTimeout(() => {
                    setShowControls(false);
                }, 3000);
            }
        };
        
        startControlsTimer();
        
        return () => {
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
        };
    }, [isPlaying, showControls]);

    const handleClose = () => {
        // Pause video before closing
        if (videoRef.current) {
            videoRef.current.pause();
        }
        if (hlsVideoRef.current) {
            hlsVideoRef.current.pause();
        }
        // Exit fullscreen if active
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        onClose();
    };

    const togglePlay = () => {
        const video = duration > 0 ? hlsVideoRef.current : videoRef.current;
        if (!video) return;
        
        if (isPlaying) {
            video.pause();
        } else {
            video.play().catch(error => {
                console.error('Error attempting to play video:', error);
            });
        }
        setIsPlaying(!isPlaying);
        setShowControls(true);
    };

    const toggleMute = () => {
        const video = duration > 0 ? hlsVideoRef.current : videoRef.current;
        if (!video) return;
        
        video.muted = !video.muted;
        setIsMuted(!isMuted);
        setShowControls(true);
    };

    const toggleFullscreen = () => {
        if (!playerContainerRef.current) return;
        
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
        setShowControls(true);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = duration > 0 ? hlsVideoRef.current : videoRef.current;
        if (!video) return;
        
        const newTime = parseFloat(e.target.value);
        video.currentTime = newTime;
        setCurrentTime(newTime);
        setShowControls(true);
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = duration > 0 ? hlsVideoRef.current : videoRef.current;
        if (!video) return;
        
        const value = parseFloat(e.target.value);
        video.volume = value;
        setIsMuted(value === 0);
    };

    // Hide native controls when using custom controls
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.controls = false;
        }
        if (hlsVideoRef.current) {
            hlsVideoRef.current.controls = false;
        }
    }, []);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center" // Increased z-index to 100
            ref={modalRef}
            onClick={(e) => {
                if (e.target === modalRef.current) {
                    handleClose();
                }
            }}
        >
            <div 
                className="relative bg-black w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
                ref={playerContainerRef}
                onMouseEnter={() => setShowControls(true)}
                onMouseMove={() => {
                    setShowControls(true);
                    if (controlsTimerRef.current) {
                        clearTimeout(controlsTimerRef.current);
                        if (isPlaying) {
                            controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
                        }
                    }
                }}
                onMouseLeave={() => {
                    if (isPlaying) setShowControls(false);
                }}
            >
                {/* Title bar */}
                <div 
                    className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent z-20 p-4 flex justify-between items-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                >
                    <span className="text-white font-medium text-lg truncate">{lectureTitle}</span>
                    <button
                        type="button"
                        className="text-white bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-all"
                        onClick={handleClose}
                        aria-label="Đóng"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Video player */}
                {duration > 0 ? (
                    <HLSVideoPreview
                        videoRef={hlsVideoRef}
                        lectureId={lectureId}
                        onPlayingChange={setIsPlaying}
                    />
                ) : (
                    <div className="relative w-full aspect-video">
                        <video
                            ref={videoRef as React.RefObject<HTMLVideoElement>}
                            className="w-full h-full object-contain"
                            playsInline
                            autoPlay
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        ></video>
                    </div>
                )}
                
                {/* Play/Pause button overlay */}
                <button
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-5 hover:bg-black/60 transition-all ${isPlaying ? 'opacity-0' : 'opacity-100'} ${showControls ? '' : 'hidden'}`}
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Dừng' : 'Phát'}
                >
                    {isPlaying ? (
                        <Pause className="h-10 w-10 text-white" />
                    ) : (
                        <Play className="h-10 w-10 text-white" />
                    )}
                </button>
                
                {/* Video controls */}
                <div 
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Progress slider */}
                    <div className="relative group">
                        <input
                            type="range"
                            min="0"
                            max={videoDuration || 100}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-blue-500 group-hover:h-2 transition-all"
                            style={{
                                background: `linear-gradient(to right, #3b82f6 ${(currentTime / (videoDuration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (videoDuration || 1)) * 100}%)`
                            }}
                        />
                    </div>
                    
                    {/* Controls bar */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-4">
                            {/* Play/Pause button */}
                            <button 
                                onClick={togglePlay}
                                className="text-white hover:text-blue-300 focus:outline-none transition-colors"
                                aria-label={isPlaying ? 'Dừng' : 'Phát'}
                            >
                                {isPlaying ? (
                                    <Pause className="h-6 w-6" />
                                ) : (
                                    <Play className="h-6 w-6" />
                                )}
                            </button>
                            
                            {/* Volume control */}
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={toggleMute}
                                    className="text-white hover:text-blue-300 focus:outline-none transition-colors"
                                    aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                                >
                                    {isMuted ? (
                                        <VolumeX className="h-5 w-5" />
                                    ) : (
                                        <Volume2 className="h-5 w-5" />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={isMuted ? 0 : (hlsVideoRef.current?.volume || 1)}
                                    onChange={handleVolumeChange}
                                    className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                            
                            {/* Time display */}
                            <div className="text-white text-sm flex space-x-1">
                                <span>{formatTime(currentTime)}</span>
                                <span>/</span>
                                <span>{formatTime(videoDuration)}</span>
                            </div>
                        </div>
                        
                        {/* Right side controls */}
                        <div className="flex items-center space-x-4">
                            {/* Fullscreen button */}
                            <button 
                                onClick={toggleFullscreen}
                                className="text-white hover:text-blue-300 focus:outline-none transition-colors"
                                aria-label={isFullscreen ? 'Thoát chế độ toàn màn hình' : 'Chế độ toàn màn hình'}
                            >
                                {isFullscreen ? (
                                    <Minimize className="h-5 w-5" />
                                ) : (
                                    <Maximize className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPreviewModal;
