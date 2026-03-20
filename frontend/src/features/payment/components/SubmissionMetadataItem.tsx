interface SubmissionMetadataItemProps {
    icon: React.ReactNode;
    title: string;
    value: React.ReactNode;
}

export default function SubmissionMetadataItem({ icon, title, value }: SubmissionMetadataItemProps) {
    return (
        <li className="flex justify-between">
            <div className="flex gap-3 text-gray-600">
                <div>{icon}</div>
                <p>{title}</p>
            </div>
            <span className="font-semibold">{value}</span>
        </li>
    )
}
