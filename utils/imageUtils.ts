/**
 * Utility functions for handling images
 */

/**
 * Checks if a string is a valid UUID v4
 * @param str - The string to validate
 * @returns True if the string is a valid UUID v4
 */
export function isUuid(str: string): boolean {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(str);
}

/**
 * Converts an image source to the appropriate URL
 * @param src - The image source (URL or UUID)
 * @returns The appropriate URL to use for the image
 */
export function getImageUrl(src: string): string {
    if (!src) {
        return '/placeholder-course.jpg';
    }

    // Check if the src is already a valid HTTP URL
    if (src.startsWith('http://') || src.startsWith('https://')) {
        return src;
    }

    // Check if src is a UUID (strict validation for UUID v4)
    if (isUuid(src)) {
        return `/images/view/${src}`;
    }

    // Handle relative paths
    if (src.startsWith('/')) {
        return src;
    }

    // Default fallback
    return '/placeholder-course.jpg';
}

/**
 * Handles image error by setting a placeholder
 * @param event - The error event from the img element
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
    event.currentTarget.src = '/placeholder-course.jpg';
}