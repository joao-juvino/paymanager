interface Props {
  title: string;
  value: string;
}

export default function HistoryStatistics({ title, value }: Props) {
  return (
    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="mt-2 text-xl font-bold text-gray-900">{value}</h4>
    </div>
  );
}