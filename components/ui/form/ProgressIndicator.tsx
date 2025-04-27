import React from "react";
import { CheckCircle } from "lucide-react";

interface ProgressItem {
  label: string;
  isCompleted: boolean;
  step: number;
}

interface ProgressIndicatorProps {
  title: string;
  items: ProgressItem[];
}

export default function ProgressIndicator({ title, items }: ProgressIndicatorProps) {
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                item.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {item.isCompleted ? <CheckCircle className="w-4 h-4" /> : item.step}
            </div>
            <span 
              className={`text-sm ${
                item.isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
