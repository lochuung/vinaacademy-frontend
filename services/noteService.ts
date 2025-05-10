'use client';

import apiClient from "@/lib/apiClient";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api-response";
import { Note } from "@/types/note";

// 🔍 GET /video-notes/video/{videoId}
export const getNotesByVideoId = async (videoId: string): Promise<Note[]> => {
    try {
        const response: AxiosResponse<ApiResponse<Note[]>> = await apiClient.get(
            `/video-notes/video/${videoId}`
        );
        return response.data.data;
    } catch (error) {
        console.error("getNotesByVideoId error:", error);
        return [];
    }
};

// ➕ POST /video-notes
export const createNote = async (videoId: string, timeStampSeconds: number, noteText: string): Promise<Note | null> => {
    try {
        const response: AxiosResponse<ApiResponse<Note>> = await apiClient.post(
            '/video-notes',
            {
                videoId,
                timeStampSeconds,
                noteText,
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("createNote error:", error);
        return null;
    }
};

// ✏️ PUT /video-notes/{noteId}
export const updateNote = async (noteId: string, videoId: string, timeStampSeconds: number, noteText: string): Promise<Note | null> => {
    try {
        const response: AxiosResponse<ApiResponse<Note>> = await apiClient.put(
            `/video-notes/${noteId}`,
            {
                videoId,
                timeStampSeconds,
                noteText,
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("updateNote error:", error);
        return null;
    }
};

// ❌ DELETE /video-notes/{noteId}
export const deleteNote = async (noteId: string): Promise<boolean> => {
    try {
        await apiClient.delete(`/video-notes/${noteId}`);
        return true;
    } catch (error) {
        console.error("deleteNote error:", error);
        return false;
    }
};

// Thêm phương thức để format timestamp thành chuỗi dễ đọc
export function formatTimestamp(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}