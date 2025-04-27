import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center max-w-lg w-full">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                    <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Đã xảy ra lỗi</h2>
                
                <p className="text-gray-600 text-center mb-6">
                    Xin lỗi, đã xảy ra lỗi khi tải trang. Dưới đây là chi tiết lỗi để giúp khắc phục.
                </p>
                
                <div className="w-full bg-red-50 border border-red-200 rounded-md p-4 mb-6 overflow-auto max-h-40">
                    <p className="text-red-700 font-mono text-sm">
                        {error.message}
                    </p>
                </div>
                
                <div className="flex space-x-3">
                    <button
                        onClick={resetErrorBoundary}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        Thử lại
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/instructor/courses'}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Quay về trang khóa học
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
