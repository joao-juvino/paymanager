// frontend/src/features/user/pages/ManageUsersPage.tsx
import {
  AtSign,
  CircleCheck,
  CircleUser,
  Key,
  KeyRound,
  ShieldCheck,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../../../common/components/PageHeader";
import { useAlert } from "../../../contexts/AlertContext";
import type { Role, UserField, UserForm, UserRow, UsersMeta, UsersStatistics } from "../../../types/user";
import UsersTableRow from "../components/UsersTableRow";
import UserRegistrationField from "../components/UserRegistrationField";
import { createUser, getUsers, updateUserRole, updateUserStatus } from "../user.service";
import { useAuth } from "../../../contexts/AuthContext";

const PAGE_SIZE = 4;

const userRegistrationFields: (UserField & { field: keyof UserForm })[] = [
  {
    field: "name",
    type: "text",
    label: "Full Name",
    Icon: CircleUser,
    placeHolder: "Ex: John Doe",
  },
  {
    field: "username",
    type: "text",
    label: "Username",
    Icon: UserRoundCog,
    placeHolder: "johndoe",
  },
  {
    field: "email",
    type: "text",
    label: "Email",
    Icon: AtSign,
    placeHolder: "john@company.com",
  },
  {
    field: "password",
    type: "password",
    label: "Password",
    Icon: KeyRound,
    placeHolder: "************",
  },
  {
    field: "role",
    type: "select",
    label: "Permission level",
    Icon: Key,
    placeHolder: "Select a role",
    options: [
      { label: "Requester (Create requests)", value: "REGISTRATION" },
      { label: "Approver (Authorize payments)", value: "AUTHORIZATION" },
      { label: "Admin (Full access)", value: "ADMIN" },
    ],
  },
];

export default function ManageUsersPage() {
  const { user: currentUser } = useAuth();
  const { showAlert } = useAlert();

  const [form, setForm] = useState<UserForm>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [meta, setMeta] = useState<UsersMeta>({
    page: 1,
    limit: PAGE_SIZE,
    totalRecords: 0,
    totalPages: 1,
  });
  const [statistics, setStatistics] = useState<UsersStatistics>({
    activeUsers: 0,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback((field: keyof UserForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  async function loadUsers(page = 1, searchValue = search) {
    setLoading(true);

    try {
      const data = await getUsers({
        page,
        limit: PAGE_SIZE,
        search: searchValue.trim() || undefined,
      });

      setUsers(data.items);
      setMeta(data.meta);
      setStatistics(data.statistics);
    } catch (err: any) {
      showAlert(err.message || "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createUser({
        name: form.name,
        username: form.username || undefined,
        email: form.email,
        password: form.password,
        role: form.role as Role,
      });

      showAlert("User created successfully", "success");
      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
      });
      await loadUsers(1, search);
    } catch (err: any) {
      showAlert(err.message || "Failed to create user", "error");
    }
  }

  async function handleToggleStatus(user: UserRow) {
    try {
      await updateUserStatus(user.id, user.status !== "Active");
      await loadUsers(meta.page, search);
    } catch (err: any) {
      showAlert(err.message || "Failed to update user status", "error");
    }
  }

  async function handleChangeRole(userId: number, role: Role) {
    try {
      await updateUserRole(userId, role);
      await loadUsers(meta.page, search);
    } catch (err: any) {
      showAlert(err.message || "Failed to update user role", "error");
    }
  }

  const isFormValid = Object.values(form).every(Boolean);

  const activeUsers = useMemo(() => statistics.activeUsers, [statistics]);

  async function handlePageChange(page: number) {
    await loadUsers(page, search);
  }

  async function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    await loadUsers(1, search);
  }

  return (
    <div className="px-20 py-10">
      <PageHeader
        title="User Management"
        description="Control system access by adding new members, editing permissions, and monitoring active accounts."
        action={
          <div className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 px-5 py-4">
            <CircleCheck />
            <span>Active Users</span>
            <span>({activeUsers})</span>
          </div>
        }
      />

      <div className="flex w-full gap-10">
        <div className="box-border flex w-full max-w-sm flex-col items-center justify-center rounded-lg border border-gray-200 p-8 px-8">
          <div className="mb-3">
            <div className="mb-3 flex items-center gap-3 text-highlight-blue">
              <UserRoundPlus className="font-semibold" />
              <h2 className="text-2xl font-semibold">User Registration</h2>
            </div>
            <p className="text-sm text-gray-600">
              Create a new system user and assign their access level.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {userRegistrationFields.map((item) => (
              <UserRegistrationField
                key={item.field}
                {...item}
                value={form[item.field]}
                onChange={(value) => handleChange(item.field, value)}
              />
            ))}

            <button
              disabled={!isFormValid}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-highlight-blue py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
            >
              <ShieldCheck />
              <span>Save User Profile</span>
            </button>
          </form>
        </div>

        <div className="w-full">
          <div className="flex w-full items-center justify-between rounded-t-lg border border-b-0 border-gray-200 bg-custom-gray px-10 py-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">System Users</h2>
              <p className="text-gray-600">
                Managing {statistics.totalRecords} accounts in the ecosystem.
              </p>
            </div>

            <form onSubmit={handleSearchSubmit}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 outline-none"
                type="text"
                placeholder="Search users..."
              />
            </form>
          </div>

          <div className="w-full border border-gray-200">
            <table className="w-full text-center">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Last Activity</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const isSelf = user.id === currentUser?.id;

                    return (
                      <UsersTableRow
                        key={user.id}
                        {...user}
                        isSelf={isSelf}
                        onToggleStatus={() => handleToggleStatus(user)}
                        onChangeRole={(role) => handleChangeRole(user.id, role)}
                      />
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-gray-300 bg-custom-gray px-10 py-5">
            <p className="text-sm text-gray-600">
              Showing {users.length} of {meta.totalRecords} registered users
            </p>

            <div className="flex gap-3">
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
    </div>
  );
}