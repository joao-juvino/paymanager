import { ShieldCheck } from "lucide-react";

interface LogoProps {
    open: boolean,
}

export default function Logo({ open }: LogoProps) {
    return (
        <div className="flex items-center justify-center gap-2 py-5">
            <div className="bg-highlight-blue flex items-center justify-center text-white p-2 rounded-xl">
                <ShieldCheck className="w-7 h-7" />
            </div>
            {open &&
                <h2 className="text-highlight-blue text-3xl font-bold font-heading">
                    PayManager
                </h2>
            }
        </div>
    )
}
