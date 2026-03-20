import { AtSign, CircleCheck, CircleUser, Clock, Key, KeyRound, ShieldCheck, UserRoundPlus } from "lucide-react";
import PageHeader from "../../../common/components/PageHeader";
import UserRegistrationField from "../components/UserRegistrationField";
import { useCallback, useState } from "react";
import type { Role, UserField, UserRow } from "../../../types/user";
import UsersTableRow from "../components/UsersTableRow";

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
    label: "Login / Username",
    Icon: AtSign,
    placeHolder: "johndoe",
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
      { label: "Requester (Create requests)", value: "Requester" },
      { label: "Approver (Authorize payments)", value: "Authorizer" },
      { label: "Admin (Full access)", value: "Admin" },
    ]
  },
];

const users: UserRow[] = [
  { name: "Ricardo Oliveira", username: "@ricaro.o", role: "Admin", status: "Active", lastActivity: "2 mins ago", },
  { name: "Ricardo Oliveira", username: "@ricaro.o", role: "Authorizer", status: "Active", lastActivity: "2 mins ago", },
  { name: "Ricardo Oliveira", username: "@ricaro.o", role: "Requester", status: "Active", lastActivity: "2 mins ago", },
  { name: "Ricardo Oliveira", username: "@ricaro.o", role: "Admin", status: "Active", lastActivity: "2 mins ago", },
  { name: "Ricardo Oliveira", username: "@ricaro.o", role: "Admin", status: "Active", lastActivity: "2 mins ago", },
];

type UserForm = {
  name: string;
  username: string;
  password: string;
  role: Role | "";
};

export default function ManageUsersPage() {
  const current = 1;
  const total = 5;
  const activeUsers = 10;
  const [form, setForm] = useState<UserForm>({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = useCallback((field: keyof UserForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);

    setForm({
      name: "",
      username: "",
      password: "",
      role: "",
    });
  }

  const [search, setSearch] = useState("");
  const isFormValid = Object.values(form).every(Boolean);

  return (
    <div className="px-20 py-10">
      <PageHeader
        title="User Management"
        description="Control system access by adding new members, editing existing permissions, or monitoring active accounts within the organization."
        action={
          <div className="px-5 py-4 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center">
            <CircleCheck />
            <span>Active Users</span>
            <span>({activeUsers})</span>
          </div>
        }
      />
      <div className="flex w-full gap-10">
        <div className="px-8 p-8 rounded-lg box-border w-full max-w-sm border-1 border-gray-200 flex flex-col justify-center items-center">
          <div className="mb-3">
            <div className="flex items-center gap-3 text-highlight-blue mb-3">
              <UserRoundPlus className="font-semibold" />
              <h2 className="text-2xl font-semibold">User Registration</h2>
            </div>
            <p className="text-gray-600 text-sm">Create a new system user and assign their access level.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {userRegistrationFields.map(item => (
              <UserRegistrationField
                key={item.field}
                {...item}
                value={form[item.field]}
                onChange={(value) => handleChange(item.field, value)}
              />
            ))}
            <button disabled={!isFormValid} className="w-full bg-highlight-blue rounded-lg flex justify-center items-center py-3 text-white " type="submit">
              <ShieldCheck />
              <span>
                Save User Profile
              </span>
            </button>
          </form>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between bg-custom-gray py-5 px-10 w-full border-1 border-b-0 border-gray-200 rounded-t-lg">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">System Users</h2>
              <p className="text-gray-600">Managing 5 accounts in the AuthFlow ecosystem.</p>
            </div>
            <span>
              <input onChange={(e) => setSearch(e.target.value)} className="py-3 px-5 outline-none bg-white border-1 border-gray-200 rounded-lg" type="text" placeholder="Search users..." />
            </span>
          </div>
          <div className="w-full border-1 border-gray-200 ">
            <table className="w-full text-center">
              <thead className="text-center border-b-1 border-gray-200">
                <tr>
                  <th className="p-4 font-semibold ">User</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <UsersTableRow key={user.username} {...user} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center px-10 py-5 bg-custom-gray rounded-b-lg  border-1 border-t-0 border-gray-300">
            <p className="text-gray-600 text-sm">Showing {current} to {total} of {total} registered users</p>
            <div className="flex gap-3">
              <button className="cursor-pointer border-1 border-gray-200 p-3 py-1 rounded-lg">Previus</button>
              <button className="cursor-pointer border-1 border-gray-200 p-3 py-1 rounded-lg">Next</button>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}
