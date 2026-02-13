"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
    icon: ReactNode;
    value: string | number;
    label: string;
    change?: string;
    iconBg?: string;
    delay?: number;
}

export default function StatCard({ icon, value, label, change, iconBg = "rgba(255, 255, 255, 0.03)", delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:border-white/10"
        >
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 transition-colors group-hover:border-white/10"
                    style={{ background: iconBg }}
                >
                    {icon}
                </div>
                {change && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${change.includes("+") ? "bg-[var(--color-green-primary)]/20 border-[var(--color-green-primary)]/30 text-[var(--color-green-bright)]" : "bg-white/5 border-white/10 text-[var(--color-text-muted)]"}`}>
                        {change}
                    </span>
                )}
            </div>

            <div>
                <p className="text-4xl font-light text-white tracking-tight mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{value}</p>
                <p className="text-sm text-[var(--color-text-secondary)] tracking-wide uppercase opacity-80" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{label}</p>
            </div>

            {/* Hover Glow */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 transition-opacity duration-500 group-hover:animate-shine" />
        </motion.div>
    );
}
