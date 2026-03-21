interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputDate({ label, value, onChange }: Props) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-highlight-blue"
      />
    </label>
  );
}