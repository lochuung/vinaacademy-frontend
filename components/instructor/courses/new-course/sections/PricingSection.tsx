// components/course-creator/sections/PricingSection.tsx
import { DollarSign } from 'lucide-react';
import { CourseData } from '@/types/new-course';
import InfoAlert from '../InfoAlert';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { useState, useEffect } from 'react';

interface PricingSectionProps {
    courseData: CourseData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNumberChange: (e: InputNumberValueChangeEvent) => void;
}

export default function PricingSection({
    courseData,
    onInputChange,
    onCheckboxChange,
    onNumberChange
}: PricingSectionProps) {
    const [priceError, setPriceError] = useState<string>('');

    // Validate prices whenever courseData changes
    useEffect(() => {
        if (courseData.discounted && courseData.oldPrice && courseData.price) {
            if (courseData.oldPrice <= courseData.price) {
                setPriceError('Giá gốc phải cao hơn giá khuyến mãi');
            } else {
                setPriceError('');
            }
        } else {
            setPriceError('');
        }
    }, [courseData.discounted, courseData.oldPrice, courseData.price]);

    // Handle oldPrice changes with validation
    const handleOldPriceChange = (e: InputNumberValueChangeEvent) => {
        const newOldPrice = e.value as number;

        if (courseData.price && newOldPrice <= courseData.price) {
            setPriceError('Giá gốc phải cao hơn giá khuyến mãi');
        } else {
            setPriceError('');
        }

        // Pass the event to the parent handler
        onNumberChange(e);
    };

    return (
        <div className="p-6 space-y-6">
            <InfoAlert
                title="Định giá khóa học của bạn"
                icon={<DollarSign className="h-6 w-6 text-green-500" />}
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
                    <div className="relative w-full">
                        <InputNumber
                            name="price"
                            id="price"
                            className='w-[100%]'
                            inputClassName="focus:ring-black focus:border-black block w-full pr-4 p-3 sm:text-base border-gray-300 rounded-md bg-white text-gray-900"
                            incrementButtonClassName='ml-[7px] px-1 bg-green-400'
                            decrementButtonClassName='ml-[7px] px-1 bg-red-500'
                            placeholder="10.000"
                            locale="vi-VN"
                            suffix=''
                            showButtons
                            buttonLayout='stacked'
                            min={10000}
                            step={10000}
                            value={courseData.price}
                            onValueChange={onNumberChange}
                        />

                        <div className="absolute inset-y-0 right-0 pr-9 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">VNĐ</span>
                        </div>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    Giá khóa học cần phải trong khoảng từ 10.000 VNĐ (miễn phí) đến 5.000.000 VNĐ
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
                                <div className="text-sm text-gray-500 mt-1">
                                    Đặt giá khuyến mãi cho khóa học, giá sẽ được hiển thị cho học viên dưới dạng giá cũ đã bỏ.
                                    <br />
                                    VD: Giá gốc fake 1.000.000 VNĐ, giá khóa học 500.000 VNĐ.
                                    <br />
                                    <div className="line-through  mt-2">
                                        1.000.000 VNĐ
                                    </div>
                                    500.000 VNĐ
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Old Price field that appears when discounted is checked */}
                    {courseData.discounted && (
                        <div className="mt-4 pl-8 animate-fade-in">
                            <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                Giá gốc fake (VNĐ) <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm border-red-500">
                                <div className="relative w-full border-red-500">
                                    <InputNumber
                                        name="oldPrice"
                                        id="oldPrice"
                                        className='w-[100%] '
                                        inputClassName='block w-full pr-4 p-3 sm:text-base rounded-md bg-white'

                                        incrementButtonClassName='ml-[7px] px-1 bg-green-400'
                                        decrementButtonClassName='ml-[7px] px-1 bg-red-500'
                                        placeholder="20.000"
                                        locale="vi-VN"
                                        suffix=''
                                        showButtons
                                        min={20000}
                                        step={10000}
                                        value={courseData.oldPrice || 0}
                                        onValueChange={handleOldPriceChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-9 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">VNĐ</span>
                                    </div>
                                </div>
                            </div>
                            {priceError ? (
                                <p className="mt-2 text-sm text-red-600">
                                    {priceError}
                                </p>
                            ) : (
                                null
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}