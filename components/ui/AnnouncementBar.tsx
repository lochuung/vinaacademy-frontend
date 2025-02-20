"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react"; // Import icon

interface AnnouncementBarProps {
    onClose: () => void;
}

const AnnouncementBar = ({ onClose }: AnnouncementBarProps) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Đợi animation xong mới gọi onClose
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md text-center py-3 px-5 flex justify-center items-center"
                >
                    <span className="text-sm md:text-base font-medium">
                        🚀 Chào mừng bạn đến với website của chúng tôi! Hãy khám phá ngay!
                    </span>
                    <button
                        className="absolute right-3 btn btn-circle btn-sm btn-ghost text-white hover:text-gray-300"
                        onClick={handleClose}
                    >
                        <XIcon size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnnouncementBar;
