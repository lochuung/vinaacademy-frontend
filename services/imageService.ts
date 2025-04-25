import apiClient from "@/lib/apiClient";
import { MediaFileDto } from "@/types/file-type";
import { AxiosResponse } from "axios";

export async function uploadImage(file: File): Promise<MediaFileDto | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response: AxiosResponse = await apiClient.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("uploadImage error:", error);
    return null;
  }
} 