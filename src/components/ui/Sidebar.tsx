"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HandHeart,
    Building2,
    Truck,
    ShieldCheck,
    Sparkles,
    Leaf,
} from "lucide-react";

const navItems = [
    { href: "/donor", label: "Donor Dashboard", icon: HandHeart },
    { href: "/ngo", label: "NGO Dashboard", icon: Building2 },
    { href: "/volunteer", label: "Volunteer Dashboard", icon: Truck },
    { href: "#", label: "Admin Panel", icon: ShieldCheck },
    { href: "#", label: "AI Features", icon: Sparkles },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[240px] h-screen bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-glass)] flex flex-col fixed top-0 left-0 z-50">
            {/* Logo */}
            <div className="p-5 border-b border-[var(--color-border-glass)]">
                <Link href="/" className="flex items-center gap-2.5 no-underline">
                    <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                        <Leaf size={18} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-cal)" }}>
                        ZeroWaste
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href + item.label}
                            href={item.href}
                            className={`sidebar-link ${isActive ? "active" : ""}`}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
