"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Global custom cursor — two layers:
 * 1. Small dot (mix-blend-mode: difference)
 * 2. Large green glow ring that expands on interactive elements
 */
export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
    const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-magnetic]") ||
                target.closest("[data-interactive]")
            ) {
                setExpanded(true);
            }
        };

        const handleOut = () => setExpanded(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", handleOver);
        window.addEventListener("mouseout", handleOut);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", handleOver);
            window.removeEventListener("mouseout", handleOut);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className={`cursor-dot ${expanded ? "expanded" : ""}`}
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            />
            <motion.div
                className={`cursor-glow ${expanded ? "expanded" : ""}`}
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            />
        </>
    );
}
