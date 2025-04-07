import {QuizQuestion} from '@/types/lecture';

interface QuestionFormProps {
    text: string;
    type: QuizQuestion['type'];
    points: number;
    onUpdateText: (text: string) => void;
    onUpdateType: (type: QuizQuestion['type']) => void;
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
                        onChange={(e) => onUpdateType(e.target.value as QuizQuestion['type'])}
                        className="shadow-sm focus:ring-black focus:border-black block w-full text-base p-2.5 border-gray-300 rounded-md bg-white"
                    >
                        <option value="single_choice">Chọn một đáp án</option>
                        <option value="multiple_choice">Chọn nhiều đáp án</option>
                        <option value="true_false">Đúng / Sai</option>
                        <option value="text">Câu trả lời tự luận</option>
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