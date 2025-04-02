interface SettingsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description: string;
    icon?: React.ReactNode;
}

export default function SettingsCheckbox({
    checked,
    onChange,
    label,
    description,
    icon
}: SettingsCheckboxProps) {
    return (
        <div>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-900 flex items-center">
                    {icon && icon}
                    {label}
                </span>
            </label>
            <p className="mt-1 text-xs text-gray-500 ml-6">
                {description}
            </p>
        </div>
    );
}