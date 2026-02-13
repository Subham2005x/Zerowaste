"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useInView,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import {
    HandHeart,
    Building2,
    Truck,
    ArrowRight,
    Leaf,
    ArrowUpRight,
} from "lucide-react";
import { impactStats, formatNumber } from "@/lib/mock-data";


/* ───────────────────────────────────────────────
   MAGNETIC WRAPPER (inline, no separate import)
   ─────────────────────────────────────────────── */
function Magnetic({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    return (
        <motion.div
            ref={ref}
            data-magnetic
            style={{ x: sx, y: sy }}
            onMouseMove={(e) => {
                const rect = ref.current!.getBoundingClientRect();
                x.set((e.clientX - (rect.left + rect.width / 2)) * 0.4);
                y.set((e.clientY - (rect.top + rect.height / 2)) * 0.4);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ───────────────────────────────────────────────
   LIQUID FILL STAT
   ─────────────────────────────────────────────── */
function LiquidStat({
    label,
    value,
    unit,
    fillPercent,
    color,
    delay = 0,
}: {
    label: string;
    value: string;
    unit: string;
    fillPercent: number;
    color: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);
    const numericVal = parseInt(value.replace(/[^0-9]/g, ""));

    useEffect(() => {
        if (!inView) return;
        const duration = 2000;
        const step = numericVal / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= numericVal) {
                setCount(numericVal);
                clearInterval(timer);
            } else {
                setCount(Math.round(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, numericVal]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay }}
            className="liquid-container p-8 flex flex-col items-center justify-end"
            style={{ height: "280px" }}
        >
            {/* Liquid fill */}
            <div
                className="liquid-fill liquid-wave"
                style={{
                    height: inView ? `${fillPercent}%` : "0%",
                    background: `linear-gradient(180deg, ${color}33 0%, ${color}18 100%)`,
                    borderTop: `2px solid ${color}66`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
                <p
                    className="text-5xl md:text-6xl font-light mb-1"
                    style={{ fontFamily: "var(--font-serif)", color }}
                >
                    {inView ? (numericVal > 1000 ? formatNumber(count) : count) : "0"}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">{unit}</p>
                <p
                    className="subheading-brutalist"
                    style={{ color, opacity: 0.8 }}
                >
                    {label}
                </p>
            </div>
        </motion.div>
    );
}

/* ───────────────────────────────────────────────
   ROLE DATA
   ─────────────────────────────────────────────── */
const roles = [
    {
        id: "donor",
        icon: HandHeart,
        title: "Donor",
        tagline: "Share the surplus",
        description: "Post excess food from events, kitchens, or households. Track every meal from plate to person.",
        bgColor: "#0A2618",
        accentColor: "#52B788",
    },
    {
        id: "ngo",
        icon: Building2,
        title: "NGO",
        tagline: "Claim with purpose",
        description: "Discover nearby donations, validate capacity, coordinate volunteers, confirm deliveries.",
        bgColor: "#0F1A2E",
        accentColor: "#60A5FA",
    },
    {
        id: "volunteer",
        icon: Truck,
        title: "Volunteer",
        tagline: "Carry the change",
        description: "Accept pickup alerts, follow optimized routes, verify handoffs with QR codes.",
        bgColor: "#1A0F2E",
        accentColor: "#A78BFA",
    },
];

/* ───────────────────────────────────────────────
   IMPACT TICKER ITEMS
   ─────────────────────────────────────────────── */
const tickerItems = [
    "128,450 meals rescued",
    "192.7 tons CO₂ prevented",
    "3,200 active volunteers",
    "12 cities covered",
    "85 partner NGOs",
    "1,240 donors",
    "Zero tolerance for waste",
];

/* ==============================================
   🏛️  LANDING PAGE
   ============================================== */
export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const [hoveredRole, setHoveredRole] = useState<string | null>(null);

    /* Scroll-driven values */
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroMaskRadius = useTransform(scrollYProgress, [0, 0.8], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroTextY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

    /* Speed-variable marquee */
    const { scrollYProgress: globalScroll } = useScroll();
    const marqueeSpeed = useTransform(globalScroll, [0, 1], [30, 8]);
    const [tickerDuration, setTickerDuration] = useState(30);
    useEffect(() => {
        const unsub = marqueeSpeed.on("change", (v) =>
            setTickerDuration(Math.max(8, Math.round(v)))
        );
        return unsub;
    }, [marqueeSpeed]);

    /* Pillar background transition */
    const roleBg = hoveredRole
        ? roles.find((r) => r.id === hoveredRole)?.bgColor || "#0A0A0A"
        : "#0A0A0A";

    return (
        <div ref={containerRef} className="relative bg-[var(--color-bg-primary)]">

            {/* ===== NAV ===== */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl rounded-3xl border border-white/10 flex items-center justify-between px-6 py-2"
                style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(16px)" }}
            >
                <Link href="/" className="flex items-center gap-3 no-underline">
                    <div className="w-8 h-8 rounded-lg border border-[rgba(82,183,136,0.3)] flex items-center justify-center">
                        <Leaf size={16} className="text-[var(--color-green-bright)]" />
                    </div>
                    <span
                        className="text-base tracking-widest uppercase font-medium text-white"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        ZeroWaste
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        href="#portals"
                        className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] hover:text-white transition-colors no-underline hidden md:inline"
                    >
                        Roles
                    </Link>
                    <Link
                        href="#impact"
                        className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] hover:text-white transition-colors no-underline hidden md:inline"
                    >
                        Impact
                    </Link>
                    <Magnetic>
                        <Link href="/auth">
                            <button className="btn-editorial" data-interactive>
                                Enter Platform
                            </button>
                        </Link>
                    </Magnetic>
                </div>
            </motion.nav>

            {/* ═══════════════════════════════════════════
          🏛️  HERO — "The Broken Grid"
          ═══════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-[110vh] flex items-center overflow-hidden"
            >
                {/* Scroll-revealed background */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        clipPath: useTransform(
                            heroMaskRadius,
                            (r) => `circle(${r}% at 50% 50%)`
                        ),
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A2618] via-[#0E1F15] to-[#0A0A0A]" />
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="w-full h-full"
                            style={{
                                background:
                                    "radial-gradient(ellipse at 30% 40%, rgba(82,183,136,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(45,106,79,0.1) 0%, transparent 50%)",
                            }}
                        />
                    </div>
                </motion.div>


                {/* Hero content — asymmetric grid */}
                <motion.div
                    style={{ opacity: heroOpacity, y: heroTextY, scale: heroScale }}
                    className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12 pt-32 pb-20"
                >
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="editorial-line" />
                        <span className="subheading-brutalist text-[var(--color-green-bright)]">
                            Food Rescue Platform
                        </span>
                    </motion.div>

                    {/* Broken grid: 2/3 left, 1/3 right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
                        {/* Left — massive serif heading */}
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="heading-editorial text-[clamp(3.5rem,8vw,9rem)] text-white"
                            >
                                Bridging
                                <br />
                                <span className="italic text-[var(--color-green-bright)]" style={{ fontWeight: 300 }}>
                                    Surplus
                                </span>{" "}
                                to
                                <br />
                                Sustenance
                            </motion.h1>
                        </div>

                        {/* Right — brutalist subtext + CTA */}
                        <div className="lg:col-span-4 lg:pb-4">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            >
                                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-8 max-w-[320px]">
                                    An intelligent logistics bridge connecting those with excess to
                                    those in need. Every meal rescued is a step toward zero waste.
                                </p>

                                <Magnetic className="inline-block">
                                    <Link href="/auth">
                                        <button className="btn-editorial flex items-center gap-3" data-interactive>
                                            Start Rescuing
                                            <ArrowRight size={16} />
                                        </button>
                                    </Link>
                                </Magnetic>

                                <div className="mt-10 flex items-center gap-6">
                                    <div>
                                        <p className="text-2xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                                            {formatNumber(impactStats.totalMealsRescued)}
                                        </p>
                                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-muted)]">
                                            meals rescued
                                        </p>
                                    </div>
                                    <div className="w-px h-8 bg-[rgba(255,255,255,0.1)]" />
                                    <div>
                                        <p className="text-2xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                                            {impactStats.citiesCovered}
                                        </p>
                                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-muted)]">
                                            cities
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>


                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
          🎞️  IMPACT TICKER — Speed-variable marquee
          ═══════════════════════════════════════════ */}
            <section className="relative py-5 border-y border-[rgba(255,255,255,0.04)] overflow-hidden">
                <div
                    className="flex gap-16"
                    style={{
                        width: "max-content",
                        animation: `tickerScroll ${tickerDuration}s linear infinite`,
                    }}
                >
                    {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                        <span
                            key={i}
                            className="shrink-0 text-xs tracking-[0.2em] uppercase"
                            style={{
                                fontFamily: "var(--font-sans)",
                                color: "var(--color-text-muted)",
                            }}
                        >
                            {item}
                            <span className="mx-8 text-[var(--color-green-accent)]">◆</span>
                        </span>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          🎭  ROLE SELECTION — "Interactive Portals"
          ═══════════════════════════════════════════ */}
            <section
                id="portals"
                className="relative py-32 px-8 md:px-12 transition-colors duration-700 ease-out"
                style={{ backgroundColor: roleBg }}
            >
                {/* Section header */}
                <div className="max-w-[1400px] mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="editorial-line" />
                            <span className="subheading-brutalist text-[var(--color-text-muted)]">
                                Choose your path
                            </span>
                        </div>
                        <h2
                            className="heading-editorial text-5xl md:text-7xl text-white max-w-3xl"
                        >
                            Three roles,{" "}
                            <span className="italic text-[var(--color-green-bright)]">
                                one mission
                            </span>
                        </h2>
                    </motion.div>
                </div>

                {/* Glass Pillars */}
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
                    {roles.map((role, i) => (
                        <PillarCard
                            key={role.id}
                            role={role}
                            index={i}
                            onHover={(id) => setHoveredRole(id)}
                            onLeave={() => setHoveredRole(null)}
                            isHovered={hoveredRole === role.id}
                        />
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          📊  IMPACT — "Data Storytelling" Liquid Fill
          ═══════════════════════════════════════════ */}
            <section id="impact" className="py-32 px-8 md:px-12 bg-[var(--color-bg-primary)]">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="editorial-line" />
                            <span className="subheading-brutalist text-[var(--color-text-muted)]">
                                Measurable change
                            </span>
                        </div>
                        <h2 className="heading-editorial text-5xl md:text-7xl text-white max-w-3xl">
                            The numbers{" "}
                            <span className="italic text-[var(--color-green-bright)]">
                                speak
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <LiquidStat
                            label="Meals Rescued"
                            value={impactStats.totalMealsRescued.toString()}
                            unit="and counting"
                            fillPercent={78}
                            color="#52B788"
                            delay={0}
                        />
                        <LiquidStat
                            label="CO₂ Prevented"
                            value={Math.round(impactStats.totalCO2Saved).toString()}
                            unit="tons of carbon"
                            fillPercent={62}
                            color="#40916C"
                            delay={0.1}
                        />
                        <LiquidStat
                            label="Volunteers"
                            value={impactStats.totalVolunteers.toString()}
                            unit="active members"
                            fillPercent={55}
                            color="#2D6A4F"
                            delay={0.2}
                        />
                        <LiquidStat
                            label="Partner NGOs"
                            value={impactStats.totalNGOs.toString()}
                            unit="organizations"
                            fillPercent={45}
                            color="#1B4332"
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          CTA BRIDGE
          ═══════════════════════════════════════════ */}
            <section className="py-32 px-8 md:px-12 border-t border-[rgba(255,255,255,0.04)]">
                <div className="max-w-[1400px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2
                            className="heading-editorial text-5xl md:text-8xl text-white mb-8"
                        >
                            Every plate{" "}
                            <span className="italic text-[var(--color-green-bright)]">
                                matters
                            </span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-sm max-w-md mx-auto mb-12 leading-relaxed">
                            Join the chain of change. Whether you feed, organize, or deliver —
                            your role rescues meals and reduces waste.
                        </p>
                        <Magnetic className="inline-block">
                            <Link href="/auth">
                                <button className="btn-editorial text-base px-12 py-5 flex items-center gap-3 mx-auto" data-interactive>
                                    Join the Movement
                                    <ArrowUpRight size={18} />
                                </button>
                            </Link>
                        </Magnetic>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
            <footer className="border-t border-[rgba(255,255,255,0.04)] py-10 px-8 md:px-12">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Leaf size={14} className="text-[var(--color-green-bright)] opacity-60" />
                        <span
                            className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            © 2026 ZeroWaste
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-[10px] tracking-widest uppercase text-[var(--color-text-muted)]">
                        <Link href="#" className="hover:text-white transition-colors no-underline">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors no-underline">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors no-underline">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ───────────────────────────────────────────────
   PILLAR CARD (Glass Portal)
   ─────────────────────────────────────────────── */
function PillarCard({
    role,
    index,
    onHover,
    onLeave,
    isHovered,
}: {
    role: (typeof roles)[number];
    index: number;
    onHover: (id: string) => void;
    onLeave: () => void;
    isHovered: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const iconX = useMotionValue(0);
    const iconY = useMotionValue(0);
    const springIconX = useSpring(iconX, { stiffness: 120, damping: 20 });
    const springIconY = useSpring(iconY, { stiffness: 120, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        iconX.set((e.clientX - cx) * 0.12);
        iconY.set((e.clientY - cy) * 0.12);
    };

    return (
        <motion.div
            ref={ref}
            data-interactive
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            onMouseEnter={() => onHover(role.id)}
            onMouseLeave={() => {
                onLeave();
                iconX.set(0);
                iconY.set(0);
            }}
            onMouseMove={handleMouseMove}
        >
            <Link href="/auth" className="block no-underline">
                <div
                    className="glass-pillar p-10 flex flex-col justify-between"
                    style={{
                        minHeight: "420px",
                        borderColor: isHovered
                            ? `${role.accentColor}33`
                            : "rgba(255,255,255,0.05)",
                    }}
                >
                    {/* Floating parallax icon */}
                    <motion.div
                        style={{ x: springIconX, y: springIconY }}
                        className="mb-12"
                    >
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{
                                background: `${role.accentColor}12`,
                                border: `1px solid ${role.accentColor}30`,
                                boxShadow: isHovered
                                    ? `0 0 40px ${role.accentColor}20`
                                    : "none",
                                transition: "box-shadow 0.5s ease",
                            }}
                        >
                            <role.icon size={28} style={{ color: role.accentColor }} />
                        </div>
                    </motion.div>

                    {/* Text */}
                    <div>
                        <span
                            className="subheading-brutalist block mb-2"
                            style={{ color: role.accentColor, opacity: 0.7 }}
                        >
                            {role.tagline}
                        </span>
                        <h3
                            className="heading-editorial text-4xl md:text-5xl text-white mb-4"
                        >
                            {role.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-[280px]">
                            {role.description}
                        </p>

                        {/* CTA line */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center gap-2 text-sm font-medium"
                                    style={{ color: role.accentColor }}
                                >
                                    Enter
                                    <ArrowRight
                                        size={14}
                                        className="translate-x-0 group-hover:translate-x-1 transition-transform"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
