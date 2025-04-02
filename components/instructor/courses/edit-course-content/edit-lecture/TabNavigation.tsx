import { Video, FileText, Settings } from 'lucide-react';

interface TabNavigationProps {
    activeTab: 'content' | 'resources' | 'settings';
    setActiveTab: (tab: 'content' | 'resources' | 'settings') => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
    return (
        <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
                <button
                    type="button"
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'content'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setActiveTab('content')}
                >
                    <Video className="h-4 w-4 inline mr-2" /> Nội dung bài giảng
                </button>
                <button
                    type="button"
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'resources'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setActiveTab('resources')}
                >
                    <FileText className="h-4 w-4 inline mr-2" /> Tài liệu bổ sung
                </button>
                <button
                    type="button"
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'settings'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setActiveTab('settings')}
                >
                    <Settings className="h-4 w-4 inline mr-2" /> Cài đặt bài giảng
                </button>
            </nav>
        </div>
    );
}