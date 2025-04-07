import {Button} from '@/components/ui/button';
import {useState} from 'react';

interface PromoCodeInputProps {
    onApply: (code: string) => void;
}

export default function PromoCodeInput({onApply}: PromoCodeInputProps) {
    const [promoCode, setPromoCode] = useState('');

    const handleApply = () => {
        if (promoCode.trim()) {
            onApply(promoCode);
        }
    };

    return (
        <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-sm mb-3">Khuyến mãi</h3>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm 
                    focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button
                    className="w-full bg-white hover:bg-gray-50 text-black border border-black text-sm py-2"
                    onClick={handleApply}
                >
                    Áp dụng
                </Button>
            </div>
        </div>
    );
}