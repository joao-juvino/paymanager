import { ChevronRight } from "lucide-react";

type Company = {
    name: string,
    cnpj: string,
}

interface AuthorizationTableRowProps {
    id: string;
    company: Company;
    date: string;
    amount: number;
}

export default function AuthorizationTableRow({
  id,
  company: { name, cnpj },
  date,
  amount,
}: AuthorizationTableRowProps) {
  return (
    <tr className="text-center hover:bg-custom-gray">
      <td className="text-gray-600 font-normal text-md py-3">{id}</td>

      <td className="font-normal text-md py-3">
        <h5 className="font-semibold mb-1">{name}</h5>
        <p className="text-gray-600 font-light">{cnpj}</p>
      </td>

      <td className="text-gray-600 font-normal text-md py-3">
        {formatDate(date)}
      </td>

      <td className="font-semibold text-md py-3 text-highlight-blue">
        {formatCurrency(amount)}
      </td>

      <td className="font-normal text-md py-3">
        <ChevronRight className="cursor-pointer hover:text-highlight-blue" />
      </td>
    </tr>
  );
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}