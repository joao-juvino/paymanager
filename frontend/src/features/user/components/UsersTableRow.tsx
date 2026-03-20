import { Clock } from "lucide-react";
import type { Role, UserRow } from "../../../types/user";

export default function UsersTableRow({ name, username, role, status, lastActivity }: UserRow) {
    const roleStyle: Record<Role, string> = {
        Admin: "text-white bg-highlight-blue",
        Authorizer: "border-1 bg-custom-green border-highlight-green",
        Requester: "bg-gray-100",
    };
    return (
        <tr className="border-b-1 border-gray-300 text-gray-700">
            <td className="py-3">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm">{username}</p>
            </td>
            <td className="py-3">
                <span className={`font-bold px-3 py-1 rounded-full text-sm ${roleStyle[role]}`}>
                    {role}
                </span>
            </td>
            <td className="py-3">
                {status}
            </td>
            <td className="py-6 flex justify-center items-center gap-3">
                <Clock />
                <span>{lastActivity}</span>
            </td>
        </tr>
    )
}
