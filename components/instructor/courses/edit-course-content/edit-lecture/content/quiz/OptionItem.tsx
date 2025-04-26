import {GripVertical, Trash2, CheckCircle} from 'lucide-react';
import {QuizOption} from '@/types/lecture';
import { QuestionType } from '@/types/quiz';  // Import the QuestionType enum

interface OptionItemProps {
    option: QuizOption;
    optionIndex: number;
    questionType: QuestionType;  // Updated type
    onRemove: (optionId: string) => void;
    onUpdateText: (text: string) => void;
    onToggleCorrect: () => void;
    canRemove: boolean;
}

export default function OptionItem({
                                       option,
                                       optionIndex,
                                       questionType,
                                       onRemove,
                                       onUpdateText,
                                       onToggleCorrect,
                                       canRemove
                                   }: OptionItemProps) {
    return (
        <div className="flex items-center">
            <div className="flex-none mr-2">
                <GripVertical className="h-4 w-4 text-gray-300"/>
            </div>

            <div className="mr-2">
                {questionType === QuestionType.MULTIPLE_CHOICE ? (
                    // Checkbox cho multiple choice
                    <div
                        className={`w-5 h-5 rounded border cursor-pointer flex items-center justify-center ${option.isCorrect
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={onToggleCorrect}
                    >
                        {option.isCorrect && <CheckCircle size={16} className="text-white"/>}
                    </div>
                ) : (
                    // Radio button cho single choice và true/false
                    <div
                        className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${option.isCorrect
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={onToggleCorrect}
                    >
                        {option.isCorrect && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                )}
            </div>

            <div className="flex-1">
                <input
                    type="text"
                    value={option.text}
                    onChange={(e) => onUpdateText(e.target.value)}
                    className="shadow-sm focus:ring-black focus:border-black block w-full text-sm p-2 border-gray-300 rounded-md bg-white"
                    placeholder={`Lựa chọn ${optionIndex + 1}`}
                />
            </div>

            {canRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(option.id)}
                    className="ml-2 p-1 text-gray-500 hover:text-red-500"
                >
                    <Trash2 className="h-4 w-4"/>
                </button>
            )}
        </div>
    );
}