// components/course-creator/sections/PricingSection.tsx
import { DollarSign } from "lucide-react";
import { CourseData } from "@/types/new-course";
import InfoAlert from "../InfoAlert";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PricePresetItem from "./PricePresetItem";

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
  onNumberChange,
}: PricingSectionProps) {
  const [priceError, setPriceError] = useState<string>("");
  const [priceRealError, setPriceRealError] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("economy"); // Options: free, economy, premium
  
  // Price preset options
  const priceOptions = {
    free: 0,
    economy: 199000,
    standard: 499000,
    premium: 999000
  };

  // Validate prices whenever courseData changes
  useEffect(() => {
    if (courseData.price < 0 || courseData.price > 5000000) {
      setPriceRealError(
        "Giá khóa học cần phải trong khoảng từ 0 VNĐ (miễn phí) đến 5.000.000 VNĐ"
      );
    } else {
      setPriceRealError("");
    }
    
    // Set price range based on price value
    if (courseData.price === 0) setPriceRange("free");
    else if (courseData.price <= 200000) setPriceRange("economy");
    else if (courseData.price <= 500000) setPriceRange("standard");
    else setPriceRange("premium");
    
  }, [courseData.price, priceRange, priceOptions]);

  // Handle oldPrice changes with validation
  const handleOldPriceChange = (e: InputNumberValueChangeEvent) => {
    const newOldPrice = e.value as number;

    if (courseData.price && newOldPrice <= courseData.price) {
      setPriceError("Giá gốc phải cao hơn giá khuyến mãi");
    } else {
      setPriceError("");
    }

    // Pass the event to the parent handler
    onNumberChange(e);
  };
  
  // Handle price preset selection
  const handlePricePresetChange = (preset: string) => {
    setPriceRange(preset);

    courseData.price = priceOptions[preset as keyof typeof priceOptions];
    
    // Update the price based on the selected preset
    const newPrice = priceOptions[preset as keyof typeof priceOptions];
    const e = {
      value: newPrice,
      target: {
        name: "price"
      }
    } as InputNumberValueChangeEvent;
    
    // onNumberChange(e);
  };

  return (
    <div className="p-6 space-y-6">
      <InfoAlert
        title="Định giá khóa học của bạn"
        icon={<DollarSign className="h-6 w-6 text-green-500" />}
        variant="green"
      >
        <p>
          Đặt giá hợp lý cho khóa học của bạn. Nếu đây là khóa học đầu tiên của
          bạn, bạn có thể cân nhắc đặt giá thấp hơn để thu hút học viên. Khóa
          học có giá trị trong khoảng 200,000đ - 1,500,000đ thường có tỷ lệ đăng
          ký cao nhất.
        </p>
      </InfoAlert>

      {/* Price preset options */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Khung giá phổ biến
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <PricePresetItem
            isSelected={priceRange === 'free'}
            title="Miễn phí"
            price="0 VNĐ"
            color="green"
            onClick={() => handlePricePresetChange('free')}
           />
          
          <PricePresetItem
            isSelected={priceRange === 'economy'}
            title="Kinh tế"
            price="199.000 VNĐ"
            color="blue"
            onClick={() => handlePricePresetChange('economy')}
          />
          
          <PricePresetItem
            isSelected={priceRange === 'standard'}
            title="Tiêu chuẩn"
            price="499.000 VNĐ"
            color="purple"
            onClick={() => handlePricePresetChange('standard')}
          />
          
          <PricePresetItem
            isSelected={priceRange === 'premium'}
            title="Cao cấp"
            price="999.000 VNĐ"
            color="amber"
            onClick={() => handlePricePresetChange('premium')}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Giá khóa học (VNĐ) <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="relative w-full">
            <InputNumber
              name="price"
              id="price"
              className="w-[100%]"
              inputClassName={`
                focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 sm:text-base 
                ${priceRealError ? 'border-red-300' : 'border-gray-300'} 
                rounded-md bg-white text-gray-900 transition-colors
              `}
              incrementButtonClassName="ml-[7px] px-1 bg-green-100 hover:bg-green-200 text-green-700 border border-green-300"
              decrementButtonClassName="ml-[7px] px-1 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300"
              placeholder="0"
              locale="vi-VN"
              suffix=""
              showButtons
              buttonLayout="stacked"
              min={0}
              step={10000}
              value={courseData.price}
              onValueChange={onNumberChange}
            />

            <div className="absolute inset-y-0 right-0 pr-9 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">VNĐ</span>
            </div>
          </div>
        </div>
        {priceRealError ? (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600"
          >
            {priceRealError}
          </motion.p>
        ) : (
          <p className="mt-2 text-xs text-gray-500">
            Giá khóa học cần phải trong khoảng từ 0 VNĐ (miễn phí) đến 5.000.000 VNĐ
          </p>
        )}
      </div>
    </div>
  );
}
