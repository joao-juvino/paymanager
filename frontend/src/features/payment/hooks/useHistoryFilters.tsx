import { useState } from 'react';

type HistoryFilters = {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
};

export default function useHistoryFilters(initial?: Partial<HistoryFilters>) {
  const [filters, setFilters] = useState<HistoryFilters>({
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
    ...initial,
  });

  function handleFilterChange(field: 'startDate' | 'endDate', value: string) {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1,
    }));
  }

  function setPage(page: number) {
    setFilters((prev) => ({ ...prev, page }));
  }

  function isValidDateRange(startDate: string, endDate: string) {
    if (!startDate || !endDate) return true;
    return new Date(startDate).getTime() <= new Date(endDate).getTime();
  }

  function resetFilters() {
    setFilters({
      startDate: '',
      endDate: '',
      page: 1,
      limit: 10,
    });
  }

  return {
    filters,
    setFilters,
    setPage,
    handleFilterChange,
    isValidDateRange,
    resetFilters,
  };
}