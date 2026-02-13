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
} from "lucide-react";
import DashboardLayout from "@/components/ui/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import FreshnessBar from "@/components/ui/FreshnessBar";
import PageTransition from "@/components/ui/PageTransition";
import { donorStats, nearbyNGOs, donationHistory } from "@/lib/mock-data";

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
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard icon={<Gift size={18} className="text-[var(--color-green-bright)]" />} label="Total Donations" value={donorStats.totalDonations} change={donorStats.totalDonationsChange} delay={0} />
                    <StatCard icon={<CheckCircle2 size={18} className="text-[var(--color-green-bright)]" />} label="Meals Rescued" value={donorStats.mealsRescued.toLocaleString()} change={donorStats.mealsRescuedChange} delay={0.05} />
                    <StatCard icon={<Clock size={18} className="text-[var(--color-green-bright)]" />} label="Avg Freshness Score" value={`${donorStats.avgFreshness}%`} delay={0.1} />
                    <StatCard icon={<Building2 size={18} className="text-[var(--color-green-bright)]" />} label="NGOs Served" value={donorStats.ngosServed} change={donorStats.ngosServedChange} delay={0.15} />
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

                                {/* STEP 1: POST SURPLUS */}
                                {currentStep === 1 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Gift size={20} className="text-white" /></div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Create Surplus Listing</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]">Post your surplus food details</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Event Type</label>
                                                <select className="select-field">
                                                    <option>Select event type</option>
                                                    <option>Wedding</option>
                                                    <option>Political Rally</option>
                                                    <option>Party</option>
                                                    <option>Corporate Event</option>
                                                    <option>Restaurant Surplus</option>
                                                    <option>Household</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Approx. Meals Available</label>
                                                <input type="number" className="input-field" placeholder="e.g. 150" defaultValue={150} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Cooked At</label>
                                                <div className="flex items-center gap-2">
                                                    <input type="time" className="input-field" defaultValue="18:30" />
                                                    <Clock size={16} className="text-[var(--color-text-muted)] shrink-0" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Safe Until (Expiry Window)</label>
                                                <div className="flex items-center gap-2">
                                                    <input type="time" className="input-field" defaultValue="23:30" />
                                                    <Clock size={16} className="text-[var(--color-text-muted)] shrink-0" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Pickup Time Window</label>
                                                <input type="text" className="input-field" placeholder="e.g. 7 PM – 9 PM" defaultValue="7:00 PM – 9:00 PM" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Location</label>
                                                <div className="relative">
                                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                                    <input type="text" className="input-field pl-10" placeholder="Auto-detect or enter" defaultValue="Grand Hyatt, Mumbai" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Veg Toggle */}
                                        <div className="flex items-center gap-3 mb-5">
                                            <button onClick={() => setIsVeg(!isVeg)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isVeg ? "bg-[var(--color-green-accent)]" : "bg-[rgba(255,255,255,0.2)]"}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${isVeg ? "translate-x-6" : "translate-x-0.5"}`} />
                                            </button>
                                            <span className="text-sm flex items-center gap-1.5">
                                                <span className={`w-2.5 h-2.5 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`} />
                                                {isVeg ? "Vegetarian" : "Non-Vegetarian"}
                                            </span>
                                        </div>

                                        {/* Upload */}
                                        <div className="mb-4">
                                            <label className="text-sm text-[var(--color-text-secondary)] mb-1.5 block">Upload Food Images</label>
                                            <div onClick={handleImageUpload} className="border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-green-accent)] transition-colors">
                                                <Camera size={28} className="text-[var(--color-text-muted)] mb-2" />
                                                <span className="text-sm text-[var(--color-text-muted)]">Click to upload food photo</span>
                                            </div>
                                        </div>

                                        {/* AI Freshness Scan */}
                                        <AnimatePresence>
                                            {showScan && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-5 overflow-hidden">
                                                    <div className="glass-card p-4 relative overflow-hidden">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Sparkles size={16} className="text-[var(--color-green-bright)]" />
                                                            <span className="text-sm font-medium text-white">AI Freshness Scan</span>
                                                        </div>
                                                        {!scanComplete && (
                                                            <div className="relative h-3 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-2">
                                                                <motion.div className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[var(--color-green-bright)] to-transparent" style={{ width: "30%" }} animate={{ x: ["-100%", "400%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                                                            </div>
                                                        )}
                                                        {scanComplete && (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-sm text-[var(--color-text-secondary)]">Freshness: 98%</span>
                                                                    <span className="badge badge-fresh">Risk: Low</span>
                                                                </div>
                                                                <FreshnessBar value={98} />
                                                                <p className="text-xs text-[var(--color-text-secondary)] mt-2">Estimated shelf life: ~5 hours remaining</p>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Safety Checklist */}
                                        <div className="glass-card p-4 mb-5">
                                            <p className="text-sm font-medium text-white mb-3">Safety Checklist</p>
                                            {["Food has been stored at proper temperature", "Food is free from contamination", "Packaging is clean and hygienic", "Allergen information is accurate"].map((item, i) => (
                                                <label key={i} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-[var(--color-green-accent)]" />
                                                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <button onClick={handleSubmitDonation} className="btn-primary w-full py-3 text-base font-semibold flex items-center justify-center gap-2">
                                            🚀 Post Surplus Food
                                        </button>
                                        {donationSubmitted && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm text-[var(--color-green-bright)] mt-3">✅ Donation submitted! Status: Available</motion.p>}
                                    </GlassCard>
                                )}

                                {/* STEP 2: WAIT FOR CLAIM */}
                                {currentStep === 2 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.2)] flex items-center justify-center"><Eye size={20} className="text-[var(--color-warning-amber)]" /></div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Waiting for Claim</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]">Your listing is live — NGOs can see it</p>
                                            </div>
                                        </div>

                                        <div className="glass-card p-4 mb-5 border-l-4 border-l-[var(--color-warning-amber)]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-base font-semibold text-white">Veg Biryani — 150 meals</span>
                                                <span className="badge badge-pending">⏳ Available</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                                                <span className="flex items-center gap-1"><MapPin size={12} /> Grand Hyatt, Mumbai</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> Pickup: 7 PM – 9 PM</span>
                                            </div>
                                        </div>

                                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><Bell size={14} className="text-[var(--color-green-bright)]" /> Nearby NGOs</h3>
                                        <div className="space-y-3 mb-5">
                                            {nearbyNGOs.map((ngo, i) => (
                                                <motion.div key={ngo.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                                    className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)] flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-white">{ngo.name}</p>
                                                        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mt-0.5">
                                                            <span className="flex items-center gap-1"><MapPin size={11} /> {ngo.distance}</span>
                                                            <span>Capacity: {ngo.capacity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-2 h-2 rounded-full bg-[var(--color-green-bright)] animate-pulse" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {!claimed && (
                                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                                className="glass-card p-4 border border-[var(--color-green-accent)] mb-5">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 rounded-full bg-[var(--color-green-primary)] flex items-center justify-center animate-pulse"><Bell size={16} className="text-[var(--color-green-bright)]" /></div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">🎉 Claim Notification!</p>
                                                        <p className="text-xs text-[var(--color-text-muted)]">Akshaya Patra Foundation wants to claim your food</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 mb-2 text-xs text-[var(--color-text-secondary)]">
                                                    <span>📞 +91 98765 00001</span>
                                                    <span>📧 contact@akshayapatra.org</span>
                                                </div>
                                                <button onClick={handleClaimAccepted} className="btn-accept w-full py-2 mt-2 flex items-center justify-center gap-2">✅ Accept Claim <ArrowRight size={14} /></button>
                                            </motion.div>
                                        )}

                                        {claimed && (
                                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-4 glass-card border border-[var(--color-green-accent)]">
                                                <CheckCircle2 size={32} className="text-[var(--color-green-bright)] mx-auto mb-2" />
                                                <p className="text-sm font-medium text-white">Claim Accepted!</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">Status → Claimed • NGO contact details shared</p>
                                            </motion.div>
                                        )}

                                        <div className="flex gap-3 mt-5">
                                            <button onClick={prevStep} className="btn-reject flex-1 py-3 flex items-center justify-center gap-2"><ArrowLeft size={16} /> Back</button>
                                        </div>
                                    </GlassCard>
                                )}

                                {/* STEP 3: HANDOVER */}
                                {currentStep === 3 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-[rgba(59,130,246,0.2)] flex items-center justify-center"><Package size={20} className="text-blue-400" /></div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Handover</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]">Volunteer or NGO will arrive for pickup</p>
                                            </div>
                                        </div>

                                        <div className="glass-card p-4 mb-5">
                                            <h3 className="text-sm font-semibold text-white mb-3">Pickup Details</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Food</span><span className="text-white">Veg Biryani — 150 meals</span></div>
                                                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">NGO</span><span className="text-white">Akshaya Patra Foundation</span></div>
                                                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Volunteer</span><span className="text-white">Rahul Sharma</span></div>
                                                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">ETA</span><span className="text-[var(--color-green-bright)]">~15 minutes</span></div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-sm font-semibold text-white mb-3">Status Timeline</h3>
                                            <div className="space-y-3 pl-4 border-l-2 border-[var(--color-green-accent)]">
                                                {[
                                                    { label: "Donation Posted", time: "6:30 PM", done: true },
                                                    { label: "Claimed by Akshaya Patra", time: "6:45 PM", done: true },
                                                    { label: "Volunteer Assigned — Rahul", time: "6:50 PM", done: true },
                                                    { label: "Volunteer En Route", time: "6:55 PM", done: true },
                                                    { label: "Waiting for Pickup", time: "Now", done: false },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 relative">
                                                        <div className={`absolute -left-[21px] w-3 h-3 rounded-full ${item.done ? "bg-[var(--color-green-bright)]" : "bg-[var(--color-text-muted)] animate-pulse"}`} />
                                                        <div className="flex-1"><span className={`text-sm ${item.done ? "text-white" : "text-[var(--color-warning-amber)]"}`}>{item.label}</span></div>
                                                        <span className="text-xs text-[var(--color-text-muted)]">{item.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {!pickedUp ? (
                                            <button onClick={handlePickUp} className="btn-primary w-full py-3 text-base font-semibold flex items-center justify-center gap-2"><CheckCircle2 size={18} /> Mark as Picked Up</button>
                                        ) : (
                                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-4 glass-card border border-[var(--color-green-accent)]">
                                                <CheckCircle2 size={32} className="text-[var(--color-green-bright)] mx-auto mb-2" />
                                                <p className="text-sm font-medium text-white">Picked Up Successfully!</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">Status → Delivered</p>
                                            </motion.div>
                                        )}
                                        <div className="flex gap-3 mt-4"><button onClick={prevStep} className="btn-reject flex-1 py-2.5 flex items-center justify-center gap-2"><ArrowLeft size={16} /> Back</button></div>
                                    </GlassCard>
                                )}

                                {/* STEP 4: IMPACT SCREEN */}
                                {currentStep === 4 && (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                                        <GlassCard className="p-10 text-center glow-green">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="w-24 h-24 rounded-full gradient-bg glow-green flex items-center justify-center mx-auto mb-6">
                                                <Leaf size={44} className="text-white" />
                                            </motion.div>
                                            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                                className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cal)" }}>
                                                🎉 You donated 150 meals!
                                            </motion.h2>
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[var(--color-text-secondary)] text-lg mb-8">
                                                Your generosity is making a real difference!
                                            </motion.p>
                                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="grid grid-cols-3 gap-4 mb-8">
                                                <div className="glass-card p-5"><p className="text-3xl font-bold gradient-text mb-1">150</p><p className="text-xs text-[var(--color-text-muted)]">Meals Rescued</p></div>
                                                <div className="glass-card p-5"><p className="text-3xl font-bold gradient-text mb-1">659</p><p className="text-xs text-[var(--color-text-muted)]">lbs CO₂ Saved</p></div>
                                                <div className="glass-card p-5"><p className="text-3xl font-bold gradient-text mb-1">~50</p><p className="text-xs text-[var(--color-text-muted)]">Families Helped</p></div>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex gap-3 justify-center">
                                                <button className="btn-primary py-3 px-6 flex items-center gap-2 text-base"><Linkedin size={18} /> Share to LinkedIn</button>
                                                <button onClick={() => goToStep(1)} className="btn-reject py-3 px-6 flex items-center gap-2 text-base">Donate Again</button>
                                            </motion.div>
                                        </GlassCard>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-6">
                        <GlassCard className="p-5" delay={0.25}>
                            <h3 className="text-base font-semibold text-white mb-4">Nearby NGOs</h3>
                            <div className="space-y-3">
                                {nearbyNGOs.map((ngo) => (
                                    <div key={ngo.name} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)] hover:border-[rgba(255,255,255,0.12)] transition-colors">
                                        <p className="text-sm font-medium text-white mb-1">{ngo.name}</p>
                                        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {ngo.distance}</span>
                                            <span>Capacity: {ngo.capacity}</span>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-1">Needs: {ngo.needs}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                        <GlassCard className="p-5" delay={0.3}>
                            <h3 className="text-base font-semibold text-white mb-4">Recent Donations</h3>
                            <div className="space-y-3">
                                {donationHistory.slice(0, 3).map((d) => (
                                    <div key={d.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(255,255,255,0.02)]">
                                        <div><p className="text-sm text-white">{d.foodItem}</p><p className="text-xs text-[var(--color-text-muted)]">{d.date}</p></div>
                                        <span className={`badge ${d.status === "Delivered" ? "badge-fresh" : "badge-urgent"}`}>{d.status}</span>
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
