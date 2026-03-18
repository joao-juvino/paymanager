export default function InputField({
  label,
  icon,
  placeholder,
  value,
  onChange,
}: {
  label: string
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{label}</label>

      <div className="flex">
        <div className="input-icon rounded-l-md">
          {icon}
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-base rounded-r-md border-l-0"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}