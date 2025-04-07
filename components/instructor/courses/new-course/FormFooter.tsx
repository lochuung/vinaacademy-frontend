// components/course-creator/FormFooter.tsx
import {ArrowLeft, ChevronRight, Save} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {CourseSection} from '@/types/new-course';

interface FormFooterProps {
    activeSection: CourseSection;
    onBack: () => void;
    onContinue: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function FormFooter({
                                       activeSection,
                                       onBack,
                                       onContinue,
                                       onSubmit
                                   }: FormFooterProps) {
    return (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            {activeSection !== 'basic' ? (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex items-center"
                >
                    <ArrowLeft className="h-4 w-4 mr-2"/>
                    Quay lại
                </Button>
            ) : (
                <div></div> // Placeholder trống để giữ layout
            )}

            {activeSection !== 'pricing' ? (
                <Button
                    type="button"
                    onClick={onContinue}
                    className="bg-black text-white hover:bg-gray-800 flex items-center"
                >
                    Tiếp tục
                    <ChevronRight className="h-4 w-4 ml-2"/>
                </Button>
            ) : (
                <Button
                    type="submit"
                    onClick={onSubmit}
                    className="bg-black text-white hover:bg-gray-800 flex items-center"
                >
                    <Save className="h-4 w-4 mr-2"/>
                    Tạo khóa học
                </Button>
            )}
        </div>
    );
}