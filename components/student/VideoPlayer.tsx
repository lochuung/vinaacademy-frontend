// components/student/VideoPlayer.tsx
import { FC, useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, title, onTimeUpdate }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);

    // Ẩn điều khiển sau thời gian không hoạt động
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        const playerElement = playerRef.current;
        playerElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearTimeout(timeout);
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

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('durationchange', handleDurationChange);
        videoElement.addEventListener('ended', handleEnded);

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('durationchange', handleDurationChange);
            videoElement.removeEventListener('ended', handleEnded);
        };
    }, [onTimeUpdate]);

    // Phát/Tạm dừng
    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch((error) => {
                    console.error('Lỗi khi phát video:', error);
                    setIsPlaying(false);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Điều khiển âm lượng
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
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
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={playerRef}
            className="relative bg-black"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video */}
            <video
                ref={videoRef}
                className="w-full h-auto max-h-[70vh]"
                onClick={togglePlay}
                poster="/api/thumbnail/lesson-1"
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>

            {/* Lớp điều khiển */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
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
                        {/* Nút Cài đặt */}
                        <button className="text-white hover:text-blue-500 transition">
                            <Settings size={20} />
                        </button>

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