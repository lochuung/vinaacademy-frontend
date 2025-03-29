export interface Resource {
    id: string;
    title: string;
    type: string;
    url: string;
}

export interface Lecture {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz' | 'assignment';
    description: string;
    videoUrl?: string;
    textContent?: string;
    duration?: number; // seconds
    isPublished: boolean;
    isPreviewable: boolean;
    isDownloadable: boolean;
    isRequired: boolean;
    resources: Resource[];
}

// Mẫu dữ liệu bài giảng để phát triển UI
export const mockLecture: Lecture = {
    id: "l3",
    title: "Biến và kiểu dữ liệu trong JavaScript",
    type: "video",
    description: "Trong bài giảng này, chúng ta sẽ tìm hiểu về các loại biến và kiểu dữ liệu trong JavaScript. Bạn sẽ học cách khai báo biến với let, const, và var, cũng như hiểu về các kiểu dữ liệu cơ bản như string, number, boolean, null, undefined, object và symbol.",
    videoUrl: "https://example.com/video.mp4",
    textContent: "",
    duration: 745, // seconds
    isPublished: false,
    isPreviewable: false,
    isDownloadable: false,
    isRequired: true,
    resources: [
        {
            id: "r1",
            title: "Slide bài giảng",
            type: "pdf",
            url: "https://example.com/slides.pdf"
        },
        {
            id: "r2",
            title: "Code mẫu",
            type: "zip",
            url: "https://example.com/code.zip"
        }
    ]
};