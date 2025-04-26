import {QuizQuestion} from '@/types/lecture';
import { QuestionType } from '@/types/quiz';  // Import the QuestionType enum

interface QuestionFormProps {
    text: string;
    type: QuestionType;  // Updated type
    points: number;
    onUpdateText: (text: string) => void;
    onUpdateType: (type: QuestionType) => void;  // Updated type
    onUpdatePoints: (points: number) => void;
}

export default function QuestionForm({
                                         text,
                                         type,
                                         points,
                                         onUpdateText,
                                         onUpdateType,
                                         onUpdatePoints
                                     }: QuestionFormProps) {
    return (
        <div>
            {/* Question text */}
            <div>
                <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung câu hỏi <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="question-text"
                    value={text}
                    onChange={(e) => onUpdateText(e.target.value)}
                    className="shadow-sm focus:ring-black focus:border-black block w-full text-base p-2.5 border-gray-300 rounded-md bg-white"
                    placeholder="Nhập nội dung câu hỏi"
                />
            </div>

            {/* Question type and points */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label htmlFor="question-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Loại câu hỏi
                    </label>
                    <select
                        id="question-type"
                        value={type}
                        onChange={(e) => onUpdateType(e.target.value as QuestionType)}
                        className="shadow-sm focus:ring-black focus:border-black block w-full text-base p-2.5 border-gray-300 rounded-md bg-white"
                    >
                        <option value={QuestionType.SINGLE_CHOICE}>Chọn một đáp án</option>
                        <option value={QuestionType.MULTIPLE_CHOICE}>Chọn nhiều đáp án</option>
                        <option value={QuestionType.TRUE_FALSE}>Đúng / Sai</option>
                        <option value={QuestionType.TEXT}>Câu trả lời tự luận</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="question-points" className="block text-sm font-medium text-gray-700 mb-1">
                        Điểm số
                    </label>
                    <input
                        type="number"
                        id="question-points"
                        min="0"
                        step="0.5"
                        value={points}
                        onChange={(e) => onUpdatePoints(parseFloat(e.target.value) || 0)}
                        className="shadow-sm focus:ring-black focus:border-black block w-full text-base p-2.5 border-gray-300 rounded-md bg-white"
                    />
                </div>
            </div>
        </div>
    );
}