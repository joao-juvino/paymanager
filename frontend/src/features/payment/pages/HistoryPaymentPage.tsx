import { Download, Funnel, Search } from "lucide-react";
import InputDate from "../components/InputDate";
import HistoryStatistics from "../components/HistoryStatistics";
import HistoryTableRow from "../components/HistoryTableRow";
import type { History } from "../../../types/payment";
import { useState } from "react";
import useHistoryFilters from "../hooks/useHistoryFilters";
import PageHeader from "../../../common/components/PageHeader";

const history: History[] = [
  {
    id: "PAY-8821",
    date: "2023-11-20",
    beneficiary: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    value: 12500,
    requester: "Michael Scott",
    authorizer: "Jane Smith",
    status: "Pending",
  },
  {
    id: "PAY-8822",
    date: "2023-11-20",
    beneficiary: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    value: 12500,
    requester: "Michael Scott",
    authorizer: "Jane Smith",
    status: "Rejected",
  },
  {
    id: "PAY-8823",
    date: "2023-11-20",
    beneficiary: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    value: 12500,
    requester: "Michael Scott",
    authorizer: "Jane Smith",
    status: "Rejected",
  },
  {
    id: "PAY-8824",
    date: "2023-11-20",
    beneficiary: { name: "TechSolutions LTDA", cnpj: "12.345.678/0001-90" },
    value: 12500,
    requester: "Michael Scott",
    authorizer: "Jane Smith",
    status: "Rejected",
  },
];


const statistics = [
  { title: "Total records", value: "1,248" },
  { title: "Authorized Values", value: "$452,190.00" },
  { title: "Pending queue", value: "12 items" },
  { title: "Aproval rate", value: "94.2%" },
];

export default function HistoryPaymentPage() {
  const { filters, handleFilterChange, isValidDateRange } = useHistoryFilters();
  const isFilterValid =
    filters.startDate &&
    filters.endDate &&
    isValidDateRange(filters.startDate, filters.endDate);

  const total = 1248;
  const current = history.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      console.log(filters);
    } catch (err) {
      console.error("Failed to fetch history");
    }
  }


  return (
    <div className="px-20 pt-8 pb-4">
      <PageHeader
        title="Record Inquiry"
        description="Audit trail and historical data for all payment requests across the organization."
        action={
          <button className="py-4 flex items-center gap-3 cursor-pointer px-5 border-1 border-gray-300 rounded-lg">
            <Download />
            <span>Export CSV</span>
          </button>
        }
      />
      <div className="border-1 border-gray-200 rounded-lg p-8 py-5">
        <div className="flex gap-3 text-lg font-semibold mb-5">
          <Funnel className="text-highlight-blue" />
          <h4>Search Filters</h4>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-10 items-end">
          <InputDate
            label="Start date"
            value={filters.startDate}
            onChange={(value) => handleFilterChange("startDate", value)}
          />

          <InputDate
            label="End date"
            value={filters.endDate}
            onChange={(value) => handleFilterChange("endDate", value)}
          />

          <button
            className={`cursor-pointer flex gap-3 px-10 py-3 rounded-lg text-white font-semibold 
                ${isFilterValid ? "bg-highlight-blue" : "bg-gray-300 cursor-not-allowed"}`}
            type="submit"
          >
            <Search />
            <span>Inquire</span>
          </button>
        </form>
      </div>
      <div className="flex gap-10 my-5">
        {statistics.map(item => (
          <HistoryStatistics key={item.title} {...item} />
        ))}
      </div>
      <div className="w-full mt-5 border-1 border-gray-200 rounded-lg">
        <table className="w-full text-center">
          <thead className="text-center border-b-1 border-gray-200">
            <tr className="bg-custom-gray">
              <th className="p-3 font-semibold ">Date</th>
              <th className="p-3 font-semibold">Beneficiary</th>
              <th className="p-3 font-semibold">Value</th>
              <th className="p-3 font-semibold">Requester</th>
              <th className="p-3 font-semibold">Authorizer</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => (
              <HistoryTableRow key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex justify-between items-center px-10 py-3 bg-custom-gray rounded-b-lg  border-1 border-t-0 border-gray-300">
        <p className="text-gray-600 text-sm">Showing {current} of {total} total results</p>
        <div className="flex gap-3">
          <button className="cursor-pointer border-1 border-gray-200 p-3 py-1 rounded-lg">Previus</button>
          <button className="border-1 cursor-pointer border-gray-200 p-3 rounded-lg">1</button>
          <button className="border-1 border-transparent cursor-pointer hover:border-gray-200 p-3 py-1 rounded-lg">2</button>
          <button className="border-1 border-transparent cursor-pointer hover:border-gray-200 p-3 py-1 rounded-lg">3</button>
          <button className="cursor-pointer border-1 border-gray-200 p-3 py-1 rounded-lg">Next</button>
        </div>
      </div>
    </div>
  )
}
