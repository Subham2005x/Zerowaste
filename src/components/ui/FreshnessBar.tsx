"use client";

import { motion } from "framer-motion";

interface FreshnessBarProps {
    value: number;
    showLabel?: boolean;
    size?: "sm" | "md";
}

export default function FreshnessBar({ value, showLabel = true, size = "md" }: FreshnessBarProps) {
    const getColor = () => {
        if (value >= 80) return "linear-gradient(90deg, #10B981, #34D399)";
        if (value >= 50) return "linear-gradient(90deg, #F59E0B, #FCD34D)";
        return "linear-gradient(90deg, #EF4444, #F87171)";
    };

    return (
        <div className="flex items-center gap-3">
            <div className={`progress-bar flex-1 ${size === "sm" ? "h-[6px]" : ""}`}>
                <motion.div
                    className="progress-bar-fill"
                    style={{ background: getColor() }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
            </div>
            {showLabel && (
                <span className={`font-semibold ${size === "sm" ? "text-sm" : ""}`} style={{ color: value >= 80 ? "#34D399" : value >= 50 ? "#FCD34D" : "#F87171" }}>
                    {value}%
                </span>
            )}
        </div>
    );
}
