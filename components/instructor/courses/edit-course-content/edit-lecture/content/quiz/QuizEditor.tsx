// components/lecture/content/quiz/QuizEditor.tsx
import {useState} from 'react';
import {Quiz, QuizQuestion, QuizOption, Lecture} from '@/types/lecture';
import QuizHeader from './QuizHeader';
import QuestionList from './QuestionList';
import QuizSettings from './QuizSettings';
import QuizPreview from './preview/QuizPreview';
import QuizTips from './QuizTips';

interface QuizEditorProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function QuizEditor({lecture, setLecture}: QuizEditorProps) {
    // -- State và logic xử lý chính --
    const [expandedQuestion, setExpandedQuestion] = useState<string>('');
    const [showPreview, setShowPreview] = useState(false);

    // Khởi tạo quiz mặc định nếu chưa có
    if (!lecture.quiz) {
        // Set cấu trúc quiz mặc định
        const defaultQuiz: Quiz = {
            questions: [{
                id: `q_${Date.now()}`,
                text: '',
                type: 'single_choice',
                options: [
                    {id: `o_${Date.now()}_1`, text: '', isCorrect: false},
                    {id: `o_${Date.now()}_2`, text: '', isCorrect: false}
                ],
                explanation: '',
                points: 1,
                isRequired: true
            }],
            settings: {
                randomizeQuestions: false,
                showCorrectAnswers: true,
                allowRetake: true,
                requirePassingScore: false,
                passingScore: 70
            },
            totalPoints: 1
        };

        setLecture({
            ...lecture,
            quiz: defaultQuiz
        });

        // Khởi tạo câu hỏi được mở rộng
        setExpandedQuestion(defaultQuiz.questions[0].id);
    } else if (expandedQuestion === '' && lecture.quiz.questions.length > 0) {
        // Mở rộng câu hỏi đầu tiên nếu chưa có câu hỏi nào được mở rộng
        setExpandedQuestion(lecture.quiz.questions[0].id);
    }

    // Lấy quiz và danh sách câu hỏi (an toàn với giá trị mặc định)
    const quiz = lecture.quiz || {
        questions: [],
        settings: {
            randomizeQuestions: false,
            showCorrectAnswers: true,
            allowRetake: true,
            requirePassingScore: false,
            passingScore: 70
        },
        totalPoints: 0
    };
    const questions = quiz.questions || [];

    // Các hàm xử lý cập nhật Quiz
    const updateQuiz = (updatedQuiz: Quiz) => {
        setLecture({
            ...lecture,
            quiz: updatedQuiz
        });
    };

    // Cập nhật cài đặt quiz
    const updateSettings = (field: keyof Quiz['settings'], value: boolean | number) => {
        if (!lecture.quiz) return;

        const updatedSettings = {
            ...lecture.quiz.settings,
            [field]: value
        };

        updateQuiz({
            ...lecture.quiz,
            settings: updatedSettings
        });
    };

