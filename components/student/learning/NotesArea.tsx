// components/student/NotesArea.tsx
import { FC, useState, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

interface Note {
    id: string;
    content: string;
    timestamp: number; // Video timestamp in seconds
    createdAt: Date;
    updatedAt: Date;
    lessonId: string;
}

interface NotesAreaProps {
    courseId: string;
    lessonId: string;
    currentTimestamp?: number; // Current video timestamp
}

const NotesArea: FC<NotesAreaProps> = ({ courseId, lessonId, currentTimestamp = 0 }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNote, setCurrentNote] = useState<string>('');
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [filterOption, setFilterOption] = useState<string>('Tất cả bài giảng');
    const [sortOption, setFilterSort] = useState<string>('gần đây nhất');
    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
    const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);

    // Trong ứng dụng thực tế, bạn sẽ lấy ghi chú từ API
    useEffect(() => {
        // Dữ liệu mẫu - trong ứng dụng thực, đây sẽ là API call
        const mockNotes: Note[] = [
            // Sẽ được lấy từ API trong ứng dụng thực tế
        ];

        setNotes(mockNotes);
    }, [courseId, lessonId]);

    const formatTimestamp = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleCreateNote = () => {
        // Hiển thị form tạo ghi chú
        setCurrentNote(`Tạo ghi chú mới tại ${formatTimestamp(currentTimestamp)}`);
        setSelectedNoteId(null);
        setIsEditing(true);
    };

    const handleSaveNote = () => {
        if (!currentNote.trim()) return;

        const now = new Date();

        if (selectedNoteId) {
            // Cập nhật ghi chú hiện có
            setNotes(notes.map(note =>
                note.id === selectedNoteId
                    ? { ...note, content: currentNote, updatedAt: now }
                    : note
            ));
        } else {
            // Tạo ghi chú mới
            const newNote: Note = {
                id: Date.now().toString(),
                content: currentNote,
                timestamp: currentTimestamp,
                createdAt: now,
                updatedAt: now,
                lessonId: lessonId
            };
            setNotes([newNote, ...notes]);
        }

        // Đặt lại trạng thái
        setCurrentNote('');
        setSelectedNoteId(null);
        setIsEditing(false);
    };

    const handleFilterChange = (option: string) => {
        setFilterOption(option);
        setShowFilterDropdown(false);
    };

    const handleSortChange = (option: string) => {
        setFilterSort(option);
        setShowSortDropdown(false);
    };

    // Sắp xếp và lọc ghi chú dựa trên tùy chọn đã chọn
    const processedNotes = [...notes]
        .filter(note => {
            if (filterOption === 'Tất cả bài giảng') return true;
            if (filterOption === 'Bài giảng hiện tại') return note.lessonId === lessonId;
            return true;
        })
        .sort((a, b) => {
            if (sortOption === 'gần đây nhất') {
                return b.updatedAt.getTime() - a.updatedAt.getTime();
            }
            if (sortOption === 'cũ nhất') {
                return a.updatedAt.getTime() - b.updatedAt.getTime();
            }
            // Sắp xếp theo thời gian trong video
            return a.timestamp - b.timestamp;
        });

    return (
        <div className="flex flex-col h-full">
            {/* Thanh tạo ghi chú */}
            <div className="p-4 border-b border-gray-200">
                <button
                    onClick={handleCreateNote}
                    className="w-full text-left p-3 rounded border border-gray-300 hover:border-gray-400 flex justify-between items-center bg-white"
                >
                    <span className="text-gray-500">Tạo ghi chú mới tại {formatTimestamp(currentTimestamp)}</span>
                    <Plus className="text-gray-700" size={20} />
                </button>
            </div>

            {/* Tùy chọn lọc và sắp xếp */}
            <div className="px-4 py-3 flex space-x-2">
                {/* Dropdown lọc bài giảng */}
                <div className="relative">
                    <button
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        className="px-4 py-2 border border-gray-300 rounded flex items-center space-x-2 bg-white"
                    >
                        <span className={filterOption === 'Tất cả bài giảng' ? 'text-indigo-600 font-medium' : 'text-gray-800'}>
                            {filterOption}
                        </span>
                        <ChevronDown size={16} className={`transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showFilterDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                            <ul>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-indigo-600 font-medium"
                                    onClick={() => handleFilterChange('Tất cả bài giảng')}
                                >
                                    Tất cả bài giảng
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleFilterChange('Bài giảng hiện tại')}
                                >
                                    Bài giảng hiện tại
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Dropdown sắp xếp */}
                <div className="relative">
                    <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="px-4 py-2 border border-gray-300 rounded flex items-center space-x-2 bg-white"
                    >
                        <span className="text-gray-800">Sắp xếp theo {sortOption}</span>
                        <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showSortDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                            <ul>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange('gần đây nhất')}
                                >
                                    gần đây nhất
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange('cũ nhất')}
                                >
                                    cũ nhất
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange('thời gian video')}
                                >
                                    thời gian trong video
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Khu vực hiển thị ghi chú */}
            <div className="flex-1 overflow-y-auto p-4">
                {processedNotes.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 mb-2">Nhấp vào ô "Tạo ghi chú mới", nút "+", hoặc nhấn "B" để tạo ghi chú đầu tiên của bạn.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {processedNotes.map(note => (
                            <div key={note.id} className="p-4 border border-gray-200 rounded-md hover:shadow-sm">
                                <div className="mb-2 text-sm text-gray-500">
                                    {formatTimestamp(note.timestamp)}
                                </div>
                                <div className="text-gray-800">
                                    {note.content}
                                </div>
                                <div className="mt-2 text-xs text-gray-400 flex justify-between">
                                    <span>Cập nhật gần nhất: {note.updatedAt.toLocaleString()}</span>
                                    <div className="space-x-2">
                                        <button className="text-gray-500 hover:text-gray-700">Chỉnh sửa</button>
                                        <button className="text-gray-500 hover:text-red-500">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Trình sửa ghi chú (sẽ hiển thị khi tạo/chỉnh sửa) */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl">
                        <div className="p-4 border-b border-gray-200 flex justify-between">
                            <h3 className="text-lg font-medium">
                                {selectedNoteId ? 'Chỉnh Sửa Ghi Chú' : 'Tạo Ghi Chú Mới'}
                            </h3>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                className="w-full h-60 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                placeholder="Nhập ghi chú của bạn tại đây..."
                                autoFocus
                            />
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 bg-white"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    disabled={!currentNote.trim()}
                                >
                                    Lưu Ghi Chú
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesArea;