interface DetailedAuthorizationItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

export default function DetailedAuthorizationItem({icon, title, value} : DetailedAuthorizationItemProps) {
    return (
        <li className="flex gap-3 border-b-1 border-gray-200 ">
            <div className="text-gray-600">{icon}</div>
            <div className="mb-2">
                <h4 className="text-gray-600 uppercase text-sm font-semibold mb-1">{title}</h4>
                <p className="font-semibold">{value}</p>
            </div>
        </li>
    )
}
