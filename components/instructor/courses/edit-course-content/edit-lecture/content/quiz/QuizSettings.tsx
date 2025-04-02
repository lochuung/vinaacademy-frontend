import { Quiz } from '@/types/lecture';
import SettingCheckbox from './SettingCheckbox';
import PassingScoreInput from './PassingScoreInput';

interface QuizSettingsProps {
    settings: Quiz['settings'];
    onUpdateSettings: (field: keyof Quiz['settings'], value: boolean | number) => void;
}

export default function QuizSettings({ settings, onUpdateSettings }: QuizSettingsProps) {
    const handleSettingChange = (field: keyof Quiz['settings']) => (checked: boolean) => {
        onUpdateSettings(field, checked);
    };

    const handleScoreChange = (value: number) => {
        onUpdateSettings('passingScore', value);
    };


    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Cài đặt bài kiểm tra</h4>

            <div className="space-y-4">
                <SettingCheckbox
                    id="randomize-questions"
                    label="Hiển thị câu hỏi ngẫu nhiên"
                    checked={settings.randomizeQuestions}
                    onChange={handleSettingChange('randomizeQuestions')}
                />

                <SettingCheckbox
                    id="show-correct-answers"
                    label="Hiển thị đáp án đúng sau khi nộp bài"
                    checked={settings.showCorrectAnswers}
                    onChange={handleSettingChange('showCorrectAnswers')}
                />

                <SettingCheckbox
                    id="allow-retake"
                    label="Cho phép làm lại bài kiểm tra"
                    checked={settings.allowRetake}
                    onChange={handleSettingChange('allowRetake')}
                />

                <SettingCheckbox
                    id="passing-score"
                    label="Yêu cầu điểm tối thiểu để hoàn thành"
                    checked={settings.requirePassingScore}
                    onChange={handleSettingChange('requirePassingScore')}
                />

                {settings.requirePassingScore && (
                    <PassingScoreInput
                        value={settings.passingScore}
                        onChange={handleScoreChange}
                    />
                )}
            </div>
        </div>
    );
}