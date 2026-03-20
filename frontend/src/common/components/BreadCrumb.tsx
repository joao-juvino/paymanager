import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadCrumbProps {
  items: BreadcrumbItem[];
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <nav className="text-gray-600 text-md font-medium">
      {items.map((item, index) => (
        <span key={index}>
          {item.link ? (
            <Link to={item.link} className="hover:text-blue-500">{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}