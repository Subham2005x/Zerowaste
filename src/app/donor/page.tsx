"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Gift,
    CheckCircle2,
    Clock,
    Building2,
    MapPin,
    Leaf,
    Sparkles,
    ArrowRight,
    ArrowLeft,
    Camera,
    Bell,
    Eye,
    Package,
    PartyPopper,
    Linkedin,
    Trash2,
} from "lucide-react";
import DashboardLayout from "@/components/ui/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import FreshnessBar from "@/components/ui/FreshnessBar";
import PageTransition from "@/components/ui/PageTransition";
import { donorStats, nearbyNGOs, donationHistory } from "@/lib/mock-data";

// Custom font styles
const serifFont = { fontFamily: '"Cormorant Garamond", serif' };
const sansFont = { fontFamily: '"Space Grotesk", sans-serif' };

const steps = [
    { id: 1, label: "Post Surplus", icon: Gift },
    { id: 2, label: "Wait for Claim", icon: Eye },
    { id: 3, label: "Handover", icon: Package },
    { id: 4, label: "Impact", icon: PartyPopper },
];

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

export default function DonorDashboard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [showScan, setShowScan] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);
    const [isVeg, setIsVeg] = useState(true);
    const [donationSubmitted, setDonationSubmitted] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [pickedUp, setPickedUp] = useState(false);

    const goToStep = (step: number) => {
        setDirection(step > currentStep ? 1 : -1);
        setCurrentStep(step);
    };

    const nextStep = () => { if (currentStep < 4) goToStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) goToStep(currentStep - 1); };

    const handleImageUpload = () => {
        setShowScan(true);
        setScanComplete(false);
        setTimeout(() => setScanComplete(true), 2500);
    };

    const handleSubmitDonation = () => {
        setDonationSubmitted(true);
        setTimeout(() => nextStep(), 800);
    };

    const handleClaimAccepted = () => {
        setClaimed(true);
        setTimeout(() => nextStep(), 600);
    };

    const handlePickUp = () => {
        setPickedUp(true);
        setTimeout(() => nextStep(), 600);
    };

    return (
        <DashboardLayout title="Donor Dashboard">
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
                            Orchestrating <br /> <span className="italic text-[var(--color-text-paragraph)]">abundance.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-[var(--color-text-secondary)] max-w-md"
                            style={sansFont}
                        >
                            Bridge the gap between surplus and sustenance. Your contributions are reshaping food security.
                        </motion.p>
                    </div>

                    {/* Primary Stats (Right 5 cols) */}
                    <div className="lg:col-span-5 flex justify-end gap-6">
                        <StatCard
                            icon={<Gift size={24} className="text-white" />}
                            label="Total Donations"
                            value={donorStats.totalDonations}
                            change={donorStats.totalDonationsChange}
                            iconBg="var(--color-green-primary)"
                            delay={0.1}
                        />
                        <StatCard
                            icon={<Building2 size={24} className="text-white" />}
                            label="NGOs Served"
                            value={donorStats.ngosServed}
                            change={donorStats.ngosServedChange}
                            iconBg="#0077b5" // LinkedIn Blue for professional connection feel, or use theme var
                            delay={0.2}
                        />
                    </div>
                </div>

                {/* MAIN CONTENT (BROKEN GRID ROW 2) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: STEP INDICATOR (2 cols) - Vertical on Desktop */}
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

                    {/* CENTER: ACTIVE STEP FORM (7 cols) */}
                    <div className="lg:col-span-7 min-h-[500px]">
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

                                    {/* STEP 1: POST SURPLUS */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Detail the surplus.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Provide accurate information to ensure safe distribution.</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                                                    <Gift size={20} className="text-[var(--color-green-bright)]" />
                                                </div>
                                            </div>

                                            {/* Primary Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={sansFont}>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Food Item Name</label>
                                                    <input type="text" className="bg-transparent border-b border-white/10 w-full py-2 text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-green-bright)] transition-colors" placeholder="e.g. Veg Biryani, Assorted Pastries" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Food Category</label>
                                                    <select className="bg-transparent border-b border-white/10 w-full py-2 text-white focus:outline-none focus:border-[var(--color-green-bright)] transition-colors [&>option]:bg-black">
                                                        <option>Cooked Meal</option>
                                                        <option>Raw Ingredients</option>
                                                        <option>Packaged Food</option>
                                                        <option>Bakery Items</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Secondary Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={sansFont}>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Quantity</label>
                                                    <div className="flex gap-4">
                                                        <input type="number" className="bg-transparent border-b border-white/10 w-full py-2 text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-green-bright)] transition-colors" placeholder="100" />
                                                        <select className="bg-transparent border-b border-white/10 w-1/3 py-2 text-white focus:outline-none focus:border-[var(--color-green-bright)] transition-colors [&>option]:bg-black">
                                                            <option>Plates</option>
                                                            <option>Kg</option>
                                                            <option>Liters</option>
                                                            <option>Servings</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Dietary Type</label>
                                                    <div className="flex gap-4 pt-2">
                                                        <label className="flex items-center gap-2 cursor-pointer group">
                                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isVeg ? "border-[var(--color-green-bright)]" : "border-white/30"}`}>
                                                                {isVeg && <div className="w-2 h-2 rounded-full bg-[var(--color-green-bright)]" />}
                                                            </div>
                                                            <input type="radio" name="diet" className="hidden" checked={isVeg} onChange={() => setIsVeg(true)} />
                                                            <span className={`text-sm ${isVeg ? "text-white" : "text-[var(--color-text-muted)] group-hover:text-white"}`}>Veg</span>
                                                        </label>
                                                        <label className="flex items-center gap-2 cursor-pointer group">
                                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${!isVeg ? "border-[var(--color-urgent-red)]" : "border-white/30"}`}>
                                                                {!isVeg && <div className="w-2 h-2 rounded-full bg-[var(--color-urgent-red)]" />}
                                                            </div>
                                                            <input type="radio" name="diet" className="hidden" checked={!isVeg} onChange={() => setIsVeg(false)} />
                                                            <span className={`text-sm ${!isVeg ? "text-white" : "text-[var(--color-text-muted)] group-hover:text-white"}`}>Non-Veg</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Timing & Conditions */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={sansFont}>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Pickup Window</label>
                                                    <input type="text" className="bg-transparent border-b border-white/10 w-full py-2 text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-green-bright)] transition-colors" placeholder="e.g. 2:00 PM - 5:00 PM" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Storage Condition</label>
                                                    <select className="bg-transparent border-b border-white/10 w-full py-2 text-white focus:outline-none focus:border-[var(--color-green-bright)] transition-colors [&>option]:bg-black">
                                                        <option>Room Temperature</option>
                                                        <option>Refrigerated</option>
                                                        <option>Frozen</option>
                                                        <option>Hot Hold</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Minimalist Image Upload */}
                                            <div onClick={handleImageUpload} className="group relative h-32 rounded-xl border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col items-center justify-center cursor-pointer overflow-hidden mt-4">
                                                <Camera size={20} className="text-[var(--color-text-muted)] mb-2 group-hover:text-white transition-colors" />
                                                <span className="text-xs text-[var(--color-text-muted)] group-hover:text-white transition-colors" style={sansFont}>Upload or Scan Food</span>

                                                {/* Scan Animation */}
                                                <AnimatePresence>
                                                    {showScan && !scanComplete && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                                                            <div className="w-full h-1 bg-[var(--color-green-bright)] absolute top-0 animate-[scan_2s_ease-in-out_infinite]" />
                                                            <span className="text-xs text-[var(--color-green-bright)] animate-pulse font-mono">ANALYZING FRESHNESS...</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                {scanComplete && (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-6 text-center">
                                                        <Sparkles size={20} className="text-[var(--color-green-bright)] mb-2" />
                                                        <p className="text-white text-sm font-light mb-1" style={serifFont}>Verified</p>
                                                        <FreshnessBar value={98} size="sm" />
                                                    </motion.div>
                                                )}
                                            </div>

                                            <button onClick={handleSubmitDonation} className="w-full py-4 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm tracking-widest uppercase transition-all hover:scale-[1.01]" style={sansFont}>
                                                Publish Listing
                                            </button>
                                        </div>
                                    )}

                                    {/* STEP 2: WAIT FOR CLAIM */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Awaiting claimant.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Your donation is visible to verified NGOs.</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
                                                    <Eye size={20} className="text-[var(--color-warning-amber)]" />
                                                </div>
                                            </div>

                                            {/* Status Card */}
                                            <div className="p-6 rounded-xl bg-white/[0.03] border border-[var(--color-warning-amber)]/30 backdrop-blur-md relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-warning-amber)]" />
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-lg text-white font-light" style={serifFont}>Veg Biryani - 150 meals</span>
                                                    <span className="px-3 py-1 rounded-full border border-[var(--color-warning-amber)]/50 text-[var(--color-warning-amber)] text-[10px] uppercase tracking-widest bg-[var(--color-warning-amber)]/10">Active</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-xs text-[var(--color-text-secondary)]" style={sansFont}>
                                                    <span className="flex items-center gap-2"><Clock size={12} /> Expires in 4h</span>
                                                    <span className="flex items-center gap-2"><MapPin size={12} /> Grand Hyatt</span>
                                                </div>
                                            </div>

                                            {!claimed ? (
                                                <button onClick={handleClaimAccepted} className="w-full py-4 rounded-xl border border-dashed border-[var(--color-green-primary)] text-[var(--color-green-bright)] hover:bg-[var(--color-green-primary)]/10 transition-all flex items-center justify-center gap-2" style={sansFont}>
                                                    <Bell size={16} className="animate-bounce" /> Simulate Claim Request
                                                </button>
                                            ) : (
                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-xl bg-[var(--color-green-primary)]/20 border border-[var(--color-green-bright)] text-center">
                                                    <CheckCircle2 size={32} className="text-[var(--color-green-bright)] mx-auto mb-3" />
                                                    <p className="text-white text-lg font-light" style={serifFont}>Claim Accepted</p>
                                                    <p className="text-[var(--color-text-secondary)] text-xs mt-1" style={sansFont}>Akshaya Patra Foundation is on the way.</p>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                    {/* STEP 3: HANDOVER */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8">
                                            <div>
                                                <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Transfer responsibility.</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Ensure secure handover to the volunteer.</p>
                                            </div>

                                            <div className="relative pl-6 space-y-8 border-l border-white/10" style={sansFont}>
                                                {[
                                                    { title: "Donation Verified", time: "18:30", active: true },
                                                    { title: "Claimed by NGO", time: "18:45", active: true },
                                                    { title: "Volunteer Arrived", time: "Now", active: true, pulse: true },
                                                    { title: "Handover Complete", time: "Pending", active: false }
                                                ].map((item, i) => (
                                                    <div key={i} className="relative">
                                                        <div className={`absolute -left-[29px] w-3 h-3 rounded-full border-2 border-[var(--color-bg-primary)] ${item.active ? "bg-[var(--color-green-bright)]" : "bg-[var(--color-text-muted)]"} ${item.pulse ? "animate-pulse" : ""}`} />
                                                        <p className={`text-sm ${item.active ? "text-white" : "text-[var(--color-text-muted)]"}`}>{item.title}</p>
                                                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{item.time}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {!pickedUp ? (
                                                <button onClick={handlePickUp} className="w-full py-4 rounded-xl bg-white text-black hover:bg-white/90 font-medium transition-all" style={sansFont}>
                                                    Confirm Handover
                                                </button>
                                            ) : (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                                                    <p className="text-2xl text-[var(--color-green-bright)] font-light italic" style={serifFont}>"Generosity is the most natural outward expression of an inner attitude of compassion."</p>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                    {/* STEP 4: IMPACT */}
                                    {currentStep === 4 && (
                                        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                                className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--color-green-primary)] to-[var(--color-green-bright)] flex items-center justify-center shadow-[0_0_30px_rgba(82,183,136,0.3)]"
                                            >
                                                <Leaf size={40} className="text-white" />
                                            </motion.div>

                                            <div>
                                                <h1 className="text-5xl md:text-6xl text-white font-light mb-4" style={serifFont}>Impact realized.</h1>
                                                <p className="text-lg text-[var(--color-text-secondary)]" style={sansFont}>150 meals have been diverted from waste to plates.</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                                                {[
                                                    { value: "150", label: "Meals" },
                                                    { value: "65kg", label: "CO₂ Saved" },
                                                    { value: "50+", label: "People Fed" }
                                                ].map((stat, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                                        <p className="text-2xl text-white font-light" style={sansFont}>{stat.value}</p>
                                                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">{stat.label}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-4">
                                                <button onClick={() => goToStep(1)} className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest" style={sansFont}>
                                                    Donate Again
                                                </button>
                                                <button className="px-8 py-3 rounded-full bg-[#0077b5] text-white hover:bg-[#0077b5]/90 transition-all text-sm uppercase tracking-widest flex items-center gap-2" style={sansFont}>
                                                    <Linkedin size={16} /> Share
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: CONTEXT (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Nearby NGOs - RESTORED FEATURE */}
                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.3}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg text-white font-light" style={serifFont}>Nearby NGOs</h3>
                                <button className="text-xs text-[var(--color-green-bright)] hover:underline" style={sansFont}>View Map</button>
                            </div>
                            <div className="space-y-4">
                                {nearbyNGOs.map((ngo, i) => (
                                    <div key={i} className="pb-3 border-b border-white/5 last:border-0 last:pb-0 group cursor-pointer">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm text-white group-hover:text-[var(--color-green-bright)] transition-colors" style={sansFont}>{ngo.name}</p>
                                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-[var(--color-text-secondary)]">{ngo.distance}</span>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-1" style={sansFont}>Needs: {ngo.needs}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className={`h-full ${ngo.capacity === "High" ? "bg-[var(--color-green-bright)] w-3/4" : ngo.capacity === "Medium" ? "bg-[var(--color-warning-amber)] w-1/2" : "bg-[var(--color-urgent-red)] w-1/4"}`} />
                                            </div>
                                            <span className="text-[10px] text-[var(--color-text-muted)]">{ngo.capacity} Cap</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Recent Activity - EXPANDED */}
                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.4}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg text-white font-light" style={serifFont}>Recent Activity</h3>
                                <button className="text-xs text-[var(--color-green-bright)] hover:underline" style={sansFont}>History</button>
                            </div>
                            <div className="space-y-4">
                                {donationHistory.map((d, i) => (
                                    <div key={i} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                        <div>
                                            <p className="text-sm text-white" style={sansFont}>{d.foodItem}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]" style={sansFont}>To: {d.ngo} • {d.date}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`w-2 h-2 rounded-full mb-1 ${d.status === "Delivered" ? "bg-[var(--color-green-bright)]" : d.status === "Expired" ? "bg-[var(--color-urgent-red)]" : "bg-[var(--color-warning-amber)]"}`} />
                                            <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">{d.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 bg-gradient-to-br from-[var(--color-editorial-green)] to-[var(--color-bg-primary)] border-none" delay={0.5}>
                            <h3 className="text-lg text-white font-light mb-2" style={serifFont}>Did you know?</h3>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic" style={serifFont}>
                                "If food waste were a country, it would be the third largest emitter of greenhouse gases."
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
