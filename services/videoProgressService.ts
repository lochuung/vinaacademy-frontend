'use client';

import apiClient from "@/lib/apiClient";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api-response";

/**
 * Lưu tiến độ xem video của người dùng
 * @param videoId ID của video
 * @param lastWatchedTime Thời gian cuối cùng người dùng xem (tính bằng giây)
 * @returns true nếu lưu thành công
 */
export const saveVideoProgress = async (videoId: string, lastWatchedTime: number): Promise<boolean> => {
  try {
    await apiClient.post(
      `/video-progress/${videoId}?lastWatchedTime=${Math.floor(lastWatchedTime)}`
    );
    return true;
  } catch (error) {
    console.error("saveVideoProgress error:", error);
    return false;
  }
};

/**
 * Lấy tiến độ xem video của người dùng
 * @param videoId ID của video
 * @returns Thời gian cuối cùng người dùng đã xem (tính bằng giây) hoặc null nếu chưa có tiến độ
 */
export const getVideoProgress = async (videoId: string): Promise<number | null> => {
  try {
    const response: AxiosResponse<number> = await apiClient.get(
      `/video-progress/${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error("getVideoProgress error:", error);
    return null;
  }
};