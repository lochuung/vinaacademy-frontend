import React from 'react';

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  activeColor: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
  activeColor,
  disabled = false,
}: ToggleSwitchProps) {
  // Handle click on the entire component to improve UX
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };
  
  return (
    <div className="flex items-center justify-between flex-1" onClick={handleToggle}>
      <div className="flex items-center cursor-pointer">
        <label htmlFor={id} className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'} cursor-pointer`}>
          {label}
        </label>
      </div>
      <div className="relative inline-block w-11 align-middle select-none transition-all duration-200">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => onChange(!checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div 
          className={`
            block h-6 w-11 rounded-full 
            ${disabled 
              ? 'bg-gray-200 cursor-not-allowed' 
              : checked 
                ? activeColor 
                : 'bg-gray-300 hover:bg-gray-400'
            }
            transition-colors duration-300 ease-in-out cursor-pointer
          `}
        >
          <div 
            className={`
              absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full shadow transform transition-transform duration-300 ease-in-out
              ${checked ? 'translate-x-5' : 'translate-x-0'}
              ${disabled ? 'bg-gray-100' : 'bg-white'}
            `}
          />
        </div>
      </div>
    </div>
  );
}