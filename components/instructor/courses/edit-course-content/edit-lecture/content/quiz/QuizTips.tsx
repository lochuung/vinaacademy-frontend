import { Lightbulb, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export default function QuizTips() {
    return (
        <div className="space-y-5">
            <h3 className="text-xl font-bold text-gray-800 flex items-center border-b border-gray-200 pb-4">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                Mẹo tạo bài kiểm tra hiệu quả
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border-l-4 border-t border-r border-b border-blue-300 shadow-sm transition-all hover:shadow-md">
                    <h4 className="text-lg font-medium text-blue-800 mb-3">Nguyên tắc cơ bản</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Đặt câu hỏi ngắn gọn, rõ ràng và dễ hiểu</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Tạo các lựa chọn có độ dài tương đương nhau</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Sắp xếp câu hỏi theo thứ tự độ khó tăng dần</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Cung cấp giải thích cho câu trả lời để học viên học được từ sai lầm</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white p-5 rounded-lg border-l-4 border-t border-r border-b border-red-300 shadow-sm transition-all hover:shadow-md">
                    <h4 className="text-lg font-medium text-red-800 mb-3">Những điều nên tránh</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Tránh các câu hỏi mơ hồ hoặc có thể hiểu theo nhiều cách</span>
                        </li>
                        <li className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Không đặt các lựa chọn quá rõ ràng đúng/sai</span>
                        </li>
                        <li className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Tránh tạo quá nhiều câu hỏi dẫn đến mệt mỏi cho học viên</span>
                        </li>
                        <li className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Không sử dụng các câu hỏi gây nhầm lẫn hoặc đánh lừa học viên</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white p-5 rounded-lg border-l-4 border-t border-r border-b border-purple-300 shadow-sm transition-all hover:shadow-md md:col-span-2">
                    <h4 className="text-lg font-medium text-purple-800 mb-3">Kiểu câu hỏi nên sử dụng</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start p-3 bg-purple-50 rounded-md">
                            <HelpCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-purple-800">Câu hỏi áp dụng kiến thức</p>
                                <p className="text-xs text-purple-600 mt-1">Yêu cầu học viên áp dụng kiến thức đã học vào tình huống thực tế</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-purple-50 rounded-md">
                            <HelpCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-purple-800">Câu hỏi phân tích</p>
                                <p className="text-xs text-purple-600 mt-1">Yêu cầu học viên phân tích thông tin và đánh giá các tình huống</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-purple-50 rounded-md">
                            <HelpCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-purple-800">Câu hỏi tình huống</p>
                                <p className="text-xs text-purple-600 mt-1">Mô tả một tình huống và yêu cầu học viên xác định giải pháp</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-purple-50 rounded-md">
                            <HelpCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-purple-800">Câu hỏi khái niệm chính</p>
                                <p className="text-xs text-purple-600 mt-1">Kiểm tra hiểu biết của học viên về các khái niệm quan trọng trong bài học</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}