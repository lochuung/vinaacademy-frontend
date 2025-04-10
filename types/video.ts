import { VideoStatus } from "./course";

export interface VideoDto {
    videoId: string;
    thumbnailUrl: string;
    originalFilename: string;
    status: VideoStatus;
    duration: number;
  }
  