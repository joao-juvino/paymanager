import { Download, Funnel, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import InputDate from "../components/InputDate";
import HistoryStatistics from "../components/HistoryStatistics";
import HistoryTableRow from "../components/HistoryTableRow";
import type {
  History,
  HistoryMeta,
  HistoryStatistics as HistoryStatisticsType,
} from "../../../types/payment";
import useHistoryFilters from "../hooks/useHistoryFilters";
import PageHeader from "../../../common/components/PageHeader";
import { getPaymentHistory } from "../payment.service";
import { formatCurrency } from "../../../common/utils";

export default function HistoryPaymentPage() {
  const { filters, handleFilterChange, isValidDateRange, setPage } = useHistoryFilters();
  const [items, setItems] = useState<History[]>([]);
  const [meta, setMeta] = useState<HistoryMeta>({
    page: 1,
    limit: 4,
    totalRecords: 0,
    totalPages: 1,
  });
  const [statistics, setStatistics] = useState<HistoryStatisticsType>({
    totalRecords: 0,
    authorizedValues: 0,
    pendingQueue: 0,
    approvalRate: 0,
  });
  const [loading, setLoading] = useState(true);

  const isPartialDateRange =
    Boolean(filters.startDate) !== Boolean(filters.endDate);

  const isFilterValid =
    !isPartialDateRange && isValidDateRange(filters.startDate, filters.endDate);

  async function loadHistory(query = filters) {
    setLoading(true);

    try {
      const data = await getPaymentHistory({
        ...query,
        limit: 3,
      });

      setItems(data.items);
      setMeta(data.meta);
      setStatistics(data.statistics);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadHistory({ ...filters, page: 1 });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isFilterValid) return;

    setPage(1);
    await loadHistory({ ...filters, page: 1 });
  }

  async function handlePageChange(page: number) {
    setPage(page);
    await loadHistory({ ...filters, page });
  }

  async function handleExportCsv() {
    const csvRows = await getPaymentHistory({
      ...filters,
      page: 1,
      limit: Math.max(statistics.totalRecords, 1),
    });

    const csv = buildCsv(csvRows.items);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "payment-history.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  const statsCards = useMemo(
    () => [
      { title: "Total records", value: statistics.totalRecords.toLocaleString("pt-BR") },
      { title: "Authorized Values", value: formatCurrency(statistics.authorizedValues) },
      { title: "Pending queue", value: `${statistics.pendingQueue.toLocaleString("pt-BR")} items` },
      { title: "Approval rate", value: `${statistics.approvalRate.toFixed(1)}%` },
    ],
    [statistics],
  );

  return (
    <div className="px-20 pt-8 pb-4">
      <PageHeader
        title="Record Inquiry"
        description="Audit trail and historical data for all payment requests across the organization."
        action={
          <button
            onClick={handleExportCsv}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 px-5 py-4"
          >
            <Download />
            <span>Export CSV</span>
          </button>
        }
      />

      <div className="rounded-lg border border-gray-200 p-8 py-5">
        <div className="mb-5 flex gap-3 text-lg font-semibold">
          <Funnel className="text-highlight-blue" />
          <h4>Search Filters</h4>
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-10">
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
            className={`flex cursor-pointer gap-3 rounded-lg px-10 py-3 font-semibold text-white ${isFilterValid ? "bg-highlight-blue" : "cursor-not-allowed bg-gray-300"
              }`}
            type="submit"
            disabled={!isFilterValid}
          >
            <Search />
            <span>Inquire</span>
          </button>
        </form>
      </div>

      <div className="my-5 flex gap-10">
        {statsCards.map((item) => (
          <HistoryStatistics key={item.title} {...item} />
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-center">
          <thead className="border-b border-gray-200">
            <tr className="bg-custom-gray">
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Beneficiary</th>
              <th className="p-3 font-semibold">Value</th>
              <th className="p-3 font-semibold">Requester</th>
              <th className="p-3 font-semibold">Authorizer</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-gray-500">
                  Loading history...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <HistoryTableRow
                  key={item.id}
                  {...item}
                />
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-200 bg-custom-gray px-10 py-3">
          <p className="text-sm text-gray-600">
            Showing {items.length} of {meta.totalRecords} total results
          </p>

          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handlePageChange(Math.max(1, meta.page - 1))}
              disabled={meta.page <= 1}
              type="button"
            >
              Previous
            </button>

            <span className="rounded-lg border border-gray-200 px-3 py-1 font-semibold">
              {meta.page}
            </span>

            <button
              className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handlePageChange(Math.min(meta.totalPages, meta.page + 1))}
              disabled={meta.page >= meta.totalPages}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildCsv(rows: History[]) {
  const headers = [
    "ID",
    "Date",
    "Beneficiary",
    "CNPJ",
    "Value",
    "Requester",
    "Authorizer",
    "Status",
  ];

  const lines = rows.map((row) =>
    [
      row.id,
      new Date(row.date).toLocaleDateString("pt-BR"),
      row.beneficiary.name,
      row.beneficiary.cnpj,
      row.value.toFixed(2),
      row.requester,
      row.authorizer,
      row.status,
    ]
      .map(escapeCsv)
      .join(","),
  );

  return [headers.join(","), ...lines].join("\n");
}

function escapeCsv(value: string) {
  const safe = String(value).replace(/"/g, '""');
  return `"${safe}"`;
}