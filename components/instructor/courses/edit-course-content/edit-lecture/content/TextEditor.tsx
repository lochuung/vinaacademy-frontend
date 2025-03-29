import { List } from 'lucide-react';

interface TextEditorProps {
    textContent: string;
    handleTextContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextEditor({ textContent, handleTextContentChange }: TextEditorProps) {
    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung bài đọc
            </label>
            <div className="mt-1 border border-gray-300 rounded-md">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                    <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-200 rounded">
                            <strong className="font-bold">B</strong>
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded italic">
                            <em>I</em>
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded underline">
                            <u>U</u>
                        </button>
                        <span className="border-r border-gray-300 mx-1"></span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <textarea
                    className="w-full p-3 h-64 focus:outline-none focus:ring-0 border-0 bg-white text-gray-900"
                    placeholder="Nhập nội dung bài đọc ở đây..."
                    value={textContent}
                    onChange={handleTextContentChange}
                ></textarea>
            </div>
        </div>
    );
}