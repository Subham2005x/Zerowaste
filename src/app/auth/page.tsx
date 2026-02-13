"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Leaf,
    Mail,
    Lock,
    User,
    Phone,
    Eye,
    EyeOff,
    ArrowRight,
    Building2,
    Heart,
    Truck,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

type AuthMode = "login" | "signup";
type Role = "donor" | "ngo" | "volunteer";

const roles: { id: Role; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
    {
        id: "donor",
        label: "Donor",
        icon: <Heart size={24} />,
        desc: "Share surplus food from events, restaurants, or households",
        color: "rgba(82, 183, 136, 0.2)",
    },
    {
        id: "ngo",
        label: "NGO",
        icon: <Building2 size={24} />,
        desc: "Receive and distribute food to communities in need",
        color: "rgba(59, 130, 246, 0.2)",
    },
    {
        id: "volunteer",
        label: "Volunteer",
        icon: <Truck size={24} />,
        desc: "Pick up and deliver food between donors and NGOs",
        color: "rgba(167, 139, 250, 0.2)",
    },
];

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>("login");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "signup" && !selectedRole) return;

        setLoading(true);

        // Simulate auth delay then redirect
        const targetRole = mode === "signup" ? selectedRole : selectedRole || "donor";
        setTimeout(() => {
            router.push(`/${targetRole}`);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(27,67,50,0.15)] blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[rgba(45,106,79,0.1)] blur-[100px]" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(82,183,136,0.03)] blur-[80px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-2xl gradient-bg glow-green flex items-center justify-center mx-auto mb-4"
                    >
                        <Leaf size={32} className="text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-cal)" }}>
                        ZeroWaste
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        Bridging surplus to sustenance
                    </p>
                </div>

                {/* Auth Card */}
                <GlassCard className="p-8">
                    {/* Tab Toggle */}
                    <div className="flex rounded-xl bg-[rgba(255,255,255,0.04)] p-1 mb-6">
                        {(["login", "signup"] as AuthMode[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setMode(tab)}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${mode === tab
                                    ? "bg-[var(--color-green-primary)] text-white shadow-lg"
                                    : "text-[var(--color-text-muted)] hover:text-white"
                                    }`}
                            >
                                {tab === "login" ? "Log In" : "Sign Up"}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, x: mode === "signup" ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: mode === "signup" ? -20 : 20 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* SIGNUP FIELDS */}
                                {mode === "signup" && (
                                    <>
                                        {/* Role Selection */}
                                        <div className="mb-5">
                                            <label className="text-sm text-[var(--color-text-secondary)] mb-3 block font-medium">
                                                I want to join as
                                            </label>
                                            <div className="space-y-2">
                                                {roles.map((role) => (
                                                    <button
                                                        type="button"
                                                        key={role.id}
                                                        onClick={() => setSelectedRole(role.id)}
                                                        className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all duration-300 ${selectedRole === role.id
                                                            ? "border-[var(--color-green-accent)] bg-[rgba(27,67,50,0.2)]"
                                                            : "border-[var(--color-border-glass)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selectedRole === role.id
                                                                ? "text-[var(--color-green-bright)]"
                                                                : "text-[var(--color-text-muted)]"
                                                                }`}
                                                            style={{ background: selectedRole === role.id ? role.color : "rgba(255,255,255,0.05)" }}
                                                        >
                                                            {role.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-sm font-semibold ${selectedRole === role.id ? "text-white" : "text-[var(--color-text-secondary)]"}`}>
                                                                {role.label}
                                                            </p>
                                                            <p className="text-xs text-[var(--color-text-muted)] truncate">{role.desc}</p>
                                                        </div>
                                                        {selectedRole === role.id && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="w-5 h-5 rounded-full bg-[var(--color-green-bright)] flex items-center justify-center shrink-0"
                                                            >
                                                                <ShieldCheck size={12} className="text-black" />
                                                            </motion.div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Full Name</label>
                                            <div className="relative">
                                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                                <input
                                                    type="text"
                                                    className="input-field pl-10"
                                                    placeholder="Your full name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Phone</label>
                                            <div className="relative">
                                                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                                <input
                                                    type="tel"
                                                    className="input-field pl-10"
                                                    placeholder="+91 98765 43210"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* LOGIN: Role selection (compact) */}
                                {mode === "login" && (
                                    <div className="mb-5">
                                        <label className="text-sm text-[var(--color-text-secondary)] mb-2 block font-medium">
                                            Login as
                                        </label>
                                        <div className="flex gap-2">
                                            {roles.map((role) => (
                                                <button
                                                    type="button"
                                                    key={role.id}
                                                    onClick={() => setSelectedRole(role.id)}
                                                    className={`flex-1 py-2.5 px-2 rounded-xl border text-center transition-all duration-300 ${selectedRole === role.id
                                                        ? "border-[var(--color-green-accent)] bg-[rgba(27,67,50,0.2)] text-white"
                                                        : "border-[var(--color-border-glass)] text-[var(--color-text-muted)] hover:border-[rgba(255,255,255,0.12)]"
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <span className={selectedRole === role.id ? "text-[var(--color-green-bright)]" : ""}>{role.icon}</span>
                                                        <span className="text-xs font-medium">{role.label}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* SHARED FIELDS: Email & Password */}
                                <div className="mb-4">
                                    <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                        <input
                                            type="email"
                                            className="input-field pl-10"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="input-field pl-10 pr-10"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {mode === "login" && (
                                        <p className="text-xs text-[var(--color-text-muted)] mt-1.5 text-right cursor-pointer hover:text-[var(--color-green-bright)] transition-colors">
                                            Forgot password?
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading || (mode === "signup" && !selectedRole) || (mode === "login" && !selectedRole)}
                                    className="btn-primary w-full py-3 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Sparkles size={18} />
                                        </motion.div>
                                    ) : (
                                        <>
                                            {mode === "login" ? "Log In" : "Create Account"}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-[var(--color-border-glass)]" />
                        <span className="text-xs text-[var(--color-text-muted)]">or</span>
                        <div className="flex-1 h-px bg-[var(--color-border-glass)]" />
                    </div>

                    {/* Toggle Auth Mode */}
                    <p className="text-center text-sm text-[var(--color-text-secondary)]">
                        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            className="text-[var(--color-green-bright)] font-medium hover:underline"
                        >
                            {mode === "login" ? "Sign Up" : "Log In"}
                        </button>
                    </p>
                </GlassCard>

                {/* Back to Home */}
                <p className="text-center mt-4">
                    <Link href="/" className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
