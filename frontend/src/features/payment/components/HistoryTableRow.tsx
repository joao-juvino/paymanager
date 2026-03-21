import { formatCurrency, formatDate, formatStatus, statusClass } from "../../../common/utils";
import type { History } from "../../../types/payment";

export default function HistoryTableRow({
  id,
  date,
  beneficiary,
  value,
  requester,
  authorizer,
  status,
}: History) {
  return (
    <tr className="border-b border-gray-200 hover:bg-custom-gray">
      <td className="p-3 text-sm text-gray-600">{formatDate(date)}</td>
      <td className="p-3">
        <div className="font-semibold text-gray-900">{beneficiary.name}</div>
        <div className="text-sm text-gray-500">{beneficiary.cnpj}</div>
      </td>
      <td className="p-3 font-semibold text-highlight-blue">{formatCurrency(value)}</td>
      <td className="p-3 text-sm text-gray-700">{requester}</td>
      <td className="p-3 text-sm text-gray-700">{authorizer}</td>
      <td className="p-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(status)}`}>
          {formatStatus(status)}
        </span>
      </td>
    </tr>
  );
}
