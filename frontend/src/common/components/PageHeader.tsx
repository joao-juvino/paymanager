
export default function PageHeader({ title, description, action }: {
    title: string;
    description: string;
    action?: React.ReactNode;
}) {
    return (
        <header className="mb-10 flex justify-between">
            <div>
                <h1 className="mb-2 text-3xl font-semibold font-heading">{title}</h1>
                <p className="text-gray-600">{description}</p>
            </div>
            <span className="pt-3">
                {action}
            </span>
        </header>
    );
}

