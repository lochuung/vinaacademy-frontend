// components/course-creator/InfoAlert.tsx
import {ReactNode} from 'react';
import {Info} from 'lucide-react';

interface InfoAlertProps {
    title?: string;
    children: ReactNode;
    icon?: ReactNode;
    variant?: 'blue' | 'green';
}

export default function InfoAlert({
                                      title,
                                      children,
                                      icon,
                                      variant = 'blue'
                                  }: InfoAlertProps) {
    const colors = {
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-700',
            icon: 'text-blue-500'
        },
        green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-700',
            icon: 'text-green-500'
        }
    };

    const style = colors[variant];

    return (
        <div className={`${style.bg} p-4 rounded-lg border ${style.border} flex items-start`}>
            {icon ? (
                <div className={`mr-3 mt-0.5 flex-shrink-0 ${style.icon}`}>{icon}</div>
            ) : (
                <Info className={`h-5 w-5 ${style.icon} mr-3 mt-0.5 flex-shrink-0`}/>
            )}
            <div className={`text-sm ${style.text}`}>
                {title && <p className="font-medium mb-1">{title}</p>}
                <div>{children}</div>
            </div>
        </div>
    );
}