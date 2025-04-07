interface PassingScoreInputProps {
    value: number;
    onChange: (value: number) => void;
}

export default function PassingScoreInput({value, onChange}: PassingScoreInputProps) {
    return (
        <div className="pl-6">
            <label htmlFor="min-score" className="block text-sm text-gray-700 mb-1">
                Điểm tối thiểu (%)
            </label>
            <input
                type="number"
                id="min-score"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                className="shadow-sm focus:ring-black focus:border-black block w-32 sm:text-sm border-gray-300 rounded-md bg-white"
            />
        </div>
    );
}