import {
  CircleAlert,
  CircleCheck,
} from "lucide-react";
import AuthorizationTableRow from "../components/AuthorizationTableRow";
import AuthorizationStatistics from "../components/AuthorizationStatistics";
import DetailedAuthorizationRequest from "../components/DetailedAuthorizationRequest";
import type { PaymentRequest } from "../../../types/payment";
import PageHeader from "../../../common/components/PageHeader";

const requests: PaymentRequest[] = [
  {
    id: "PAY-8821",
    company: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    date: "2023-11-20",
    amount: 12500,
    requester: "Michael Scott",
    description: "Cloud infrastructure maintenance for Q3 - AWS and Azure services management.",
  },
  {
    id: "PAY-8822",
    company: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    date: "2023-11-20",
    amount: 12500,
    requester: "Michael Scott",
    description: "Cloud infrastructure maintenance for Q3 - AWS and Azure services management.",
  },
  {
    id: "PAY-8823",
    company: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    date: "2023-11-20",
    amount: 12500,
    requester: "Michael Scott",
    description: "Cloud infrastructure maintenance for Q3 - AWS and Azure services management.",
  },
  {
    id: "PAY-8824",
    company: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    date: "2023-11-20",
    amount: 12500,
    requester: "Michael Scott",
    description: "Cloud infrastructure maintenance for Q3 - AWS and Azure services management.",
  },

];

export default function AnalysePaymentPage() {
  const statistics = [
    { title: "Daily Quota", value: "R$ 450.000,00", icon: <CircleCheck />, theme: "blue" as const },
    { title: "Priority Items", value: "2 High Risk", icon: <CircleAlert />, theme: "green" as const },
  ];

  const selectedRequest = requests[0];

  return (
    <div className="px-20 py-10">
      <PageHeader
        title="Pending Authorizations"
        description="Review and approve pending financial transactions. Ensure all details match the contracted services before authorizing disbursements."
      />

      <main className="flex gap-10">
        <div>
          <div className="w-3xl rounded-lg">
            <div className="flex justify-between p-5 bg-custom-gray rounded-t-lg border-1 border-gray-200">
              <div className="flex gap-3">
                <CircleAlert className="text-highlight-blue" />
                <h4 className="font-semibold">{requests.length} Pending Requests</h4>
              </div>
              <span className="font-light italic text-sm text-gray-600">
                Authorizer: Jane Smith
              </span>
            </div>

            <table className="w-full border-1 border-gray-200">
              <thead className="w-full">
                <tr className="text-center">
                  <th className="py-3">ID</th>
                  <th className="py-3">Beneficiary</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Value</th>
                  <th className="py-3"></th>
                </tr>
              </thead>

              <tbody>
                {requests.map((item) => (
                  <AuthorizationTableRow key={item.id} {...item} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex pt-5 gap-5">
            {statistics.map((item) => (
              <AuthorizationStatistics key={item.title} {...item} />
            ))}
          </div>
        </div>

        <DetailedAuthorizationRequest request={selectedRequest} />
      </main>
    </div>
  );
}