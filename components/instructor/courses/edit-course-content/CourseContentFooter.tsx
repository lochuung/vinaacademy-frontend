// components/CourseContentFooter.tsx

interface CourseContentFooterProps {
    onSaveDraft: () => void;
    onPublish: () => void;
}

export const CourseContentFooter = ({ onSaveDraft, onPublish }: CourseContentFooterProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onSaveDraft}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Lưu bản nháp
                        </button>
                        <button
                            type="button"
                            onClick={onPublish}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Xuất bản khóa học
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};