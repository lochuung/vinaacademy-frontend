import {Upload} from 'lucide-react';

export default function AssignmentEditor() {
    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả bài tập
            </label>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-black focus:border-black bg-white text-gray-900"
                placeholder="Mô tả yêu cầu bài tập ở đây..."
            ></textarea>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tệp đính kèm
                </label>
                <div
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400"/>
                        <div className="flex text-sm text-gray-600 justify-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                            >
                                <span>Tải tệp lên</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">ZIP, PDF, DOC tối đa 50MB</p>
                    </div>
                </div>
            </div>
        </div>
    );
}