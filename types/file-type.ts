export interface MediaFileDto {
    id: string;
    userId: string;
    fileName: string;
    fileType: FileType;
    mimeType: string;
    size: number;
    filePath?: string; // Marked as @JsonIgnore in backend
    fileResource?: any; // Resource type in backend
    url?: string; // Public URL for accessing the file 
  }
  
  // Enum for file types
  export enum FileType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT'

  }