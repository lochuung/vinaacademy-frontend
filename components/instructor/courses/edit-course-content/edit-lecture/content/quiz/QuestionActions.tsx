import {
    ChevronUp,
    ChevronDown,
    Copy,
    Trash2
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
            <div>
                <button
                    type="button"
                    onClick={onDuplicate}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mr-4"
                >
                    <Copy size={16} className="mr-1" /> Nhân bản
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
                    disabled={!canDelete}
                >
                    <Trash2 size={16} className="mr-1" /> Xóa câu hỏi
                </button>
            </div>
            <div>
                <button
                    type="button"
                    onClick={onMoveUp}
                    disabled={isFirst}
                    className={`inline-flex items-center text-sm ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'
                        } mr-3`}
                >
                    <ChevronUp size={16} className="mr-1" /> Lên
                </button>
                <button
                    type="button"
                    onClick={onMoveDown}
                    disabled={isLast}
                    className={`inline-flex items-center text-sm ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <ChevronDown size={16} className="mr-1" /> Xuống
                </button>
            </div>
        </div>
    );
}