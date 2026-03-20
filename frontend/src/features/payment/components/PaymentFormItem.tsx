interface PaymentFormItemProps {
    name: string;
    icon: React.ReactNode;
    description?: string;
    required: boolean;
    type: string;
    placeHolder: string;
    value: string;
    onChange: (value: string) => void;
}

export default function PaymentFormItem({ name, icon,
    description, required, type, placeHolder, value, onChange }: PaymentFormItemProps) {
    return (
        <div className="flex flex-col gap-3 min-w-90 w-90 mb-5">
            <div className="flex gap-3">
                <div className="text-gray-600">
                    {icon}
                </div>
                <label className="font-normal text-md">{name}</label>
                {required && <span className="text-highlight-red font-semibold">*</span>}
            </div>
            <input
                className="outline-none border-1 border-gray-200 p-3 rounded-lg"
                type={type}
                required={required}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {description &&
                <p className="text-xs text-gray-600 font-light">{description}</p>}

        </div>
    )
}
