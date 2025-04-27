import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface InfoAlertProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    variant?: 'blue' | 'green' | 'amber' | 'purple';
}

export default function InfoAlert({ title, icon, children, variant = 'blue' }: InfoAlertProps) {
    // Dynamic styles based on variant
    const getStyles = () => {
        switch (variant) {
            case 'green':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    title: 'text-green-800'
                };
            case 'amber':
                return {
                    bg: 'bg-amber-50',
                    border: 'border-amber-200',
                    title: 'text-amber-800'
                };
            case 'purple':
                return {
                    bg: 'bg-purple-50',
                    border: 'border-purple-200',
                    title: 'text-purple-800'
                };
            case 'blue':
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    title: 'text-blue-800'
                };
        }
    };

    const styles = getStyles();

    return (
        <motion.div 
            className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-6`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="ml-3">
                    <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
                    <div className="mt-2 text-sm text-gray-600">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}