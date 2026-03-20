
import { Building2, Calendar, CircleAlert, CircleCheck, CirclePlus, Clock, CreditCard, FileText, Hash, MoveRight, User } from "lucide-react";
import PaymentFormItem from "../components/PaymentFormItem";
import SubmissionMetadataItem from "../components/SubmissionMetadataItem";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import type { PaymentForm } from "../../../types/payment";
import PaymentChecklist from "../components/PaymentChecklist";
import PaymentMetadata from "../components/PaymentMetadata";

const RegisterPaymentFields: {
  field: keyof PaymentForm;
  name: string;
  type: string;
  icon: React.ReactNode;
  required: boolean;
  description?: string;
  placeHolder: string;
}[] = [
    {
      field: "cnpj",
      name: "Beneficiary's CNPJ",
      type: "text",
      icon: <Hash />,
      required: true,
      description: "National Registry of Legal Entities identifier.",
      placeHolder: "00.000.000/0000-00"
    },
    {
      field: "companyName",
      name: "Company Name",
      type: "text",
      icon: <Building2 />,
      required: true,
      placeHolder: "e.g. Acme Corporation SA"
    },
    {
      field: "amount",
      name: "Payment Amount ",
      type: "text",
      icon: <CreditCard />,
      required: true,
      description: "Current balance and limits are validated upon submission.",
      placeHolder: "R$ 0,00"
    },
  ];

export default function RegisterPaymentPage() {
  const { user } = useAuth();

  const [form, setForm] = useState<PaymentForm>({
    cnpj: "",
    companyName: "",
    amount: "",
    description: "",
  });

  function handleChange(field: keyof PaymentForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <div className="px-20 py-10">
      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-semibold font-heading">Register new payment</h1>
        <p className="text-gray-600">Fill in the beneficiary details and transaction amount to initiate the authorization workflow.</p>
      </header>
      <div className="flex gap-10">
        <main className="w-5xl shadow-sm rounded-lg">
          <div className="px-10 py-5 border-b-1 border-gray-300 flex gap-3 bg-custom-gray">
            <div className="rounded-lg p-3 bg-custom-blue">
              <CirclePlus className="text-blue-400" />
            </div>
            <div>
              <h2 className="font-semibold text-xl mb-1">
                Payment Details
              </h2>
              <p className="text-sm font-normal text-gray-600">Mandatory fields are marked with an asterisk.</p>
            </div>
          </div>
          <div className="px-10 py-7 flex flex-col gap-5">
            <form name="payment-form" onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-between">
                {RegisterPaymentFields.map(item => (
                  <PaymentFormItem
                    key={item.field}
                    {...item}
                    value={form[item.field]}
                    onChange={(v) => handleChange(item.field, v)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="text-gray-600">
                    <FileText />
                  </div>
                  <label className="font-normal text-md">Service Description</label>
                  <span className="text-highlight-red font-semibold">*</span>
                </div>
                <textarea
                  className="resize-none w-full min-h-28 outline-none border-1 border-gray-200 p-3 rounded-lg"
                  placeholder="Provide a detailed justification for this payment request..."
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="bg-custom-gray flex justify-end px-10 py-5 gap-5">
            <button onClick={() => setForm({
              cnpj: "",
              companyName: "",
              amount: "",
              description: "",
            })}
              className="font-semibold text-sm cursor-pointer bg-white px-5 py-3 border-1 border-gray-300 p-3 rounded-lg">
              Cancel
            </button>
            <button type="submit" form="payment-form" className="font-semibold text-sm cursor-pointer bg-highlight-blue text-white px-5 py-3 p-3 rounded-lg">Submit Request</button>
          </div>
        </main>
        <div className="flex flex-col gap-5">
          <PaymentMetadata user={user} />
          <PaymentChecklist />
        </div>
      </div>
    </div>
  )
}
