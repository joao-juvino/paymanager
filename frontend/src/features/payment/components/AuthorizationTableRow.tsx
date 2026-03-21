import { ChevronRight } from "lucide-react";
import type { Company, PaymentStatus } from "../../../types/payment";
import { formatCurrency, formatDate } from "../../../common/utils";

interface AuthorizationTableRowProps {
    id: string;
    company: Company;
    date: string;
    amount: number;
    requester: string;
    status: PaymentStatus;
    onApprove: () => Promise<void>;
    onReject: () => Promise<void>;
    onSelect?: () => void;
}

export default function AuthorizationTableRow({
  id,
  company: { name, cnpj },
  date,
  amount,
  onApprove,
  onReject,
  onSelect,
}: AuthorizationTableRowProps) {
  return (
    <tr className="text-center hover:bg-custom-gray">
      <td className="text-gray-600 font-normal text-md py-3">{id}</td>

      <td className="font-normal text-md py-3">
        <h5 className="font-semibold mb-1">{name}</h5>
        <p className="text-gray-600 font-light">{cnpj}</p>
      </td>

      <td className="text-gray-600 font-normal text-md py-3">{formatDate(date)}</td>

      <td className="font-semibold text-md py-3 text-highlight-blue">{formatCurrency(amount)}</td>

      <td className="mt-3 px-5 flex justify-center items-center font-normal text-md py-5 gap-2">
        <ChevronRight
          onClick={onSelect}
          className="cursor-pointer hover:text-highlight-blue"
        />
      </td>
    </tr>
  );
}
