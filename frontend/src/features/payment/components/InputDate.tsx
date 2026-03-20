interface InputDateProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputDate({ value, label, onChange }: InputDateProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-semibold uppercase text-sm text-gray-600">{label}</label>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        className="cursor-pointer flex text-gray-600 outline-none border-1 border-gray-200 rounded-lg py-3 px-5 w-full"
      />
    </div>
  );
}