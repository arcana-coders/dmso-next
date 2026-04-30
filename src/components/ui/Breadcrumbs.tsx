import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
    items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="text-xs text-stone-500 mb-6">
            <ol className="flex items-center gap-1">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1">
                        {index > 0 && <span>/</span>}
                        {item.href ? (
                            <Link href={item.href} className="hover:underline hover:text-dmso-dark transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-stone-800 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
