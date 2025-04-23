import React from 'react';

interface BeautifulSpinnerProps {
    name: string;
}

const BeautifulSpinner = ({ name }: BeautifulSpinnerProps) => {
    return (
        <div className="p-6 flex justify-center items-center h-64 bg-transparent">
            <div className="flex flex-col items-center">
                {/* Outer spinner ring */}
                <div className="relative">
                    <div
                        className="w-12 h-12 border-4 border-blue-200 rounded-full border-t-blue-500 animate-spin mb-3"></div>
                </div>

                {/* Animated dots */}
                <div className="mt-6 flex space-x-2">
                    <div className="w-2 h-2 bg-blue-700 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce delay-300"></div>
                </div>

                {/* Text with gradient */}
                <div className="mt-4 text-transparent bg-clip-text bg-black font-medium animate-pulse">
                    {name}
                </div>
            </div>
        </div>
    );
};

export default BeautifulSpinner;