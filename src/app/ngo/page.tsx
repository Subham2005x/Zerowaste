"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Users,
    Package,
    Recycle,
    MapPin,
    Clock,
    Filter,
    ChevronDown,
    Truck,
    Globe,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Eye,
    HandHeart,
    Star,
    Handshake,
} from "lucide-react";
import DashboardLayout from "@/components/ui/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import FreshnessBar from "@/components/ui/FreshnessBar";
import PageTransition from "@/components/ui/PageTransition";
import { ngoStats, availableDonations, incomingPickups, getUrgencyClass, getUrgencyLabel } from "@/lib/mock-data";

const steps = [
    { id: 1, label: "View Surplus", icon: Eye },
    { id: 2, label: "Claim Food", icon: HandHeart },
    { id: 3, label: "Assign Volunteer", icon: Truck },
    { id: 4, label: "Confirm Delivery", icon: Handshake },
];

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

export default function NgoDashboard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);
    const [claimedItems, setClaimedItems] = useState<string[]>([]);
    const [assignedVolunteer, setAssignedVolunteer] = useState(false);
    const [delivered, setDelivered] = useState(false);

    const capacityUsed = 320;
    const capacityTotal = 500;

    const goToStep = (step: number) => { setDirection(step > currentStep ? 1 : -1); setCurrentStep(step); };
    const nextStep = () => { if (currentStep < 4) goToStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) goToStep(currentStep - 1); };

    const handleClaim = (id: string) => { setClaimedItems((prev) => [...prev, id]); };

    const filteredDonations = availableDonations.filter((d) => {
        if (filter === "veg") return d.isVeg;
        if (filter === "nonveg") return !d.isVeg;
        if (filter === "urgent") return d.urgency === "urgent";
        return true;
    });

    return (
        <DashboardLayout title="NGO Dashboard">
            <PageTransition>
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard icon={<Heart size={18} className="text-[var(--color-green-bright)]" />} label="Meals Received" value={ngoStats.mealsReceived.toLocaleString()} change={ngoStats.mealsReceivedChange} delay={0} />
                    <StatCard icon={<Users size={18} className="text-[var(--color-green-bright)]" />} label="People Served" value={ngoStats.peopleServed.toLocaleString()} change={ngoStats.peopleServedChange} delay={0.05} />
                    <StatCard icon={<Package size={18} className="text-[var(--color-green-bright)]" />} label="Active Donations" value={ngoStats.activeDonations} delay={0.1} />
                    <StatCard icon={<Recycle size={18} className="text-[var(--color-green-bright)]" />} label="Waste Reduced" value={ngoStats.wasteReduced} change={ngoStats.wasteReducedChange} delay={0.15} />
                </div>

                {/* Step Indicator */}
                <GlassCard className="p-4 mb-6" delay={0.2}>
                    <div className="flex items-center justify-between">
                        {steps.map((step, i) => (
                            <div key={step.id} className="flex items-center flex-1">
                                <button onClick={() => goToStep(step.id)} className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${currentStep === step.id ? "bg-[var(--color-green-primary)] text-white shadow-lg shadow-[rgba(27,67,50,0.3)]"
                                        : currentStep > step.id ? "text-[var(--color-green-bright)] bg-[rgba(27,67,50,0.15)]"
                                            : "text-[var(--color-text-muted)]"
                                    }`}>
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${currentStep > step.id ? "bg-[var(--color-green-bright)] text-black" : currentStep === step.id ? "bg-white/20 text-white" : "bg-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)]"
                                        }`}>{currentStep > step.id ? <CheckCircle2 size={14} /> : step.id}</div>
                                    <span className="text-xs font-medium hidden lg:inline">{step.label}</span>
                                </button>
                                {i < steps.length - 1 && <div className={`flex-1 h-[2px] mx-2 rounded-full transition-colors duration-500 ${currentStep > step.id ? "bg-[var(--color-green-bright)]" : "bg-[rgba(255,255,255,0.08)]"}`} />}
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Step Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div key={currentStep} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>

                                {/* STEP 1: VIEW SURPLUS */}
                                {currentStep === 1 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[rgba(16,185,129,0.2)] flex items-center justify-center"><Eye size={20} className="text-[var(--color-green-bright)]" /></div>
                                                <div><h2 className="text-xl font-bold text-white">Available Surplus Food</h2><p className="text-sm text-[var(--color-text-muted)]">Browse nearby donations</p></div>
                                            </div>
                                            <div className="relative">
                                                <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--color-border-glass)] text-sm text-[var(--color-text-secondary)] hover:border-[rgba(255,255,255,0.15)] transition-colors">
                                                    <Filter size={14} /> Filter <ChevronDown size={14} />
                                                </button>
                                                <AnimatePresence>
                                                    {showFilter && (
                                                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute right-0 top-full mt-2 glass-card p-2 min-w-[150px] z-10">
                                                            {["all", "veg", "nonveg", "urgent"].map((f) => (
                                                                <button key={f} onClick={() => { setFilter(f); setShowFilter(false); }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filter === f ? "text-white bg-[var(--color-green-primary)]" : "text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)]"}`}>
                                                                    {f === "all" ? "All" : f === "veg" ? "🟢 Veg" : f === "nonveg" ? "🔴 Non-Veg" : "🔥 Urgent"}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="h-[180px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)] flex flex-col items-center justify-center text-[var(--color-text-muted)] mb-5">
                                            <Globe size={32} className="mb-2 opacity-40" />
                                            <span className="text-sm">Map View — Pulsing Waste Hotspots</span>
                                            <div className="flex gap-3 mt-2">{[1, 2, 3].map((i) => <div key={i} className="w-3 h-3 rounded-full bg-[var(--color-green-bright)] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />)}</div>
                                        </div>

                                        <div className="space-y-3">
                                            {filteredDonations.map((donation, i) => (
                                                <motion.div key={donation.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                                    className={`p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--color-border-glass)] hover:border-[rgba(255,255,255,0.12)] transition-all ${donation.urgency === "urgent" ? "urgent-pulse" : ""}`}>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div><h3 className="text-base font-semibold text-white">{donation.foodType}</h3><p className="text-sm text-[var(--color-text-muted)]">{donation.source}</p></div>
                                                        <span className={`badge ${getUrgencyClass(donation.urgency)}`}>{getUrgencyLabel(donation.urgency)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-2">
                                                        <span className="flex items-center gap-1"><MapPin size={12} /> {donation.distance}</span>
                                                        <span className="flex items-center gap-1"><Clock size={12} /> {donation.timeAgo}</span>
                                                        <span className={`w-2.5 h-2.5 rounded-full ${donation.isVeg ? "bg-green-500" : "bg-red-500"}`} />
                                                        <span>{donation.isVeg ? "Veg" : "Non-Veg"}</span>
                                                    </div>
                                                    <FreshnessBar value={donation.freshness} size="sm" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <button onClick={nextStep} className="btn-primary w-full py-3 mt-5 flex items-center justify-center gap-2">Claim Food <ArrowRight size={16} /></button>
                                    </GlassCard>
                                )}

                                {/* STEP 2: CLAIM FOOD */}
                                {currentStep === 2 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><HandHeart size={20} className="text-white" /></div>
                                            <div><h2 className="text-xl font-bold text-white">Claim Food</h2><p className="text-sm text-[var(--color-text-muted)]">System validates capacity & distance before claiming</p></div>
                                        </div>

                                        <div className="glass-card p-4 mb-5">
                                            <p className="text-sm font-medium text-white mb-3">System Checks</p>
                                            {[
                                                { label: "NGO capacity available", detail: "180/500 remaining", pass: true },
                                                { label: "Distance within range", detail: "1.8 km < 10 km radius", pass: true },
                                                { label: "Pickup time valid", detail: "Within 2-hour window", pass: true },
                                            ].map((check, i) => (
                                                <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--color-border-glass)] last:border-b-0">
                                                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--color-green-bright)]" /><span className="text-sm text-white">{check.label}</span></div>
                                                    <span className="text-xs text-[var(--color-text-muted)]">{check.detail}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            {availableDonations.slice(0, 3).map((donation) => {
                                                const isClaimed = claimedItems.includes(donation.id);
                                                return (
                                                    <div key={donation.id} className={`p-4 rounded-xl border transition-all ${isClaimed ? "bg-[rgba(16,185,129,0.1)] border-[var(--color-green-accent)]" : "bg-[rgba(255,255,255,0.02)] border-[var(--color-border-glass)]"}`}>
                                                        <div className="flex items-start justify-between">
                                                            <div><h3 className="text-sm font-semibold text-white">{donation.foodType}</h3><p className="text-xs text-[var(--color-text-muted)]">{donation.source} • {donation.distance}</p></div>
                                                            {isClaimed ? <span className="badge badge-fresh">✅ Claimed</span> : <button onClick={() => handleClaim(donation.id)} className="btn-accept">Claim Food</button>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {claimedItems.length > 0 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[var(--color-green-bright)] mt-4 text-center">Status: Available → Claimed • {claimedItems.length} item(s) claimed</motion.p>}
                                        <div className="flex gap-3 mt-5">
                                            <button onClick={prevStep} className="btn-reject flex-1 py-3 flex items-center justify-center gap-2"><ArrowLeft size={16} /> Back</button>
                                            <button onClick={nextStep} className="btn-primary flex-[2] py-3 flex items-center justify-center gap-2">Assign Volunteer <ArrowRight size={16} /></button>
                                        </div>
                                    </GlassCard>
                                )}

                                {/* STEP 3: ASSIGN VOLUNTEER */}
                                {currentStep === 3 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-[rgba(167,139,250,0.2)] flex items-center justify-center"><Truck size={20} className="text-purple-400" /></div>
                                            <div><h2 className="text-xl font-bold text-white">Assign Volunteer</h2><p className="text-sm text-[var(--color-text-muted)]">Optional — assign a pickup person</p></div>
                                        </div>

                                        <div className="space-y-3 mb-5">
                                            {[
                                                { name: "Rahul Sharma", vehicle: "Bike", distance: "1.2 km", rating: 4.9, available: true },
                                                { name: "Amit Kumar", vehicle: "Car", distance: "2.5 km", rating: 4.7, available: true },
                                                { name: "Sneha Patel", vehicle: "Scooter", distance: "3.1 km", rating: 4.8, available: false },
                                            ].map((vol, i) => (
                                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                                    className={`p-4 rounded-xl border transition-all ${assignedVolunteer && vol.name === "Rahul Sharma" ? "bg-[rgba(16,185,129,0.1)] border-[var(--color-green-accent)]" : "bg-[rgba(255,255,255,0.02)] border-[var(--color-border-glass)]"}`}>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2"><p className="text-sm font-medium text-white">{vol.name}</p><span className="text-xs text-[var(--color-warning-amber)] flex items-center gap-0.5"><Star size={11} /> {vol.rating}</span></div>
                                                            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mt-1">
                                                                <span>🛵 {vol.vehicle}</span><span className="flex items-center gap-1"><MapPin size={11} /> {vol.distance}</span>
                                                                <span className={vol.available ? "text-[var(--color-green-bright)]" : "text-[var(--color-text-muted)]"}>{vol.available ? "🟢 Available" : "⚫ Busy"}</span>
                                                            </div>
                                                        </div>
                                                        {assignedVolunteer && vol.name === "Rahul Sharma" ? <span className="badge badge-fresh">Assigned</span> : vol.available ? <button onClick={() => setAssignedVolunteer(true)} className="btn-accept text-xs py-1.5 px-3">Assign</button> : null}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {assignedVolunteer && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                                <div className="glass-card p-4 mb-5">
                                                    <p className="text-sm font-medium text-white mb-2">📍 Route via Google Maps</p>
                                                    <div className="h-[140px] rounded-xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[var(--color-text-muted)]">
                                                        <div className="text-center"><MapPin size={24} className="mx-auto mb-1 opacity-40" /><p className="text-xs">Grand Hyatt → Akshaya Patra Center</p><p className="text-xs">1.8 km • ~12 min drive</p></div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        <div className="flex gap-3">
                                            <button onClick={prevStep} className="btn-reject flex-1 py-3 flex items-center justify-center gap-2"><ArrowLeft size={16} /> Back</button>
                                            <button onClick={nextStep} className="btn-primary flex-[2] py-3 flex items-center justify-center gap-2">Confirm Delivery <ArrowRight size={16} /></button>
                                        </div>
                                    </GlassCard>
                                )}

                                {/* STEP 4: CONFIRM DELIVERY */}
                                {currentStep === 4 && (
                                    <GlassCard className="p-8 text-center">
                                        <div className="flex items-center gap-3 mb-6 justify-center">
                                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Handshake size={20} className="text-white" /></div>
                                            <h2 className="text-xl font-bold text-white">Confirm Delivery</h2>
                                        </div>
                                        {!delivered ? (
                                            <>
                                                <div className="glass-card p-4 mb-5 text-left">
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Food</span><span className="text-white">Biryani — 120 plates</span></div>
                                                        <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Donor</span><span className="text-white">Grand Hyatt Catering</span></div>
                                                        <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Volunteer</span><span className="text-white">Rahul Sharma</span></div>
                                                        <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Status</span><span className="text-[var(--color-green-bright)]">Picked Up — En Route</span></div>
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">Rate this pickup</p>
                                                    <div className="flex items-center justify-center gap-2">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={24} className="text-[var(--color-warning-amber)] cursor-pointer hover:scale-110 transition-transform" fill={s <= 4 ? "currentColor" : "none"} />)}</div>
                                                </div>
                                                <button onClick={() => setDelivered(true)} className="btn-primary w-full py-3 text-base font-semibold flex items-center justify-center gap-2"><Handshake size={18} /> Mark as Delivered 🤝</button>
                                            </>
                                        ) : (
                                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
                                                <div className="w-20 h-20 rounded-full gradient-bg glow-green flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={40} className="text-white" /></div>
                                                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cal)" }}>🤝 Delivery Confirmed!</h3>
                                                <p className="text-[var(--color-text-secondary)] mb-6">120 meals successfully delivered to communities in need.</p>
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="glass-card p-4"><p className="text-2xl font-bold gradient-text">120</p><p className="text-xs text-[var(--color-text-muted)]">Meals Delivered</p></div>
                                                    <div className="glass-card p-4"><p className="text-2xl font-bold gradient-text">439 lbs</p><p className="text-xs text-[var(--color-text-muted)]">CO₂ Prevented</p></div>
                                                </div>
                                                <button onClick={() => { goToStep(1); setDelivered(false); }} className="btn-reject w-full py-3">View More Surplus Food</button>
                                            </motion.div>
                                        )}
                                    </GlassCard>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <GlassCard className="p-5" delay={0.25}>
                            <h3 className="text-base font-semibold text-white mb-4">Daily Capacity</h3>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-[var(--color-text-secondary)]">Received Today</span>
                                <span className="text-white font-medium">{capacityUsed} / {capacityTotal} meals</span>
                            </div>
                            <div className="progress-bar mb-2">
                                <motion.div className="progress-bar-fill" style={{ background: "linear-gradient(90deg, #1B4332, #52B788)" }}
                                    initial={{ width: 0 }} animate={{ width: `${(capacityUsed / capacityTotal) * 100}%` }} transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }} />
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)]">{Math.round((capacityUsed / capacityTotal) * 100)}% utilized — {capacityTotal - capacityUsed} remaining</p>
                        </GlassCard>
                        <GlassCard className="p-5" delay={0.3}>
                            <h3 className="text-base font-semibold text-white mb-4">Incoming Pickups</h3>
                            <div className="space-y-3">
                                {incomingPickups.map((pickup) => (
                                    <div key={pickup.id} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)]">
                                        <div className="flex items-start justify-between mb-1">
                                            <div><p className="text-sm font-medium text-white">{pickup.foodItem}</p><p className="text-xs text-[var(--color-text-muted)]">By: {pickup.volunteer}</p></div>
                                            <span className="text-xs text-[var(--color-text-muted)]">ETA: {pickup.eta}</span>
                                        </div>
                                        <span className={`badge ${pickup.status === "Picked Up" ? "badge-picked-up" : "badge-accepted"}`}>{pickup.status}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
