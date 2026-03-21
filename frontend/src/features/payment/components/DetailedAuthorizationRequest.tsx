import { Building2, DollarSign, Calendar, UserIcon, CircleCheck, CircleX } from "lucide-react";
import DetailedAuthorizationItem from "./DetailedAuthorizationItem";
import type { PaymentRequest } from "../../../types/payment";
import { formatCurrency } from "../../../common/utils";

interface Props {
  request: PaymentRequest;
  onApprove: () => void;
  onReject: () => void;
}

export default function DetailedAuthorizationRequest({ request, onApprove, onReject }: Props) {
  const items = [
    {
      icon: <Building2 />,
      title: "Beneficiary CNPJ",
      value: request.company.cnpj,
    },
    {
      icon: <DollarSign />,
      title: "Amount to authorize",
      value: formatCurrency(request.amount),
    },
    {
      icon: <Calendar />,
      title: "Request Date",
      value: request.date,
    },
    {
      icon: <UserIcon />,
      title: "Requester",
      value: request.requester,
    },
  ];

  return (
    <div className="w-full border-1 border-gray-200 rounded-lg">
      <div className="flex justify-between border-b-1 border-gray-200 bg-custom-blue py-5 px-10 gap-2 items-center">
        <h2 className="text-lg font-bold">{request.company.name}</h2>
        <span className="flex justify-center items-center border-1 border-gray-200 text-xs font-semibold text-highlight-blue px-3 rounded-full bg-white">
          {request.id}
        </span>
      </div>

      <ul className="py-5 px-10 flex flex-col gap-3">
        {items.map((item) => (
          <DetailedAuthorizationItem key={item.title} {...item} />
        ))}
      </ul>

      <div className="px-10">
        <h4 className="text-gray-600 uppercase text-sm font-semibold mb-3">
          Service Description
        </h4>
        <p className="p-3 bg-custom-gray rounded-lg text-sm">
          {request.description}
        </p>
      </div>

      <div className="px-10 flex flex-col gap-3 mt-3 py-5">
        <button onClick={onApprove} className="cursor-pointer w-full flex justify-center items-center gap-3 text-white bg-highlight-blue py-2 rounded-lg font-semibold">
          <CircleCheck />
          <span>Authorize Payment</span>
        </button>

        <button onClick={onReject} className="cursor-pointer border-2 border-highlight-red w-full flex justify-center items-center gap-3 text-highlight-red py-2 rounded-lg font-semibold">
          <CircleX />
          <span>Reject Request</span>
        </button>
      </div>
    </div>
  );
}

