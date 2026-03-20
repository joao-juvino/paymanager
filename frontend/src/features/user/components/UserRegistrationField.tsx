import type { Role, UserField } from "../../../types/user";

interface Props extends UserField {
    value: string;
    onChange: (value: string | Role) => void;
}

export default function UserRegistrationField({
    type,
    label,
    Icon,
    placeHolder,
    options,
    value,
    onChange,
}: Props) {
    return (
        <div className="w-full flex flex-col gap-3 mb-5">
            <div className="flex gap-3">
                <label className="font-normal text-md">{label}</label>
            </div>

            <div className="w-full flex items-center border-1 border-gray-200 rounded-lg px-3">
                <Icon className="text-gray-600 mr-2" />

                {type === "select" ? (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full outline-none py-3 text-gray-600 bg-transparent"
                    >
                        <option value="">{placeHolder}</option>
                        {options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full outline-none py-3"
                        type={type}
                        placeholder={placeHolder}
                    />
                )}
            </div>
        </div>
    );
}