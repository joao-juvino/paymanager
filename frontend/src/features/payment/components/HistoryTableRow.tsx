import { CircleCheck, CircleX, Clock, FileText, Watch } from 'lucide-react'
import type { History, Status } from '../../../types/payment'
import { formatCurrency, formatDate } from '../../../common/utils';

export default function HistoryTableRow({ date, beneficiary, value,
    requester,
    authorizer,
    status }: History) {

    const statusConfig: Record<Status, {
        icon: React.ReactNode;
        className: string;
    }> = {
        Rejected: {
            icon: <CircleX className="absolute" />,
            className: "text-highlight-red bg-custom-red border-highlight-red",
        },
        Authorized: {
            icon: <CircleCheck className="absolute" />,
            className: "text-highlight-blue bg-custom-blue border-highlight-blue",
        },
        Pending: {
            icon: <Clock className="absolute" />,
            className: "text-gray-500",
        },
    };

    function getStatusConfig(status: Status) {
        return statusConfig[status] ?? statusConfig.Pending;
    }

    const config = getStatusConfig(status);

    return (
        <tr className=" even:bg-gray-50">
            <td className="font-normal text-md py-1">{formatDate(date)}</td>
            <td className="font-normal text-md py-1">
                <div className="font-semibold mb-1">{beneficiary.name}</div>
                <span className="text-gray-600 font-light">{beneficiary.cnpj}</span>
            </td>
            <td className="font-normal text-md py-1">{formatCurrency(value)}</td>
            <td className="font-normal text-md py-1">{requester}</td>
            <td className="font-normal text-md py-1">{authorizer}</td>
            <td className="font-normal text-md py-1">

                <div className={`text-gray-500 border-gray-300 border-1 rounded-full relative py-1 px-2 ${config.className}`}>
                    {config.icon}
                    <span className="font-semibold">{status}</span>
                </div>
            </td>
            <td className="flex items-center justify-center font-normal text-md py-5">
                <FileText className="cursor-pointer hover:text-highlight-blue" />
            </td>
        </tr>
    )
}
