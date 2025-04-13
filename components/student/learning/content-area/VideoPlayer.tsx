import { FC, useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import Hls from 'hls.js';
import { getAccessToken } from '@/lib/apiClient';
import { getMasterPlaylistUrl } from '@/services/videoService';

interface VideoPlayerProps {
    // videoUrl: string;
    videoId: string;
    title: string;
    onTimeUpdate?: (currentTime: number) => void;
}

interface QualityOption {
    value: number;
    label: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoId, title, onTimeUpdate }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [qualities, setQualities] = useState<QualityOption[]>([]);
    const [currentQuality, setCurrentQuality] = useState<number>(-1);
    const [showQualityMenu, setShowQualityMenu] = useState(false);

    // HLS Configuration
    const hlsRef = useRef<Hls | null>(null);
    const token = getAccessToken();
    const masterPlaylistUrl = getMasterPlaylistUrl(videoId);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    // Initialize HLS
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        setIsLoading(true);

        const initHls = (): void => {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hlsRef.current = hls;


                // Setup request headers for authorization
                hls.config.xhrSetup = function (xhr: XMLHttpRequest): void {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                };

                hls.attachMedia(video);
                hls.loadSource(masterPlaylistUrl);

                hls.on(Hls.Events.MANIFEST_PARSED, (event: string, data: any): void => {
                    setIsLoading(false);

                    // Get quality levels
                    const levels = hls.levels;

                    // Set available qualities
                    const qualityOptions: QualityOption[] = levels.map((level, index) => {
                        const resolution = `${level.height}p`;
                        const bitrateMbps = (level.bitrate / 1000000).toFixed(1);
                        return {
                            value: index,
                            label: `${resolution}`
                        };
                    });

                    setQualities([{ value: -1, label: 'Tự động' }, ...qualityOptions]);
                });

                hls.on(Hls.Events.ERROR, function (event, data) {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                setError("Lỗi kết nối mạng. Vui lòng thử lại sau.");
                                setIsLoading(false);
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                setError("Lỗi phát lại video. Vui lòng thử lại.");
                                setIsLoading(false);
                                break;
                            default:
                                setError("Không thể tải video. Vui lòng thử lại sau.");
                                setIsLoading(false);
                                break;
                        }
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native HLS support (Safari)
                video.src = masterPlaylistUrl;
                video.addEventListener('loadedmetadata', function () {
                    setIsLoading(false);
                });
                // Hide quality selector for native HLS
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
            }
            if (video) {
                video.removeEventListener('loadedmetadata', () => { });
            }
        };
    }, [videoId]);

    // Handle quality change
    const handleQualityChange = (level: number): void => {
        setCurrentQuality(level);

        if (hlsRef.current) {
            hlsRef.current.currentLevel = level;
        }

        setShowQualityMenu(false);
    };

    // Ẩn điều khiển sau thời gian không hoạt động
    useEffect(() => {
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

        const playerElement = playerRef.current;
        playerElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
            playerElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isPlaying]);

    // Cập nhật thời gian hiện tại và tổng thời gian
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);
            if (onTimeUpdate) onTimeUpdate(videoElement.currentTime);
        };

        const handleDurationChange = () => {
            setDuration(videoElement.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        const handleLoadedData = () => {
            setIsLoading(false);
            setDuration(videoElement.duration);
        };

        const handleError = (e: Event) => {
            setIsLoading(false);
            setError("Không thể tải video. Vui lòng thử lại sau.");
            console.error("Video error:", e);
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('durationchange', handleDurationChange);
        videoElement.addEventListener('ended', handleEnded);
        videoElement.addEventListener('loadeddata', handleLoadedData);
        videoElement.addEventListener('error', handleError);

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('durationchange', handleDurationChange);
            videoElement.removeEventListener('ended', handleEnded);
            videoElement.removeEventListener('loadeddata', handleLoadedData);
            videoElement.removeEventListener('error', handleError);
        };
    }, [onTimeUpdate]);

    // Ensure video state matches isPlaying state
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;
        
        // Only synchronize the video state with isPlaying when needed
        // Don't attempt to call play() here to avoid conflicts with togglePlay
        if (!isPlaying && !videoElement.paused) {
            videoElement.pause();
        }
    }, [isPlaying]);

    // Điều khiển âm lượng
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                // Store the play promise so we can handle it properly
                playPromiseRef.current = videoRef.current.play();
                
                // Handle any errors from the play promise
                if (playPromiseRef.current) {
                    playPromiseRef.current.catch((error) => {
                        console.error('Lỗi khi phát video:', error);
                        setIsPlaying(false);
                    });
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
        }
    };

    const toggleFullscreen = () => {
        if (!playerRef.current) return;

        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error(`Lỗi khi bật chế độ toàn màn hình: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            }).catch(err => {
                console.error(`Lỗi khi thoát chế độ toàn màn hình: ${err.message}`);
            });
        }
    };

    const formatTime = (seconds: number): string => {
        if (isNaN(seconds)) return "0:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={playerRef}
            className="relative bg-black w-full aspect-video max-h-[70vh]"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video */}
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                playsInline
                poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            >
                Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>

            {/* Lớp phủ loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                </div>
            )}

            {/* Lớp phủ lỗi */}
            {/* Lớp phủ lỗi */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="text-center text-white p-4">
                        <span className="block text-lg font-medium mb-2">{error}</span>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            onClick={() => {
                                setError(null);
                                setIsLoading(true);

                                // Reinitialize HLS
                                if (hlsRef.current) {
                                    hlsRef.current.destroy();
                                    hlsRef.current = null;
                                }

                                // Trigger reloading by unmounting and remounting the component
                                if (videoRef.current) {
                                    videoRef.current.load();
                                }
                            }}
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            )}

            {/* Nút phát lớn ở giữa khi đang tạm dừng */}
            {!isPlaying && !isLoading && !error && (
                <button
                    onClick={togglePlay}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-4 hover:bg-opacity-90 transition"
                >
                    <Play size={32} className="text-black" />
                </button>
            )}

            {/* Lớp điều khiển */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                style={{ pointerEvents: showControls ? 'auto' : 'none' }}
            >
                {/* Thanh tiến trình */}
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

                {/* Nút điều khiển */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Nút Phát/Tạm dừng */}
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-blue-500 transition"
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>

                        {/* Nút tua lùi/tiến 10s */}
                        <button
                            onClick={skipBackward}
                            className="text-white hover:text-blue-500 transition"
                        >
                            <ChevronLeft size={20} />
                            <span className="sr-only">Tua lùi 10s</span>
                        </button>

                        <button
                            onClick={skipForward}
                            className="text-white hover:text-blue-500 transition"
                        >
                            <ChevronRight size={20} />
                            <span className="sr-only">Tua tiến 10s</span>
                        </button>

                        {/* Điều khiển âm lượng */}
                        <div className="flex items-center">
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-blue-500 transition mr-2"
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
                            />
                        </div>

                        {/* Hiển thị thời gian */}
                        <div className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration || 0)}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Menu chọn độ phân giải */}
                        <div className="relative flex items-center justify-center">
                            <button
                                className="text-white hover:text-blue-500 transition flex items-center justify-center"
                                onClick={() => setShowQualityMenu(!showQualityMenu)}
                            >
                                <Settings size={20} />
                            </button>

                            {showQualityMenu && qualities.length > 0 && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-700 w-48 transform transition-all duration-200 ease-in-out animate-fade-in">
                                    <div className="text-white text-sm font-medium mb-2 pb-1 border-b border-gray-700 flex items-center">
                                        <Settings size={14} className="mr-1.5 text-blue-400" />
                                        Chất lượng video
                                    </div>
                                    <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                                        {qualities.map((quality) => (
                                            <button
                                                key={quality.value}
                                                className={`group flex items-center justify-between w-full text-left px-3 py-1.5 text-sm rounded-md transition-all duration-150 ${
                                                    currentQuality === quality.value
                                                    ? 'bg-blue-600/80 text-white font-medium'
                                                    : 'text-gray-200 hover:bg-gray-700/70 hover:text-white'
                                                }`}
                                                onClick={() => handleQualityChange(quality.value)}
                                            >
                                                <span>{quality.label}</span>
                                                {currentQuality === quality.value && (
                                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Nút Toàn màn hình */}
                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-blue-500 transition"
                        >
                            <Maximize size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;