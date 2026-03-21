type Option = { label: string; value: string };

type Props = {
  type: 'text' | 'password' | 'select';
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
};

export default function UserRegistrationField({
  type,
  label,
  Icon,
  placeHolder,
  value,
  onChange,
  options,
}: Props) {
  return (
    <label className="mb-4 flex flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">
        {label}
      </span>

      <div className="relative">
        {/* Ícone dentro do input */}
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        {type === 'select' ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 outline-none"
          >
            <option value="">{placeHolder}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeHolder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 outline-none"
          />
        )}
      </div>
    </label>
  );
}