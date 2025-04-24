import { useState, useEffect } from 'react';

// You can adjust this based on your environment config
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface CourseImageProps {
    src: string;
    alt: string;
    className?: string;
}

/**
 * Enhanced CourseImage component that handles different image sources
 * with proper base URL handling
 * 
 * @param src - Image source (HTTP URL or UUID)
 * @param alt - Alt text for the image
 * @param className - Optional CSS class name
 */
export default function CourseImage({ src, alt, className = '' }: CourseImageProps) {
    const [imageSrc, setImageSrc] = useState<string>('');

    useEffect(() => {
        if (!src) {
            setImageSrc('/placeholder-course.jpg');
            return;
        }

        // Check if the src is already a complete URL
        if (src.startsWith('http://') || src.startsWith('https://')) {
            setImageSrc(src);
        }
        // Check if src has UUID format (simplified version)
        else if (src.includes('-') && src.length > 30) {
            // Construct the full API URL including hostname to fetch the image
            setImageSrc(`${API_BASE_URL}/images/view/${src}`);
        }
        // Handle relative paths
        else if (src.startsWith('/')) {
            setImageSrc(src);
        }
        // Fallback to placeholder
        else {
            setImageSrc('/placeholder-course.jpg');
        }
    }, [src]);

    return (
        <img
            className={className}
            src={imageSrc}
            alt={alt}
            onError={(e) => {
                console.error(`Failed to load image: ${imageSrc}`);
                e.currentTarget.src = '/placeholder-course.jpg';
            }}
        />
    );
}