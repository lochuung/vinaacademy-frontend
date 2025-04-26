import { FC, useRef, useState, useEffect } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX, X } from 'lucide-react';

interface InstructorVideoPreviewProps {
    videoUrl: string;
    onClose?: () => void;
    isFullScreen?: boolean;
}

const InstructorVideoPreview: FC<InstructorVideoPreviewProps> = ({
    videoUrl,
    onClose,
    isFullScreen = false
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(isFullScreen);
    const [showControls, setShowControls] = useState(true);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Format time helper (MM:SS)
    const formatTime = (seconds: number): string => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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

    // Handle player events
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const onTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);
        };

        const onDurationChange = () => {
            setDuration(videoElement.duration);
        };

        const onEnded = () => {
            setIsPlaying(false);
            setShowControls(true);
        };

        videoElement.addEventListener('timeupdate', onTimeUpdate);
        videoElement.addEventListener('durationchange', onDurationChange);
        videoElement.addEventListener('ended', onEnded);
        
        return () => {
            videoElement.removeEventListener('timeupdate', onTimeUpdate);
            videoElement.removeEventListener('durationchange', onDurationChange);
            videoElement.removeEventListener('ended', onEnded);
        };
    }, []);

    // Handle fullscreen changes
    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement) {
                setShowControls(true);
            }
        };

        document.addEventListener('fullscreenchange', onFullscreenChange);
        
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, []);

    // Player controls
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => {
                    console.error("Error playing video:", err);
                    setIsPlaying(false);
                });
            }
            setIsPlaying(!isPlaying);
            setShowControls(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Lỗi khi bật chế độ toàn màn hình: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.error(`Lỗi khi thoát chế độ toàn màn hình: ${err.message}`);
            });
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`relative bg-black ${isFullscreen ? 'fixed inset-0 z-50' : 'w-full aspect-video rounded-md overflow-hidden'}`}
            onMouseMove={() => {
                setShowControls(true);
                if (controlsTimerRef.current) {
                    clearTimeout(controlsTimerRef.current);
                }
                if (isPlaying) {
                    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
                }
            }}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                playsInline
            />

            {/* Close button when in modal */}
            {onClose && (
                <button
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-1 z-20"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>
            )}
            
            {/* Video Controls Overlay */}
            <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Progress Bar */}
                <div className="flex items-center mb-2">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                </div>
                
                {/* Controls Row */}
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                        {/* Play/Pause Button */}
                        <button onClick={togglePlay} className="focus:outline-none">
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        
                        {/* Time Display */}
                        <div className="text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Volume Control */}
                        <div className="flex items-center space-x-2">
                            <button onClick={toggleMute} className="focus:outline-none">
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>
                        
                        {/* Fullscreen Button */}
                        <button onClick={toggleFullscreen} className="focus:outline-none">
                            <Maximize size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorVideoPreview;