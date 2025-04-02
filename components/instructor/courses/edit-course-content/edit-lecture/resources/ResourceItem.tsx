import { FileText, Trash2 } from 'lucide-react';
import { Resource } from '@/types/lecture';

interface ResourceItemProps {
    resource: Resource;
    index: number;
    handleResourceChange: (index: number, field: string, value: string) => void;
    removeResource: (resourceId: string) => void;
}

export default function ResourceItem({
    resource,
    index,
    handleResourceChange,
    removeResource
}: ResourceItemProps) {
    return (
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <div className="flex items-center flex-grow">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-grow pr-4">
                    <input
                        type="text"
                        placeholder="Tên tài liệu"
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm bg-transparent"
                        value={resource.title}
                        onChange={(e) => handleResourceChange(index, 'title', e.target.value)}
                    />
                    <div className="flex items-center mt-1">
                        <select
                            className="text-xs text-gray-500 border-0 p-0 pr-7 focus:ring-0 bg-transparent"
                            value={resource.type}
                            onChange={(e) => handleResourceChange(index, 'type', e.target.value)}
                        >
                            <option value="pdf">PDF</option>
                            <option value="doc">DOC</option>
                            <option value="zip">ZIP</option>
                            <option value="ppt">PPT</option>
                            <option value="xlsx">XLSX</option>
                        </select>
                        <div className="ml-2 flex items-center">
                            <input
                                type="text"
                                placeholder="URL tài liệu"
                                className="block w-full border-0 p-0 text-xs text-gray-500 placeholder-gray-400 focus:ring-0 bg-transparent"
                                value={resource.url}
                                onChange={(e) => handleResourceChange(index, 'url', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => removeResource(resource.id)}
                    className="text-gray-400 hover:text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}