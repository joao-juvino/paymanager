import { Calendar, CircleCheck, Clock, User as UserIcon } from 'lucide-react'
import type { User } from '../../../types/user';
import SubmissionMetadataItem from './SubmissionMetadataItem';

interface PaymentMetadataProps {
    user: User | null;
}

export default function PaymentMetadata({ user }: PaymentMetadataProps) {
    const today = new Date();
    const extendedToday = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const MetadataItems = [
        { icon: <UserIcon />, title: "Manager", value: user?.name },
        { icon: <Calendar />, title: "Date", value: extendedToday },
        { icon: <CircleCheck />, title: "Status", value: <div className="bg-custom-blue text-highlight-blue py-2 px-5 rounded-full">Pending</div> },
    ];

    return (
        <div className="bg-custom-gray p-8 rounded-lg">
            <div className="flex gap-3 mb-1">
                <Clock className="text-highlight-blue" />
                <h3 className="font-semibold">Submission Metadata</h3>
            </div>
            <p className="text-gray-600 text-sm">The following details will be automatically attached to this request.</p>
            <ul className="flex flex-col py-3 gap-3">
                {MetadataItems.map(item => (
                    <SubmissionMetadataItem key={item.title} {...item} />
                ))}
            </ul>
        </div>
    )
}
