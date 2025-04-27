
import { motion } from 'framer-motion'

type PricePresetItemProps = {
    isSelected: boolean;
    title: string;
    price: string;
    color: string;
    onClick: () => void;
}

export default function PricePresetItem({
    isSelected,
    title,
    price,
    color = 'blue',
    onClick
}: PricePresetItemProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            <button
                type="button"
                className={`w-full p-4 rounded-lg border-2 transition-all ${isSelected
                    ? `border-${color}-500 bg-${color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                onClick={onClick}
            >
                <div className="text-center">
                    <span className={`block text-lg font-bold text-${color}-600`}>{title}</span>
                    <span className="mt-1 block text-sm text-gray-500">{price}</span>
                </div>
            </button>
        </motion.div>
    )
}