import { CirclePlus, History, LogOut, SquareCheckBig, Users } from "lucide-react";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import { logout } from "../../features/auth/auth.service";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const menuItems = [
    {
        link: "/payment/register",
        icon: <CirclePlus />,
        text: "Register Payment",
        allowedRoles: ["REGISTRATION", "AUTHORIZATION", "ADMIN"],
    },
    {
        link: "/payment/analyse",
        icon: <SquareCheckBig />,
        text: "Authorize Requests",
        allowedRoles: ["AUTHORIZATION", "ADMIN"],
    },
    {
        link: "/payment/history",
        icon: <History />,
        text: "Payment History",
        allowedRoles: ["REGISTRATION", "AUTHORIZATION", "ADMIN"],
    },
    {
        link: "/users",
        icon: <Users />,
        text: "User Management",
        allowedRoles: ["ADMIN"],
    },
];
export default function SideMenu() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
            navigate("/login", { replace: true });
        } catch (err: any) {
            console.error(err.message);
        }
    }

    const filteredMenu = menuItems.filter((item) =>
        user ? item.allowedRoles.includes(user.role) : false
    );

    return (
        <aside className="flex flex-col bg-custom-gray">
            <div className="p-10 grow-1">
                <Logo open={true} />
                <nav className="pt-10 text-gray-500">
                    <ul>
                        {filteredMenu.map((item) => (
                            <MenuItem key={item.link} {...item} />
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="border-t-1 border-gray-300">
                <button
                    onClick={handleLogout}
                    className="text-md cursor-pointer text-highlight-red py-10 px-15 flex gap-3"
                >
                    <LogOut />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
