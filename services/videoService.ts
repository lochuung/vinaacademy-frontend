

export const getMasterPlaylistUrl = (videoId: string): string => {
    return `/api/videos/${videoId}/master.m3u8`;
}