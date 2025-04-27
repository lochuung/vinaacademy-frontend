import { useState } from 'react';
import { Quiz } from '@/types/lecture';
import { Settings, Clock, Shuffle, Eye, RefreshCw, Medal } from 'lucide-react';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

interface QuizSettingsProps {
    settings: Quiz['settings'];
    onUpdateSettings: (field: keyof Quiz['settings'], value: boolean | number) => void;
}

export default function QuizSettings({ settings, onUpdateSettings }: QuizSettingsProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center border-b border-gray-200 pb-4">
                <Settings className="mr-2 h-5 w-5 text-blue-600" />
                Cài đặt bài kiểm tra
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Boolean settings */}
                <div className="space-y-4 bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <h4 className="font-medium text-gray-900">Tùy chọn bài kiểm tra</h4>
                    
                    <div className="space-y-3">
                        {/* Randomize Questions */}
                        <div className="flex items-center">
                            <Shuffle className="h-5 w-5 mr-3 text-blue-600" />
                            <ToggleSwitch
                                id="randomize"
                                label="Xáo trộn thứ tự câu hỏi"
                                checked={settings.randomizeQuestions}
                                onChange={(checked) => onUpdateSettings('randomizeQuestions', checked)}
                                activeColor="bg-blue-600"
                            />
                        </div>
                        
                        {/* Show Correct Answers */}
                        <div className="flex items-center">
                            <Eye className="h-5 w-5 mr-3 text-green-600" />
                            <ToggleSwitch
                                id="showCorrect"
                                label="Hiển thị đáp án đúng"
                                checked={settings.showCorrectAnswers}
                                onChange={(checked) => onUpdateSettings('showCorrectAnswers', checked)}
                                activeColor="bg-green-600"
                            />
                        </div>
                        
                        {/* Allow Retake */}
                        <div className="flex items-center">
                            <RefreshCw className="h-5 w-5 mr-3 text-purple-600" />
                            <ToggleSwitch
                                id="allowRetake"
                                label="Cho phép làm lại"
                                checked={settings.allowRetake}
                                onChange={(checked) => onUpdateSettings('allowRetake', checked)}
                                activeColor="bg-purple-600"
                            />
                        </div>
                        
                        {/* Require Passing Score */}
                        <div className="flex items-center">
                            <Medal className="h-5 w-5 mr-3 text-amber-600" />
                            <ToggleSwitch
                                id="requirePass"
                                label="Yêu cầu đạt điểm tối thiểu"
                                checked={settings.requirePassingScore}
                                onChange={(checked) => onUpdateSettings('requirePassingScore', checked)}
                                activeColor="bg-amber-600"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Numeric settings */}
                <div className="space-y-4 bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <h4 className="font-medium text-gray-900">Cấu hình điểm và thời gian</h4>
                    
                    {/* Passing Score */}
                    <div className={`${settings.requirePassingScore ? '' : 'opacity-50'}`}>
                        <div className="flex items-center mb-1">
                            <Medal className="h-4 w-4 mr-1 text-amber-600" />
                            <label htmlFor="passingScore" className="text-sm font-medium text-gray-700">Điểm đạt yêu cầu (%)</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="range" 
                                id="passingScore" 
                                min="1" 
                                max="100" 
                                step="1" 
                                value={settings.passingScore} 
                                onChange={e => onUpdateSettings('passingScore', Number(e.target.value))}
                                disabled={!settings.requirePassingScore}
                                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${settings.requirePassingScore ? 'accent-amber-600' : ''}`}
                            />
                            <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                                {settings.passingScore}%
                            </span>
                        </div>
                    </div>
                    
                    {/* Time Limit */}
                    <div>
                        <div className="flex items-center mb-1">
                            <Clock className="h-4 w-4 mr-1 text-blue-600" />
                            <label htmlFor="timeLimit" className="text-sm font-medium text-gray-700">Thời gian làm bài (phút)</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                id="timeLimit" 
                                min="0" 
                                step="1" 
                                value={settings.timeLimit || 0} 
                                onChange={e => onUpdateSettings('timeLimit', Number(e.target.value))}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md"
                            />
                            <span className="ml-2 text-xs text-gray-500">
                                {settings.timeLimit ? `${settings.timeLimit} phút` : 'Không giới hạn'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Để trống hoặc nhập 0 nếu không có giới hạn thời gian</p>
                    </div>
                </div>
            </div>
        </div>
    );
}