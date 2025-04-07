import Link from 'next/link';

interface FooterProps {
    courseId: string;
    isSaving: boolean;
    handleSave: () => Promise<void>;
}

export default function Footer({courseId, isSaving, handleSave}: FooterProps) {
    return (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <Link href={`/instructor/courses/${courseId}/content`}>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Quay lại
                </button>
            </Link>
            <div>
                <button
                    type="button"
                    className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Xem trước
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'Đang lưu...' : 'Lưu bài giảng'}
                </button>
            </div>
        </div>
    );
}