import { FileText, Info } from 'lucide-react';
import { useState } from 'react';
import TipTapEditor from '@/components/common/editors/TipTapEditor';

interface TextEditorProps {
    textContent: string;
    handleTextContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextEditor({textContent, handleTextContentChange}: TextEditorProps) {
    const [showTips, setShowTips] = useState(false);
    
    const handleEditorChange = (value: string) => {
        handleTextContentChange({ target: { value } } as React.ChangeEvent<HTMLTextAreaElement>);
    };
    
    return (
        <div className="space-y-5">
            {/* Header with info */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                        Soạn thảo nội dung
                    </h3>
                    <button 
                        onClick={() => setShowTips(!showTips)}
                        className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center"
                    >
                        <Info className="h-4 w-4 mr-1" />
                        {showTips ? "Ẩn mẹo" : "Mẹo soạn thảo"}
                    </button>
                </div>
                
                {showTips && (
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm text-emerald-800">
                        <h4 className="font-medium mb-2">Mẹo để tạo bài đọc hấp dẫn:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Sử dụng các tiêu đề rõ ràng để chia nội dung thành các phần.</li>
                            <li>Thêm hình ảnh minh họa để làm rõ điểm chính.</li>
                            <li>Sử dụng định dạng đậm, nghiêng để nhấn mạnh các điểm quan trọng.</li>
                            <li>Thêm danh sách có thứ tự hoặc không thứ tự để tổ chức thông tin.</li>
                            <li>Đảm bảo có đủ khoảng trắng giữa các đoạn để dễ đọc.</li>
                        </ul>
                    </div>
                )}
            </div>
            
            {/* Content badge */}
            <div className="flex items-center">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Bài đọc
                </span>
                <span className="ml-2 text-sm text-gray-500">
                    Sử dụng trình soạn thảo trực quan
                </span>
            </div>
            
            {/* Editor */}
            <div className="w-full rounded-lg overflow-hidden">
                <TipTapEditor 
                    content={textContent} 
                    onChange={handleEditorChange} 
                    placeholder="Nhập nội dung bài giảng tại đây..."
                />
            </div>
        </div>
    );
}