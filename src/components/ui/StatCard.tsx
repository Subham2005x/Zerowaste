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

export default function StatCard({ icon, value, label, change, iconBg = "rgba(27, 67, 50, 0.3)", delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
            className="stat-card flex items-start justify-between"
        >
            <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">{label}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
                {change && (
                    <p className="text-xs text-[var(--color-green-bright)] mt-1">{change}</p>
                )}
            </div>
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: iconBg }}
            >
                {icon}
            </div>
        </motion.div>
    );
}
