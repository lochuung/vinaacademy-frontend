import {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Header from './LectureHeader';
import TabNavigation from './TabNavigation';
import ContentTab from './tabs/ContentTab';
import ResourcesTab from './tabs/ResourcesTab';
import SettingsTab from './tabs/SettingsTab';
import Footer from './LectureFooter';
import {Lecture, LectureType} from '@/types/lecture';

// Create a default lecture object to initialize the state
const createDefaultLecture = (): Lecture => ({
    id: '',
    title: 'Bài giảng mới',
    type: 'video' as LectureType,
    description: '',
    duration: '0:00',
    resources: []
});

export default function LectureEditor() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id as string;
    const lectureId = params.lectureId as string;

    const [lecture, setLecture] = useState<Lecture>(createDefaultLecture());
    const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'settings'>('content');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Thông báo thành công
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            console.log("Saving lecture:", lecture);
        } catch (error) {
            console.error("Error saving lecture:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Header
                    isSaving={isSaving}
                    handleSave={handleSave}
                    courseId={courseId}
                    saveSuccess={saveSuccess}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>

                    <div className="p-6">
                        {activeTab === 'content' && (
                            <ContentTab
                                lecture={lecture}
                                setLecture={setLecture}
                            />
                        )}

                        {activeTab === 'resources' && (
                            <ResourcesTab
                                lecture={lecture}
                                setLecture={setLecture}
                            />
                        )}

                        {activeTab === 'settings' && (
                            <SettingsTab
                                lecture={lecture}
                                setLecture={setLecture}
                            />
                        )}
                    </div>

                    <Footer
                        courseId={courseId}
                        isSaving={isSaving}
                        handleSave={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}