    // Thêm một câu hỏi mới
    const addQuestion = () => {
        if (!lecture.quiz) return;

        const newQuestion: QuizQuestion = {
            id: `q_${Date.now()}`,
            text: '',
            type: 'single_choice',
            options: [
                {id: `o_${Date.now()}_1`, text: '', isCorrect: false},
                {id: `o_${Date.now()}_2`, text: '', isCorrect: false}
            ],
            explanation: '',
            points: 1,
            isRequired: true
        };

        const updatedQuestions = [...questions, newQuestion];
        const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions,
            totalPoints
        });

        setExpandedQuestion(newQuestion.id);
    };

    // Xóa một câu hỏi
    const removeQuestion = (questionId: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.filter(q => q.id !== questionId);
        const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions,
            totalPoints
        });

        // Nếu câu hỏi được mở rộng bị xóa, mở rộng câu hỏi đầu tiên
        if (expandedQuestion === questionId && updatedQuestions.length > 0) {
            setExpandedQuestion(updatedQuestions[0].id);
        }
    };

    // Nhân bản một câu hỏi
    const duplicateQuestion = (questionId: string) => {
        if (!lecture.quiz) return;

        const questionToDuplicate = questions.find(q => q.id === questionId);
        if (!questionToDuplicate) return;

        const duplicatedQuestion: QuizQuestion = {
            ...questionToDuplicate,
            id: `q_${Date.now()}`,
            text: `${questionToDuplicate.text} (bản sao)`,
            options: questionToDuplicate.options.map(opt => ({
                ...opt,
                id: `o_${Date.now()}_${opt.id}`
            }))
        };

        const updatedQuestions = [...questions, duplicatedQuestion];
        const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions,
            totalPoints
        });

        setExpandedQuestion(duplicatedQuestion.id);
    };

    // Cập nhật nội dung câu hỏi
    const updateQuestionText = (questionId: string, text: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q =>
            q.id === questionId ? {...q, text} : q
        );

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Cập nhật loại câu hỏi
    const updateQuestionType = (questionId: string, type: QuizQuestion['type']) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q => {
            if (q.id === questionId) {
                let options = [...q.options];

                // Đặt lại câu trả lời đúng cho loại câu hỏi đơn
                if (type === 'single_choice' && q.type !== 'single_choice') {
                    options = options.map((opt, index) => ({
                        ...opt,
                        isCorrect: index === 0 // Chỉ lựa chọn đầu tiên là đúng
                    }));
                }

                // Đối với đúng/sai, tạo đúng 2 lựa chọn
                if (type === 'true_false') {
                    options = [
                        {id: `o_${Date.now()}_1`, text: 'Đúng', isCorrect: true},
                        {id: `o_${Date.now()}_2`, text: 'Sai', isCorrect: false}
                    ];
                }

                // Đối với loại text, tạo lựa chọn rỗng
                if (type === 'text') {
                    options = [];
                }

                return {...q, type, options};
            }
            return q;
        });

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Thêm một lựa chọn vào câu hỏi
    const addOption = (questionId: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q => {
            if (q.id === questionId) {
                const newOption: QuizOption = {
                    id: `o_${Date.now()}`,
                    text: '',
                    isCorrect: false
                };
                return {...q, options: [...q.options, newOption]};
            }
            return q;
        });

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Xóa một lựa chọn khỏi câu hỏi
    const removeOption = (questionId: string, optionId: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q => {
            if (q.id === questionId) {
                if (q.options.length <= 2) {
                    return q; // Không xóa nếu chỉ còn 2 lựa chọn
                }
                return {...q, options: q.options.filter(o => o.id !== optionId)};
            }
            return q;
        });

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Cập nhật nội dung lựa chọn
    const updateOptionText = (questionId: string, optionId: string, text: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: q.options.map(o =>
                        o.id === optionId ? {...o, text} : o
                    )
                };
            }
            return q;
        });

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Chuyển đổi trạng thái đúng/sai của lựa chọn
    const toggleOptionCorrect = (questionId: string, optionId: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q => {
            if (q.id === questionId) {
                if (q.type === 'single_choice' || q.type === 'true_false') {
                    // Đối với loại câu hỏi đơn, chỉ một lựa chọn có thể đúng
                    return {
                        ...q,
                        options: q.options.map(o => ({
                            ...o,
                            isCorrect: o.id === optionId
                        }))
                    };
                } else {
                    // Đối với loại câu hỏi nhiều lựa chọn, chuyển đổi trạng thái của lựa chọn được nhấn
                    return {
                        ...q,
                        options: q.options.map(o =>
                            o.id === optionId ? {...o, isCorrect: !o.isCorrect} : o
                        )
                    };
                }
            }
            return q;
        });

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Cập nhật phần giải thích cho câu hỏi
    const updateExplanation = (questionId: string, explanation: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q =>
            q.id === questionId ? {...q, explanation} : q
        );

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Cập nhật điểm số cho câu hỏi
    const updatePoints = (questionId: string, points: number) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q =>
            q.id === questionId ? {...q, points} : q
        );

        const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions,
            totalPoints
        });
    };

    // Chuyển đổi trạng thái bắt buộc của câu hỏi
    const toggleRequired = (questionId: string) => {
        if (!lecture.quiz) return;

        const updatedQuestions = questions.map(q =>
            q.id === questionId ? {...q, isRequired: !q.isRequired} : q
        );

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Di chuyển câu hỏi lên hoặc xuống
    const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
        if (!lecture.quiz) return;

        const index = questions.findIndex(q => q.id === questionId);
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === questions.length - 1)
        ) {
            return; // Không thể di chuyển câu hỏi đầu tiên lên hoặc câu hỏi cuối cùng xuống
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const updatedQuestions = [...questions];
        const [removed] = updatedQuestions.splice(index, 1);
        updatedQuestions.splice(newIndex, 0, removed);

        updateQuiz({
            ...lecture.quiz,
            questions: updatedQuestions
        });
    };

    // Kiểm tra xem quiz có ít nhất một câu hỏi hợp lệ hay không
    const hasValidQuestions = questions.some(q =>
        q.text.trim() !== '' &&
        (q.type === 'text' || q.options.some(o => o.text.trim() !== ''))
    );

    // Tính tổng điểm cho quiz
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    return (
        <div className="mt-6 space-y-6">
            {/* 1. Tiêu đề Quiz với nút Xem trước */}
            <QuizHeader
                totalPoints={totalPoints}
                hasValidQuestions={hasValidQuestions}
                onPreview={() => setShowPreview(true)}
            />

            {/* 2. Danh sách câu hỏi */}
            <QuestionList
                questions={questions}
                expandedQuestion={expandedQuestion}
                setExpandedQuestion={setExpandedQuestion}
                onAddQuestion={addQuestion}
                onRemoveQuestion={removeQuestion}
                onDuplicateQuestion={duplicateQuestion}
                onUpdateQuestionText={updateQuestionText}
                onUpdateQuestionType={updateQuestionType}
                onAddOption={addOption}
                onRemoveOption={removeOption}
                onUpdateOptionText={updateOptionText}
                onToggleOptionCorrect={toggleOptionCorrect}
                onUpdateExplanation={updateExplanation}
                onUpdatePoints={updatePoints}
                onToggleRequired={toggleRequired}
                onMoveQuestion={moveQuestion}
            />

            {/* 3. Cài đặt Quiz */}
            <QuizSettings
                settings={quiz.settings}
                onUpdateSettings={updateSettings}
            />

            {/* 4. Mẹo Quiz */}
            <QuizTips/>

            {/* 5. Modal Xem trước Quiz */}
            {showPreview && quiz && (
                <QuizPreview quiz={quiz} onClose={() => setShowPreview(false)}/>
            )}
        </div>
    );
}