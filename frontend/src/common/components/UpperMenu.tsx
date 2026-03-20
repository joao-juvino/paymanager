import { Bell } from "lucide-react";
import BreadCrumb from "./BreadCrumb";
import { useState } from "react";

interface UpperMenuProps {
    userName: string;
    userRole: string;
    userImage: string;
    notifications: number;
}


export default function UpperMenu({ userName, userRole, userImage, notifications }: UpperMenuProps) {

    return (
        <div className="px-10 py-5 flex justify-between items-center text-gray-800 border-b-1 border-gray-300">
            <BreadCrumb items={[
                { label: "Dashboard", },
                { label: "PayManager" }
            ]} />
            <nav>
                <ul className="flex items-center gap-8">
                    <li className="px-8 border-r-1 border-gray-300 relative ">
                        <Bell className="cursor-pointer" />
                        {notifications > 0 && (
                            <span className="absolute -top-1 right-8 w-3 h-3 bg-red-500 rounded-full"></span>
                        )}
                    </li>
                    <li className="flex gap-5">
                        <div className="flex flex-col items-end">
                            <h4 className="font-medium text-md">{userName}</h4>
                            <span className="font-medium text-xs text-gray-600">{userRole}</span>
                        </div>
                        <div className="cursor-pointer object-cover w-12 h-12 relative rounded-full">
                            <img className="w-full h-full rounded-full opacity-90" src={userImage} alt="" />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
