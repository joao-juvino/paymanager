type Theme = "blue" | "green";

interface AuthorizationStatisticsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  theme: Theme;
}

export default function AuthorizationStatistics({ title, value, icon, theme }: AuthorizationStatisticsProps) {
  let iconStyle =
    theme === "blue"
      ? "text-highlight-blue bg-custom-blue"
      : "text-highlight-green bg-custom-green";

  return (
    <div className="grow-1 flex items-center gap-3 border-1 border-gray-200 p-5 rounded-lg">
      <div className={`p-3 rounded-full text-highlight-blue ${iconStyle}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm uppercase font-bold text-gray-600">{title}</h3>
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
}