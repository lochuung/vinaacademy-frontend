import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  successMessage?: string;
  helperText?: string;
  characterCount?: {
    current: number;
    max: number;
  };
  children: ReactNode;
}

export default function FormField({
  label,
  name,
  required = false,
  error,
  successMessage,
  helperText,
  characterCount,
  children,
}: FormFieldProps) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {children}
      
      <AnimatePresence>
        {error ? (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-sm text-red-600 flex items-center"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </motion.p>
        ) : (
          successMessage && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm text-green-600 flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              {successMessage}
            </motion.p>
          )
        )}
      </AnimatePresence>
      
      {helperText && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
      
      {characterCount && (
        <div className="mt-1 text-xs text-gray-500 flex items-center">
          <span className={characterCount.current > characterCount.max ? "text-red-500" : ""}>
            {characterCount.current}/{characterCount.max} ký tự
          </span>
        </div>
      )}
    </div>
  );
}
