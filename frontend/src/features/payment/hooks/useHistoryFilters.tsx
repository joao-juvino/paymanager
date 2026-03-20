import { useState } from "react";

type Filters = {
  startDate: string;
  endDate: string;
};

export default function useHistoryFilters() {
  const [filters, setFilters] = useState<Filters>({
    startDate: "",
    endDate: "",
  });

  function handleFilterChange(field: keyof Filters, value: string) {
    setFilters(prev => ({ ...prev, [field]: value }));
  }

  function isValidDateRange(start: string, end: string) {
    return new Date(start) <= new Date(end);
  }

  return {
    filters,
    handleFilterChange,
    isValidDateRange
  };
}