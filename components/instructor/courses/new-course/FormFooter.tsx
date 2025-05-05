// components/course-creator/FormFooter.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { CourseSection } from '@/types/new-course';
import { motion } from 'framer-motion';

interface FormFooterProps {
    activeSection: CourseSection;
    onBack: () => void;
    onContinue: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    isEditing?: boolean;
}

export default function FormFooter({ 
    activeSection, 
    onBack, 
    onContinue, 
    onSubmit,
    isSubmitting,
    isEditing = false
}: FormFooterProps) {
    return (
        <div className="bg-gray-50 border-t border-gray-200 py-4 px-6">
            <div className="flex justify-between items-center">
                <div>
                    {activeSection !== 'basic' && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onBack}
                                className="group"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Quay lại
                            </Button>
                        </motion.div>
                    )}
                </div>
                
                <div className="flex gap-3">
                    {activeSection !== 'pricing' ? (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button 
                                type="button"
                                onClick={onContinue}
                                className="group"
                            >
                                Tiếp tục
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button 
                                onClick={onSubmit}
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 px-6 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {isEditing ? 'Đang cập nhật...' : 'Đang tạo khóa học...'}
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        {isEditing ? 'Cập nhật khóa học' : 'Tạo khóa học'}
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}