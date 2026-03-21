// frontend/src/features/user/components/UsersTableRow.tsx
import { ShieldCheck, ShieldOff } from "lucide-react";
import type { UserRow, Role } from "../../../types/user";

type Props = UserRow & {
  isSelf?: boolean;
  onToggleStatus: () => void;
  onChangeRole: (role: Role) => void;
};

export default function UsersTableRow({
  name,
  username,
  role,
  status,
  lastActivity,
  isSelf,
  onToggleStatus,
  onChangeRole,
}: Props) {
  return (
    <tr className="border-b border-gray-200 hover:bg-custom-gray">
      <td className="p-4 text-center">
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{username}</div>
      </td>

      <td className="p-4">
        <select
          disabled={isSelf}
          value={role}
          onChange={(e) => onChangeRole(e.target.value as Role)}
          className="rounded-lg border border-gray-200 px-3 py-2 outline-none"
        >
          <option value="REGISTRATION">Requester</option>
          <option value="AUTHORIZATION">Authorizer</option>
          <option value="ADMIN">Admin</option>
        </select>
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="p-4 text-sm text-gray-700">
        {new Date(lastActivity).toLocaleString("pt-BR")}
      </td>

      <td className="p-4">
        <button
          disabled={isSelf}
          type="button"
          onClick={onToggleStatus}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:border-highlight-blue hover:text-highlight-blue"
        >
          {status === "Active" ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
          {status === "Active" ? "Deactivate" : "Activate"}
        </button>
      </td>
    </tr>
  );
}