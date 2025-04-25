// components/CourseTabs.tsx

interface CourseTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function CourseTabs({activeTab, onTabChange}: CourseTabsProps) {
    // Map of tab values to their display names
    const tabs = [
        { id: 'popular', label: 'Phổ biến nhất' },
        { id: 'newest', label: 'Mới nhất' },
        { id: 'rating', label: 'Đánh giá cao' }
    ];
    
    return (
        <div className="mb-8 border-b">
            <div className="flex space-x-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`py-3 ${activeTab === tab.id ? 'border-b-2 border-black font-medium' : 'text-gray-600 hover:text-black'}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}