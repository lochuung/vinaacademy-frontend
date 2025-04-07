// components/CourseTabs.tsx

interface CourseTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function CourseTabs({activeTab, onTabChange}: CourseTabsProps) {
    return (
        <div className="mb-8 border-b">
            <div className="flex space-x-8">
                <button
                    className={`py-3 ${activeTab === 'popular' ? 'border-b-2 border-black font-medium' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => onTabChange('popular')}
                >
                    Phổ biến nhất
                </button>
                <button
                    className={`py-3 ${activeTab === 'new' ? 'border-b-2 border-black font-medium' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => onTabChange('new')}
                >
                    Mới
                </button>
                <button
                    className={`py-3 ${activeTab === 'trending' ? 'border-b-2 border-black font-medium' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => onTabChange('trending')}
                >
                    Xu hướng
                </button>
            </div>
        </div>
    );
}