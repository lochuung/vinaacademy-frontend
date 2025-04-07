// components/course-creator/sections/PricingSection.tsx
import {DollarSign} from 'lucide-react';
import {CourseData} from '@/types/new-course';
import InfoAlert from '../InfoAlert';

interface PricingSectionProps {
    courseData: CourseData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PricingSection({
                                           courseData,
                                           onInputChange,
                                           onCheckboxChange
                                       }: PricingSectionProps) {
    return (
        <div className="p-6 space-y-6">
            <InfoAlert
                title="Định giá khóa học của bạn"
                icon={<DollarSign className="h-6 w-6 text-green-500"/>}
                variant="green"
            >
                <p>
                    Đặt giá hợp lý cho khóa học của bạn. Nếu đây là khóa học đầu tiên của bạn,
                    bạn có thể cân nhắc đặt giá thấp hơn để thu hút học viên. Khóa học có giá trị
                    trong khoảng 200,000đ - 1,500,000đ thường có tỷ lệ đăng ký cao nhất.
                </p>
            </InfoAlert>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Giá khóa học (VNĐ) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="focus:ring-black focus:border-black block w-full pr-16 p-3 sm:text-base border-gray-300 rounded-md bg-white text-gray-900"
                        placeholder="0"
                        min="0"
                        step="1000"
                        value={courseData.price}
                        onChange={onInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm mr-4">VNĐ</span>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    Giá khóa học cần phải trong khoảng từ 0 VNĐ (miễn phí) đến 5,000,000 VNĐ
                </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Các tùy chọn giá</h3>
                <div className="mt-4 space-y-4">
                    <div
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="flex items-start">
                            <div className="flex items-center h-5 mt-1">
                                <input
                                    id="discounted"
                                    name="discounted"
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={courseData.discounted}
                                    onChange={onCheckboxChange}
                                />
                            </div>
                            <div className="ml-3">
                                <label htmlFor="discounted" className="text-base font-medium text-gray-700">
                                    Bật khuyến mãi
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    Tạo mã giảm giá hoặc đặt giá khuyến mãi cho khóa học
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="flex items-start">
                            <div className="flex items-center h-5 mt-1">
                                <input
                                    id="subscription"
                                    name="subscription"
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={courseData.subscription}
                                    onChange={onCheckboxChange}
                                />
                            </div>
                            <div className="ml-3">
                                <label htmlFor="subscription" className="text-base font-medium text-gray-700">
                                    Đưa vào gói subscription
                                </label>
                                <p className="text-sm text-gray-500 mt-1">
                                    Cho phép học viên truy cập khóa học này thông qua gói subscription
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}