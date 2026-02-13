"use client";

import { ReactNode } from "react";
import TopBar from "./TopBar";

interface DashboardLayoutProps {
    title: string;
    children: ReactNode;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
            <TopBar title={title} />
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}
