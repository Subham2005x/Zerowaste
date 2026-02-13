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
    AlertTriangle,
} from "lucide-react";
import DashboardLayout from "@/components/ui/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import FreshnessBar from "@/components/ui/FreshnessBar";
import PageTransition from "@/components/ui/PageTransition";
import LeafletMap from "@/components/ui/Map";
import { ngoStats, availableDonations, incomingPickups, getUrgencyClass, getUrgencyLabel } from "@/lib/mock-data";

// Custom font styles
const serifFont = { fontFamily: '"Cormorant Garamond", serif' };
const sansFont = { fontFamily: '"Space Grotesk", sans-serif' };

const steps = [
    { id: 1, label: "View Surplus", icon: Eye },
    { id: 2, label: "Claim Food", icon: HandHeart },
    { id: 3, label: "Volunteer", icon: Truck }, // Shortened label
    { id: 4, label: "Delivery", icon: Handshake }, // Shortened label
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

    const goToStep = (step: number) => {
        setDirection(step > currentStep ? 1 : -1);
        setCurrentStep(step);
    };

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
                {/* HEADLINE & STATS (BROKEN GRID ROW 1) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
                    {/* Welcome & Context (Left 7 cols) */}
                    <div className="lg:col-span-7">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl text-white font-light tracking-tight leading-[0.9] mb-4"
                            style={serifFont}
                        >
                            Feeding the <br /> <span className="italic text-[var(--color-text-paragraph)]">future.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-[var(--color-text-secondary)] max-w-md"
                            style={sansFont}
                        >
                            Channel surplus resources to communities in need. Track impact in real-time.
                        </motion.p>
                    </div>

                    {/* Primary Stats Grid (Right 5 cols) - Condensed */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        <StatCard icon={<Heart size={18} className="text-white" />} label="Meals Received" value={ngoStats.mealsReceived.toLocaleString()} change={ngoStats.mealsReceivedChange} iconBg="var(--color-green-primary)" delay={0.1} />
                        <StatCard icon={<Users size={18} className="text-white" />} label="People Served" value={ngoStats.peopleServed.toLocaleString()} change={ngoStats.peopleServedChange} iconBg="var(--color-editorial-blue)" delay={0.15} />
                    </div>
                </div>

                {/* MAIN CONTENT (BROKEN GRID ROW 2) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: STEP INDICATOR (2 cols) - Vertical */}
                    <div className="lg:col-span-2 hidden lg:flex flex-col gap-6 pt-8">
                        {steps.map((step, i) => (
                            <button
                                key={step.id}
                                onClick={() => goToStep(step.id)}
                                className={`group flex items-center gap-3 text-left transition-all duration-300 ${currentStep === step.id ? "opacity-100 translate-x-2" : "opacity-30 hover:opacity-60"}`}
                            >
                                <span className="text-xs font-bold font-mono text-[var(--color-green-bright)]">0{step.id}</span>
                                <span className={`text-sm ${currentStep === step.id ? "text-white font-medium" : "text-[var(--color-text-muted)]"}`} style={sansFont}>{step.label}</span>
                                {currentStep === step.id && <div className="w-1 h-1 rounded-full bg-[var(--color-green-bright)] shadow-[0_0_8px_var(--color-green-bright)]" />}
                            </button>
                        ))}
                    </div>

                    {/* MOBILE STEP INDICATOR */}
                    <div className="lg:hidden col-span-12 mb-4 overflow-x-auto pb-2 flex gap-4">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => goToStep(step.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs whitespace-nowrap transition-colors ${currentStep === step.id
                                    ? "bg-white/10 border-white/20 text-white"
                                    : "border-transparent text-[var(--color-text-muted)]"
                                    }`}
                                style={sansFont}
                            >
                                {step.id}. {step.label}
                            </button>
                        ))}
                    </div>

                    {/* CENTER: ACTIVE STEP CONTENT (7 cols) */}
                    <div className="lg:col-span-7 min-h-[600px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <GlassCard className="p-8 h-full border border-white/5 bg-black/20" hover={false}>

                                    {/* STEP 1: VIEW SURPLUS */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Incoming streams.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Monitor and claim available surplus food.</p>
                                                </div>
                                                <div className="relative">
                                                    <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs uppercase tracking-wider text-white hover:bg-white/5 transition-colors" style={sansFont}>
                                                        <Filter size={12} /> {filter === "all" ? "All Types" : filter} <ChevronDown size={12} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {showFilter && (
                                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-full mt-2 glass-card p-1 min-w-[150px] z-20 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl">
                                                                {["all", "veg", "nonveg", "urgent"].map((f) => (
                                                                    <button key={f} onClick={() => { setFilter(f); setShowFilter(false); }} className={`block w-full text-left px-4 py-3 rounded-lg text-xs uppercase tracking-wider transition-colors ${filter === f ? "bg-white/10 text-white" : "text-[var(--color-text-secondary)] hover:bg-white/5"}`} style={sansFont}>
                                                                        {f === "all" ? "All" : f === "veg" ? "Veg Only" : f === "nonveg" ? "Non-Veg" : "Urgent Only"}
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* Interactive Map - NEW FEATURE */}
                                            <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 relative z-0">
                                                <LeafletMap
                                                    locations={filteredDonations.map(d => ({
                                                        lat: 12.9716 + (Math.random() - 0.5) * 0.05,
                                                        lng: 77.5946 + (Math.random() - 0.5) * 0.05,
                                                        title: d.foodType,
                                                        description: d.source
                                                    }))}
                                                    center={[12.9716, 77.5946]}
                                                    zoom={12}
                                                />
                                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent z-[400]" />
                                                <div className="absolute bottom-4 left-4 z-[500] flex flex-col items-start pointer-events-none">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="w-2 h-2 rounded-full bg-[var(--color-green-bright)] animate-pulse" />
                                                        <span className="text-xs uppercase tracking-widest text-white shadow-black drop-shadow-md">Live Feed</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {filteredDonations.map((donation, i) => (
                                                    <motion.div key={donation.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                                        className={`group p-5 rounded-xl border transition-all cursor-pointer ${donation.urgency === "urgent" ? "bg-[var(--color-urgent-red)]/5 border-[var(--color-urgent-red)]/20 hover:border-[var(--color-urgent-red)]/40" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="text-lg font-light text-white mb-1" style={serifFont}>{donation.foodType}</h3>
                                                                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider" style={sansFont}>{donation.source}</p>
                                                            </div>
                                                            <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest border ${getUrgencyClass(donation.urgency)}`}>{getUrgencyLabel(donation.urgency)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-6 text-xs text-[var(--color-text-secondary)] mb-3" style={sansFont}>
                                                            <span className="flex items-center gap-1.5"><MapPin size={12} /> {donation.distance}</span>
                                                            <span className="flex items-center gap-1.5"><Clock size={12} /> {donation.timeAgo}</span>
                                                            <span className="flex items-center gap-1.5"><div className={`w-1.5 h-1.5 rounded-full ${donation.isVeg ? "bg-green-500" : "bg-red-500"}`} /> {donation.isVeg ? "Veg" : "Non-Veg"}</span>
                                                        </div>
                                                        <FreshnessBar value={donation.freshness} size="sm" />
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <button onClick={nextStep} className="w-full py-4 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm tracking-widest uppercase transition-all hover:scale-[1.01]" style={sansFont}>
                                                Review Claims
                                            </button>
                                        </div>
                                    )}

                                    {/* STEP 2: CLAIM FOOD */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Validate Claim.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>System checks capacity and logistics.</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { label: "Capacity", val: "Available", status: "pass" },
                                                    { label: "Distance", val: "< 10km", status: "pass" },
                                                    { label: "Pickup Window", val: "Valid", status: "pass" },
                                                ].map((check, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
                                                        <CheckCircle2 size={20} className="text-[var(--color-green-bright)] mb-2" />
                                                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-1" style={sansFont}>{check.label}</p>
                                                        <p className="text-white text-sm" style={sansFont}>{check.val}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-3">
                                                {availableDonations.slice(0, 2).map((donation) => {
                                                    const isClaimed = claimedItems.includes(donation.id);
                                                    return (
                                                        <div key={donation.id} className={`p-4 rounded-xl border transition-all flex justify-between items-center ${isClaimed ? "bg-[rgba(16,185,129,0.1)] border-[var(--color-green-accent)]" : "bg-[rgba(255,255,255,0.02)] border-[var(--color-border-glass)]"}`}>
                                                            <div>
                                                                <h3 className="text-base font-light text-white" style={serifFont}>{donation.foodType}</h3>
                                                                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider" style={sansFont}>{donation.source}</p>
                                                            </div>
                                                            {isClaimed ? <span className="text-[var(--color-green-bright)] text-xs uppercase tracking-widest font-bold">Claimed</span> : <button onClick={() => handleClaim(donation.id)} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors" style={sansFont}>Claim</button>}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                                <button onClick={prevStep} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 text-sm uppercase tracking-widest transition-colors flex items-center gap-2" style={sansFont}>
                                                    <ArrowLeft size={14} /> Back
                                                </button>
                                                <button onClick={nextStep} className="flex-1 py-3 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2" style={sansFont}>
                                                    Next Step <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: ASSIGN VOLUNTEER */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8">
                                            <div>
                                                <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Logistics.</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Assign a volunteer for pickup.</p>
                                            </div>

                                            <div className="space-y-4">
                                                {[
                                                    { name: "Rahul Sharma", vehicle: "Bike", distance: "1.2 km", rating: 4.9, available: true },
                                                    { name: "Amit Kumar", vehicle: "Car", distance: "2.5 km", rating: 4.7, available: true },
                                                ].map((vol, i) => (
                                                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                                        className={`p-4 rounded-xl border transition-all cursor-pointer ${assignedVolunteer && vol.name === "Rahul Sharma" ? "bg-[var(--color-green-primary)]/10 border-[var(--color-green-accent)]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">{vol.name.charAt(0)}</div>
                                                                <div>
                                                                    <p className="text-base text-white font-light" style={serifFont}>{vol.name}</p>
                                                                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]" style={sansFont}>
                                                                        <span>{vol.vehicle}</span> • <span>{vol.distance}</span> • <span className="text-[var(--color-warning-amber)]">★ {vol.rating}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {assignedVolunteer && vol.name === "Rahul Sharma" ?
                                                                <span className="text-[var(--color-green-bright)] text-xs uppercase tracking-widest font-bold">Assigned</span> :
                                                                <button onClick={() => setAssignedVolunteer(true)} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs uppercase tracking-widest text-white hover:bg-white/5" style={sansFont}>Select</button>
                                                            }
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {assignedVolunteer && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                                                        <MapPin size={24} className="text-[var(--color-text-muted)]" />
                                                        <div>
                                                            <p className="text-sm text-white" style={sansFont}>Route Optimized</p>
                                                            <p className="text-xs text-[var(--color-text-muted)]" style={sansFont}>Grand Hyatt → Akshaya Patra • 1.8km</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                                <button onClick={prevStep} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 text-sm uppercase tracking-widest transition-colors flex items-center gap-2" style={sansFont}>
                                                    <ArrowLeft size={14} /> Back
                                                </button>
                                                <button onClick={nextStep} className="flex-1 py-3 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2" style={sansFont}>
                                                    Confirm Pickup <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 4: DELIVERY */}
                                    {currentStep === 4 && (
                                        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                                            {!delivered ? (
                                                <div className="w-full space-y-8">
                                                    <div>
                                                        <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Incoming Delivery.</h2>
                                                        <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Volunteer is en-route. Prepare for receipt.</p>
                                                    </div>

                                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto">
                                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                                            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest" style={sansFont}>Status</span>
                                                            <span className="text-[var(--color-green-bright)] text-xs uppercase tracking-widest animate-pulse font-bold" style={sansFont}>• On the way</span>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between"><span className="text-sm text-[var(--color-text-secondary)]" style={sansFont}>Volunteer</span><span className="text-white text-sm" style={serifFont}>Rahul Sharma</span></div>
                                                            <div className="flex justify-between"><span className="text-sm text-[var(--color-text-secondary)]" style={sansFont}>ETA</span><span className="text-white text-sm" style={serifFont}>12 mins</span></div>
                                                            <div className="flex justify-between"><span className="text-sm text-[var(--color-text-secondary)]" style={sansFont}>Load</span><span className="text-white text-sm" style={serifFont}>120 Meals (Veg)</span></div>
                                                        </div>
                                                    </div>

                                                    <button onClick={() => setDelivered(true)} className="w-full max-w-md py-4 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm tracking-widest uppercase transition-all" style={sansFont}>
                                                        Simulate Arrival & Sign-off
                                                    </button>
                                                </div>
                                            ) : (
                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--color-green-primary)] to-[var(--color-green-bright)] flex items-center justify-center shadow-[0_0_30px_rgba(82,183,136,0.3)] mx-auto mb-6">
                                                        <CheckCircle2 size={40} className="text-white" />
                                                    </div>
                                                    <h2 className="text-4xl text-white font-light tracking-wide mb-2" style={serifFont}>Receipt Confirmed.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)] mb-8" style={sansFont}>Capacity updated. Impact recorded on blockchain.</p>

                                                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                                                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                            <p className="text-2xl text-white font-light" style={serifFont}>120</p>
                                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest" style={sansFont}>Meals Added</p>
                                                        </div>
                                                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                            <p className="text-2xl text-white font-light" style={serifFont}>439 lbs</p>
                                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest" style={sansFont}>CO₂ Avoided</p>
                                                        </div>
                                                    </div>

                                                    <button onClick={() => { setDelivered(false); goToStep(1); }} className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest" style={sansFont}>
                                                        Return to Dashboard
                                                    </button>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: CONTEXT (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.3}>
                            <h3 className="text-lg text-white font-light mb-4" style={serifFont}>Facility Capacity</h3>
                            <div className="mb-2 flex justify-between items-end">
                                <span className="text-4xl font-light text-white" style={serifFont}>{Math.round((capacityUsed / capacityTotal) * 100)}%</span>
                                <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5" style={sansFont}>{capacityUsed}/{capacityTotal} meals</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-[var(--color-green-bright)]" initial={{ width: 0 }} animate={{ width: `${(capacityUsed / capacityTotal) * 100}%` }} transition={{ duration: 1.5, ease: "easeOut" }} />
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.4}>
                            <h3 className="text-lg text-white font-light mb-4" style={serifFont}>Incoming Pickups</h3>
                            <div className="space-y-4">
                                {incomingPickups.map((pickup, i) => (
                                    <div key={pickup.id} className="pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-white" style={sansFont}>{pickup.foodItem}</span>
                                            <span className="text-xs text-[var(--color-green-bright)] uppercase tracking-widest font-bold">{pickup.status}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                                            <span>{pickup.volunteer}</span>
                                            <span>ETA: {pickup.eta}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Recent History - RESTORED FEATURE */}
                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.5}>
                            <h3 className="text-lg text-white font-light mb-4" style={serifFont}>Claim History</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm text-white" style={sansFont}>Rice & Dal (50 plates)</p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5" style={sansFont}>From: Taj Events • Yesterday</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-[var(--color-green-primary)]/10 border border-[var(--color-green-accent)] text-[10px] text-[var(--color-green-bright)] uppercase tracking-wide">Received</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm text-white" style={sansFont}>Fruit Box (20kg)</p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5" style={sansFont}>From: FreshMart • 2 days ago</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-[var(--color-green-primary)]/10 border border-[var(--color-green-accent)] text-[10px] text-[var(--color-green-bright)] uppercase tracking-wide">Received</span>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
