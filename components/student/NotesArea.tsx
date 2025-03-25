// components/student/NotesArea.tsx
"use client";

import { FC, useState, useEffect } from 'react';

interface NoteType {
    id: string;
    content: string;
    timestamp: number; // Video timestamp in seconds
    createdAt: Date;
    updatedAt: Date;
}

interface NotesAreaProps {
    lessonId: string;
    courseId: string;
}

const NotesArea: FC<NotesAreaProps> = ({ lessonId, courseId }) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteType | null>(null);
    const [noteContent, setNoteContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock fetching notes from API
    useEffect(() => {
        // In a real app, you would fetch from your backend
        const mockNotes: NoteType[] = [
            {
                id: '1',
                content: 'Python operators are used to perform operations on variables and values.',
                timestamp: 120,
                createdAt: new Date('2025-03-10T10:30:00'),
                updatedAt: new Date('2025-03-10T10:30:00'),
            },
            {
                id: '2',
                content: 'The + operator is used for addition, while the * operator is used for multiplication.',
                timestamp: 245,
                createdAt: new Date('2025-03-10T10:35:00'),
                updatedAt: new Date('2025-03-10T10:35:00'),
            },
        ];

        setNotes(mockNotes);
    }, [lessonId]);

    // Create a new note
    const createNote = () => {
        if (!noteContent.trim()) return;

        const newNote: NoteType = {
            id: Date.now().toString(),
            content: noteContent,
            timestamp: 0, // Current video time would be set here
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setNotes(prevNotes => [newNote, ...prevNotes]);
        setNoteContent('');
    };

    // Edit an existing note
    const startEditing = (note: NoteType) => {
        setCurrentNote(note);
        setNoteContent(note.content);
        setIsEditing(true);
    };

    // Update a note
    const updateNote = () => {
        if (!currentNote || !noteContent.trim()) return;

        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === currentNote.id
                    ? { ...note, content: noteContent, updatedAt: new Date() }
                    : note
            )
        );

        setNoteContent('');
        setCurrentNote(null);
        setIsEditing(false);
    };

    // Delete a note
    const deleteNote = (noteId: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));

        if (currentNote?.id === noteId) {
            setNoteContent('');
            setCurrentNote(null);
            setIsEditing(false);
        }
    };

    // Format timestamp (seconds to MM:SS)
    const formatTimestamp = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Filter notes based on search term
    const filteredNotes = notes.filter(note =>
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Your Notes</h2>
                <p className="text-gray-600 mb-4">
                    Take notes while watching the video. Click on a timestamp to jump to that point in the video.
                </p>

                {/* Search bar */}
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Note editor */}
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                    <textarea
                        className="w-full p-3 min-h-[120px] resize-none focus:outline-none"
                        placeholder="Add a new note..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    ></textarea>
                    <div className="bg-gray-50 px-3 py-2 flex justify-between">
                        <div>
                            <button
                                className="text-gray-500 hover:text-gray-700 mr-2"
                                title="Add timestamp"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                title="Format text"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setNoteContent('');
                                            setCurrentNote(null);
                                        }}
                                        className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={updateNote}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={createNote}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                                    disabled={!noteContent.trim()}
                                >
                                    Save Note
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto">
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? 'No notes match your search.' : 'No notes yet. Start taking notes!'}
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {filteredNotes.map((note) => (
                            <li key={note.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition">
                                <div className="flex justify-between mb-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                        title="Jump to this timestamp in the video"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                        </svg>
                                        {formatTimestamp(note.timestamp)}
                                    </button>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => startEditing(note)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => deleteNote(note.id)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                                <div className="text-xs text-gray-500 mt-2">
                                    Last updated: {note.updatedAt.toLocaleDateString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NotesArea;