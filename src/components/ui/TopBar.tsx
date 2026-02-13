"use client";

import { Bell, ChevronDown, Menu, User } from "lucide-react";

interface TopBarProps {
    title: string;
    onMenuClick?: () => void;
}

export default function TopBar({ title }: TopBarProps) {
    return (
        <header className="h-16 border-b border-[var(--color-border-glass)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Left */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden text-[var(--color-text-secondary)] hover:text-white transition-colors">
                    <Menu size={20} />
                </button>
                <h1 className="text-lg font-semibold text-white">{title}</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <button className="relative text-[var(--color-text-secondary)] hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-urgent-red)] rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                        3
                    </span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-green-primary)] flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)]">Demo User</span>
                    <ChevronDown size={14} className="text-[var(--color-text-muted)]" />
                </div>
            </div>
        </header>
    );
}
