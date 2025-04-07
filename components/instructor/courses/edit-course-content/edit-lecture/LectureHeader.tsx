import Link from 'next/link';
import {ArrowLeft, Save, Check} from 'lucide-react';

interface HeaderProps {
    courseId: string;
    isSaving: boolean;
    saveSuccess: boolean;
    handleSave: () => Promise<void>;
}

export default function Header({courseId, isSaving, saveSuccess, handleSave}: HeaderProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link href={`/instructor/courses/${courseId}/content`}>
                        <div className="mr-2 text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="h-5 w-5"/>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-900">Chỉnh sửa bài giảng</h1>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2"/> Lưu bài giảng
                            </>
                        )}
                    </button>
                </div>
            </div>

            {saveSuccess && (
                <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"/>
                    <div>
                        <p className="text-sm text-green-700">Đã lưu bài giảng thành công!</p>
                    </div>
                </div>
            )}
        </>
    );
}
