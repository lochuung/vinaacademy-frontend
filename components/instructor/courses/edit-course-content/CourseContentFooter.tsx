// components/CourseContentFooter.tsx
import { Loader2 } from 'lucide-react';

interface CourseContentFooterProps {
    onSaveDraft: () => void;
    isSaving?: boolean;
}

export const CourseContentFooter = ({
    onSaveDraft,
    isSaving = false
}: CourseContentFooterProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onSaveDraft}
                            disabled={isSaving}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Đang lưu...
                                </>
                            ) : (
                                'Lưu thay đổi'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};