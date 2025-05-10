import { FC, useState, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { getNotesByVideoId, createNote, updateNote, deleteNote } from '@/services/noteService';
import { Note } from '@/types/note';

interface NotesAreaProps {
    lectureId: string;
    currentTimestamp?: number; // Current video timestamp
}

const NotesArea: FC<NotesAreaProps> = ({ lectureId, currentTimestamp = 0 }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNote, setCurrentNote] = useState<string>('');
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch notes on component mount or whenever lectureId changes
    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            setError(null);
            try {
                const notes = await getNotesByVideoId(lectureId);
                setNotes(notes);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setError('Không thể tải danh sách ghi chú');
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [lectureId]);

    const formatTimestamp = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleCreateNote = () => {
        setCurrentNote(`Tạo ghi chú mới tại ${formatTimestamp(currentTimestamp)}`);
        setSelectedNoteId(null);
        setIsEditing(true);
    };

    const handleSaveNote = async () => {
        if (!currentNote.trim()) return;

        try {
            if (selectedNoteId) {
                // Update existing note
                const updatedNote = await updateNote(selectedNoteId, lectureId, currentTimestamp, currentNote);
                if (updatedNote) {
                    setNotes(notes.map(note => (note.id === selectedNoteId ? updatedNote : note)));
                }
            } else {
                // Create new note
                const newNote = await createNote(lectureId, currentTimestamp, currentNote);
                if (newNote) {
                    setNotes([newNote, ...notes]);
                }
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }

        // Reset note state
        setCurrentNote('');
        setSelectedNoteId(null);
        setIsEditing(false);
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            const success = await deleteNote(noteId);
            if (success) {
                setNotes(notes.filter(note => note.id !== noteId));
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Create Note Button */}
            <div className="p-4 border-b border-gray-200">
                <button
                    onClick={handleCreateNote}
                    className="w-full text-left p-3 rounded border border-gray-300 hover:border-gray-400 flex justify-between items-center bg-white"
                >
                    <span className="text-gray-500">Tạo ghi chú mới tại {formatTimestamp(currentTimestamp)}</span>
                    <Plus className="text-gray-700" size={20} />
                </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-4">
                {loading && <div className="text-center py-12">Đang tải ghi chú...</div>}
                {error && <div className="text-center py-12 text-red-500">{error}</div>}
                {notes.length === 0 && !loading && !error && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 mb-2">Nhấp vào ô "Tạo ghi chú mới" hoặc nút "+" để tạo ghi chú đầu tiên của bạn.</p>
                    </div>
                )}
                {notes.length > 0 && (
                    <div className="space-y-4">
                        {notes.map(note => (
                            <div key={note.id} className="p-4 border border-gray-200 rounded-md hover:shadow-sm">
                                <div className="mb-2 text-sm text-gray-500">
                                    {formatTimestamp(note.timestamp)}
                                </div>
                                <div className="text-gray-800">
                                    {note.content}
                                </div>
                                <div className="mt-2 text-xs text-gray-400 flex justify-between">
                                    <span>Cập nhật gần nhất: {new Date(note.updatedAt).toLocaleString()}</span>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => {
                                                setCurrentNote(note.content);
                                                setSelectedNoteId(note.id);
                                                setIsEditing(true);
                                            }}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Note Editor Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg w-full max-w-2xl mx-auto my-4">
                        <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-base sm:text-lg font-medium">
                                {selectedNoteId ? 'Chỉnh Sửa Ghi Chú' : 'Tạo Ghi Chú Mới'}
                            </h3>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                                aria-label="Đóng"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-3 sm:p-4">
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                className="w-full h-40 sm:h-60 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                placeholder="Nhập ghi chú của bạn tại đây..."
                                autoFocus
                            />
                            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end sm:space-x-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-3 sm:py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 bg-white w-full sm:w-auto"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    className="px-4 py-3 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
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