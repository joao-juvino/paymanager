import { useEffect, useMemo, useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import AuthorizationTableRow from "../components/AuthorizationTableRow";
import AuthorizationStatistics from "../components/AuthorizationStatistics";
import DetailedAuthorizationRequest from "../components/DetailedAuthorizationRequest";
import type { Payment, PaymentRequest } from "../../../types/payment";
import PageHeader from "../../../common/components/PageHeader";
import { getPendingPayments, updatePaymentStatus } from "../payment.service";
import { useAlert } from "../../../contexts/AlertContext";

function mapPaymentToRequest(payment: Payment): PaymentRequest {
  return {
    id: `PAY-${String(payment.id).padStart(4, "0")}`,
    company: {
      name: payment.companyName,
      cnpj: payment.cnpj,
    },
    date: new Date(payment.createdAt).toLocaleDateString("pt-BR"),
    amount: payment.amount,
    requester: payment.user?.name ?? payment.user?.email ?? "Unknown",
    description: payment.description,
    status: payment.status,
  };
}

export default function AnalysePaymentPage() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  async function loadPendingPayments() {
    try {
      setLoading(true);
      const data = await getPendingPayments();
      setRequests(
        data.map(mapPaymentToRequest)
      );
    } catch (err: any) {
      showAlert(
        err.message || "Failed to load pending payments",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPendingPayments();
  }, []);

  const statistics = useMemo(() => {
    const total = requests.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return [
      {
        title: "Pending Requests",
        value: String(requests.length),
        icon: <CircleAlert />,
        theme: "blue" as const
      },
      {
        title: "Total Pending",
        value: `R$ ${total.toLocaleString("pt-BR", {
          minimumFractionDigits: 2
        })}`,
        icon: <CircleCheck />,
        theme: "green" as const
      },
    ];
  }, [requests]);

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const selectedRequest = requests.find(r => r.id === selectedRequestId) ?? null;

  async function handleAuthorize(
    paymentIdText: string,
    status: "APPROVED" | "REJECTED"
  ) {
    const paymentId = Number(
      paymentIdText.replace("PAY-", "")
    );

    try {
      await updatePaymentStatus(paymentId, status);

      setRequests((prev) =>
        prev.filter((item) => item.id !== paymentIdText)
      );

      showAlert(
        status === "APPROVED"
          ? "Payment approved successfully"
          : "Payment rejected successfully",
        "success"
      );
    } catch (err: any) {
      showAlert(
        err.message || "Could not update payment",
        "error"
      );
    }
  }

  if (loading) {
    return (
      <div className="px-20 py-10">
        <PageHeader
          title="Pending Authorizations"
          description="Review and approve pending financial transactions."
        />
        <div className="mt-8 text-gray-500">
          Loading pending payments...
        </div>
      </div>
    );
  }

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
                <h4 className="font-semibold">
                  {requests.length} Pending Requests
                </h4>
              </div>
              <span className="font-light italic text-sm text-gray-600">
                Authorizer: {selectedRequest ? selectedRequest.requester : "-"}
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
                  <AuthorizationTableRow
                    key={item.id}
                    {...item}
                    onApprove={() => handleAuthorize(item.id, "APPROVED")}
                    onReject={() => handleAuthorize(item.id, "REJECTED")}
                    onSelect={() => setSelectedRequestId(item.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex pt-5 gap-5">
            {statistics.map((item) => (
              <AuthorizationStatistics
                key={item.title}
                {...item}
              />
            ))}
          </div>
        </div>

        {selectedRequest ? (
          <DetailedAuthorizationRequest
            request={selectedRequest}
            onApprove={() => handleAuthorize(selectedRequest.id, "APPROVED")}
            onReject={() => handleAuthorize(selectedRequest.id, "REJECTED")}
          />
        ) : (
          <div className="w-full p-8 rounded-lg border border-gray-200 text-gray-500">
            Select one request to view in details.
          </div>
        )}
      </main>
    </div>
  );
}