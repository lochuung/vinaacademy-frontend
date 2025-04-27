import { useState } from 'react';
import { Quiz } from '@/types/lecture';
import { Settings, Clock, Shuffle, Eye, RefreshCw, Medal } from 'lucide-react';

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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Shuffle className="h-5 w-5 mr-2 text-blue-600" />
                                <label htmlFor="randomize" className="text-sm text-gray-700">Xáo trộn thứ tự câu hỏi</label>
                            </div>
                            <div className="relative inline-block w-11 align-middle select-none">
                                <input 
                                    type="checkbox" 
                                    id="randomize" 
                                    checked={settings.randomizeQuestions} 
                                    onChange={e => onUpdateSettings('randomizeQuestions', e.target.checked)}
                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform duration-200 ease-in-out"
                                />
                                <label 
                                    htmlFor="randomize" 
                                    className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${settings.randomizeQuestions ? 'bg-blue-600' : 'bg-gray-300'}`}
                                ></label>
                            </div>
                        </div>
                        
                        {/* Show Correct Answers */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Eye className="h-5 w-5 mr-2 text-green-600" />
                                <label htmlFor="showCorrect" className="text-sm text-gray-700">Hiển thị đáp án đúng</label>
                            </div>
                            <div className="relative inline-block w-11 align-middle select-none">
                                <input 
                                    type="checkbox" 
                                    id="showCorrect" 
                                    checked={settings.showCorrectAnswers} 
                                    onChange={e => onUpdateSettings('showCorrectAnswers', e.target.checked)}
                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform duration-200 ease-in-out"
                                />
                                <label 
                                    htmlFor="showCorrect" 
                                    className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${settings.showCorrectAnswers ? 'bg-green-600' : 'bg-gray-300'}`}
                                ></label>
                            </div>
                        </div>
                        
                        {/* Allow Retake */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <RefreshCw className="h-5 w-5 mr-2 text-purple-600" />
                                <label htmlFor="allowRetake" className="text-sm text-gray-700">Cho phép làm lại</label>
                            </div>
                            <div className="relative inline-block w-11 align-middle select-none">
                                <input 
                                    type="checkbox" 
                                    id="allowRetake" 
                                    checked={settings.allowRetake} 
                                    onChange={e => onUpdateSettings('allowRetake', e.target.checked)}
                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform duration-200 ease-in-out"
                                />
                                <label 
                                    htmlFor="allowRetake" 
                                    className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${settings.allowRetake ? 'bg-purple-600' : 'bg-gray-300'}`}
                                ></label>
                            </div>
                        </div>
                        
                        {/* Require Passing Score */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Medal className="h-5 w-5 mr-2 text-amber-600" />
                                <label htmlFor="requirePass" className="text-sm text-gray-700">Yêu cầu đạt điểm tối thiểu</label>
                            </div>
                            <div className="relative inline-block w-11 align-middle select-none">
                                <input 
                                    type="checkbox" 
                                    id="requirePass" 
                                    checked={settings.requirePassingScore} 
                                    onChange={e => onUpdateSettings('requirePassingScore', e.target.checked)}
                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform duration-200 ease-in-out"
                                />
                                <label 
                                    htmlFor="requirePass" 
                                    className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${settings.requirePassingScore ? 'bg-amber-600' : 'bg-gray-300'}`}
                                ></label>
                            </div>
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