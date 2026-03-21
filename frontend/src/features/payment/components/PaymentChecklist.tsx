import { CircleCheck } from 'lucide-react'

export default function PaymentChecklist() {
    return (
        <div className="p-8 border-1 border-dashed border-gray-400 rounded-lg">
            <h3 className="mb-3 font-semibold">Requirements Checklist</h3>
            <ul className="text-sm text-gray-600">
                <li className="flex gap-3 mb-3">
                    <CircleCheck />
                    <span>Valid CNPJ format (14 digits)</span>
                </li>
                <li className="flex gap-3 mb-3">
                    <CircleCheck />
                    <span>Beneficiary name matching registry</span>
                </li>
                <li className="flex gap-3 mb-3">
                    <CircleCheck />
                    <span>Detailed service description attached</span>
                </li>
                <li className="flex gap-3 mb-3">
                    <CircleCheck />
                    <span>Request within monthly budget allocation</span>
                </li>
            </ul>
        </div>
    )
}
