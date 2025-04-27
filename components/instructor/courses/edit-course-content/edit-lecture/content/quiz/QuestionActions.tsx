import {
    ChevronUp,
    ChevronDown,
    Copy,
    Trash2,
    ArrowUp,
    ArrowDown,
    AlertCircle
} from 'lucide-react';

interface QuestionActionsProps {
    index: number;
    totalQuestions: number;
    onDuplicate: () => void;
    onRemove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}

export default function QuestionActions({
                                            index,
                                            totalQuestions,
                                            onDuplicate,
                                            onRemove,
                                            onMoveUp,
                                            onMoveDown
                                        }: QuestionActionsProps) {
    const isFirst = index === 0;
    const isLast = index === totalQuestions - 1;
    const canDelete = totalQuestions > 1;

    return (
        <div className="flex justify-between pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
                <button
                    type="button"
                    onClick={onMoveUp}
                    disabled={isFirst}
                    className={`flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm ${
                        isFirst ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                    <ArrowUp size={14} className="mr-1 text-gray-500" /> Lên
                </button>
                <button
                    type="button"
                    onClick={onMoveDown}
                    disabled={isLast}
                    className={`flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm ${
                        isLast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                    <ArrowDown size={14} className="mr-1 text-gray-500" /> Xuống
                </button>
            </div>
            <div>
                <button
                    type="button"
                    onClick={onRemove}
                    disabled={!canDelete}
                    className={`flex items-center px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded text-sm ${
                        !canDelete ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100'
                    }`}
                >
                    {!canDelete ? (
                        <AlertCircle size={14} className="mr-1" />
                    ) : (
                        <Trash2 size={14} className="mr-1" />
                    )}
                    {!canDelete ? "Quiz cần ít nhất 1 câu hỏi" : "Xóa câu hỏi"}
                </button>
            </div>
        </div>
    );
}