interface SettingCheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function SettingCheckbox({id, label, checked, onChange}: SettingCheckboxProps) {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
                {label}
            </label>
        </div>
    );
}