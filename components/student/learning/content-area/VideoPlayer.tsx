import { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useHLS } from '@/hooks/video/useHLS';
import { useVideoProgress } from '@/hooks/video/useVideoProgress';
import { useLessonCompletion } from '@/hooks/video/useLessonCompletion';
import { useControlsAutoHide } from '@/hooks/video/useControlsAutoHide';
import { useVolumeControl } from '@/hooks/video/useVolumeControl';
import VideoElement from '../video/VideoElement';
import ResumePrompt from '../video/ResumePrompt';
import ControlsOverlay from '../video/ControlsOverlay';

interface VideoPlayerProps {
    lessonId: string;
    title: string;
    isCompleted?: boolean;
    onTimeUpdate?: (currentTime: number) => void;
    onLessonCompleted?: () => void;
    courseSlug?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ 
    lessonId, 
    title, 
    onTimeUpdate, 
    isCompleted = false,
    onLessonCompleted,
    courseSlug
}) => {
    // Main player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    
    // Refs
    // Using MutableRefObject instead of RefObject to match useHLS parameter requirements
    const videoRef = useRef<HTMLVideoElement>(null) as React.MutableRefObject<HTMLVideoElement>;
    const playerRef = useRef<HTMLDivElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    // Use custom hooks
    const { 
        isLoading, 
        error, 
        qualities, 
        currentQuality, 
        setCurrentQuality, 
        handleRetry 
    } = useHLS(lessonId, videoRef);

    const { 
        savedProgress, 
        hasProgressLoaded, 
        showResumePrompt, 
        setShowResumePrompt,
        saveCurrentProgress
    } = useVideoProgress(lessonId, duration, videoRef);

    const { 
        showControls, 
        setShowControls, 
        registerContainer 
    } = useControlsAutoHide(isPlaying);

    const { 
        volume, 
        isMuted, 
        toggleMute, 
        handleVolumeChange 
    } = useVolumeControl(videoRef);

    const { 
        checkCompletion 
    } = useLessonCompletion(lessonId, isCompleted, courseSlug, onLessonCompleted);

    // Format time helper
    const formatTime = useCallback((seconds: number): string => {
        if (isNaN(seconds)) {
            return "0:00";
        }
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Video control handlers
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                playPromiseRef.current = videoRef.current.play();
                if (playPromiseRef.current) {
                    playPromiseRef.current.catch(() => {
                        setIsPlaying(false);
                    });
                }
            }
            setIsPlaying(!isPlaying);
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

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            saveCurrentProgress(newTime);
        }
    };

    const toggleFullscreen = () => {
        if (!playerRef.current) return;

        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen()
                .then(() => setIsFullscreen(true))
                .catch(err => console.error(`Lỗi khi bật chế độ toàn màn hình: ${err.message}`));
        } else {
            document.exitFullscreen()
                .then(() => setIsFullscreen(false))
                .catch(err => console.error(`Lỗi khi thoát chế độ toàn màn hình: ${err.message}`));
        }
    };

    // Resume playback control
    const handleResumePlayback = () => {
        if (savedProgress && videoRef.current) {
            videoRef.current.currentTime = savedProgress;
            setCurrentTime(savedProgress);
            togglePlay();
        }
        setShowResumePrompt(false);
    };

    const handleStartFromBeginning = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setCurrentTime(0);
            togglePlay();
        }
        setShowResumePrompt(false);
    };

    // Video event handlers
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const newTime = videoRef.current.currentTime;
            setCurrentTime(newTime);
            if (onTimeUpdate) onTimeUpdate(newTime);
            
            // Check if we should mark the lesson as completed
            checkCompletion(newTime, videoRef.current.duration);
        }
    };

    const handleDurationChange = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const handleLoadedData = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // Add event listeners to actual video element
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('durationchange', handleDurationChange);
        videoElement.addEventListener('ended', handleEnded);
        videoElement.addEventListener('loadeddata', handleLoadedData);
        
        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('durationchange', handleDurationChange);
            videoElement.removeEventListener('ended', handleEnded);
            videoElement.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [handleTimeUpdate, handleDurationChange, handleEnded, handleLoadedData]);

    return (
        <div
            ref={(el) => {
                playerRef.current = el;
                registerContainer(el);
            }}
            className="relative bg-black w-full aspect-video md:max-h-[70vh] h-auto"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Main video element and UI elements */}
            <VideoElement 
                videoRef={videoRef}
                isLoading={isLoading}
                error={error}
                isPlaying={isPlaying}
                showResumePrompt={showResumePrompt}
                togglePlay={togglePlay}
                handleRetry={handleRetry}
            />

            {/* Resume prompt */}
            {hasProgressLoaded && showResumePrompt && !isLoading && (
                <ResumePrompt
                    savedProgress={savedProgress}
                    formatTime={formatTime}
                    handleResumePlayback={handleResumePlayback}
                    handleStartFromBeginning={handleStartFromBeginning}
                />
            )}

            {/* Controls overlay */}
            <ControlsOverlay
                showControls={showControls}
                isPlaying={isPlaying}
                isMuted={isMuted}
                volume={volume}
                currentTime={currentTime}
                duration={duration}
                togglePlay={togglePlay}
                skipBackward={skipBackward}
                skipForward={skipForward}
                toggleMute={toggleMute}
                handleVolumeChange={handleVolumeChange}
                handleSeek={handleSeek}
                toggleFullscreen={toggleFullscreen}
                formatTime={formatTime}
                qualities={qualities}
                currentQuality={currentQuality}
                onQualityChange={setCurrentQuality}
                showQualityMenu={showQualityMenu}
                setShowQualityMenu={setShowQualityMenu}
            />
        </div>
    );
};

export default VideoPlayer;