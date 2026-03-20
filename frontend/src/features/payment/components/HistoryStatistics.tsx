interface HistoryStatisticsProps {
    title: string;
    value: string;
}

export default function HistoryStatistics({title, value}: HistoryStatisticsProps) {
  return (
    <div className="grow-1 border-1 border-gray-100 bg-custom-gray rounded-lg px-10 py-5">
      <h3 className="mb-1 uppercase font-semibold text-xs text-gray-600">{title}</h3>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}
