import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  link: string;
  icon: React.ReactNode;
  text: string;
}


export default function MenuItem({ link, icon, text }: MenuItemProps) {
  return (
    <li className="flex items-center gap-5 rounded-lg mb-3 hover:bg-menu-select">
      <Link to={link} className="p-3 flex items-center gap-5 w-full">
        {icon}
        <span className="text-gray-800 font-sm text-md">{text}</span>
      </Link>
    </li>
  );
}