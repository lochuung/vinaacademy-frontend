// utils/formatters.tsx
import React from 'react';
import {Video, FileText, File, Monitor} from 'lucide-react';

// Helper function to format seconds to MM:SS
export const formatDuration = (seconds: number | undefined): string => {
    if (!seconds && seconds !== 0) return '0:00';

    const mins: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to get icon for lecture type
export const getLectureTypeIcon = (type: string): React.ReactElement => {
    switch (type) {
        case 'video':
            return <Video className="h-4 w-4 text-blue-500"/>;
        case 'text':
            return <FileText className="h-4 w-4 text-green-500"/>;
        case 'file':
            return <File className="h-4 w-4 text-orange-500"/>;
        case 'quiz':
            return <Monitor className="h-4 w-4 text-purple-500"/>;
        default:
            return <File className="h-4 w-4 text-gray-500"/>;
    }
};