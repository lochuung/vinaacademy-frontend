import { Loader2, Save, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface CourseContentFooterProps {
    onSaveDraft: () => void;
    isSaving?: boolean;
    hasChanges?: boolean;
    courseId?: string;
}

export const CourseContentFooter = ({
    onSaveDraft,
    isSaving = false,
    hasChanges = false,
    courseId
}: CourseContentFooterProps) => {
    const [showTip, setShowTip] = useState(true);
    const router = useRouter();

    const handleNext = () => {
        if (courseId) {
            router.push(`/instructor/courses/${courseId}/publish`);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 shadow-md fixed bottom-0 left-0 right-0 z-30">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <AnimatePresence>
                    {showTip && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-start text-sm text-blue-700 max-w-md"
                        >
                            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <div>
                                <p><span className="font-medium">Mẹo:</span> Nhớ lưu thay đổi sau khi sắp xếp lại phần học và bài giảng.</p>
                                <button
                                    onClick={() => setShowTip(false)}
                                    className="text-xs font-medium text-blue-600 hover:text-blue-800 mt-1"
                                >
                                    Đã hiểu
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center space-x-3 sm:ml-auto w-full sm:w-auto justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={isSaving}
                        onClick={handleBack}
                        className="flex items-center"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Quay lại
                    </Button>
                    
                    <Button
                        onClick={onSaveDraft}
                        disabled={isSaving}
                        className={`bg-blue-600 hover:bg-blue-700 text-white ${isSaving ? 'opacity-80' : ''}`}
                        size="sm"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Lưu thay đổi
                            </>
                        )}
                    </Button>
                    
                    <Button
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                        onClick={handleNext}
                    >
                        Tiếp theo
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};