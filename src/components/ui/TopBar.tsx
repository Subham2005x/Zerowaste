"use client";

import { Bell, ChevronDown, Menu, User, Leaf } from "lucide-react";

interface TopBarProps {
    title: string;
    onMenuClick?: () => void;
}

export default function TopBar({ title }: TopBarProps) {
    return (
        <header className="sticky top-4 z-40 mx-auto w-[95%] max-w-6xl mb-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg flex items-center justify-between px-6 py-3 transition-all duration-300">
            {/* Left: Brand */}
            <div className="flex items-center gap-4 flex-1 justify-start">
                <button className="lg:hidden text-[var(--color-text-secondary)] hover:text-white transition-colors">
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-[rgba(82,183,136,0.3)] flex items-center justify-center">
                        <Leaf size={16} className="text-[var(--color-green-bright)]" />
                    </div>
                    <span className="text-base tracking-widest uppercase font-medium text-white hidden sm:block" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        ZeroWaste
                    </span>
                </div>
            </div>

            {/* Center: Title */}
            <div className="flex-1 flex justify-center">
                <h1 className="text-sm md:text-l font-medium text-[var(--color-text-secondary)] uppercase tracking-widest text-center" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    {title}
                </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-5 flex-1 justify-end" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {/* Notification Bell */}
                <button className="relative text-[var(--color-text-secondary)] hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[var(--color-urgent-red)] rounded-full text-[10px] flex items-center justify-center text-white font-bold border border-black">
                        3
                    </span>
                </button>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-white/10 hidden sm:block" />

                {/* User Menu */}
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-green-primary)] to-[var(--color-green-dark)] border border-white/10 flex items-center justify-center shadow-inner">
                        <User size={16} className="text-white" />
                    </div>
                    <div className="hidden md:flex flex-col items-end leading-none translate-y-0.5">
                        <span className="text-sm font-medium text-white tracking-wide">Demo User</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Donor</span>
                    </div>
                    <ChevronDown size={14} className="text-[var(--color-text-muted)] hidden sm:block" />
                </div>
            </div>
        </header>
    );
}
