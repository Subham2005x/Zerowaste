"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Truck,
    CheckCircle2,
    MapPin,
    Clock,
    ArrowRight,
    ArrowLeft,
    Phone,
    Navigation,
    Camera,
    Star,
    Package,
    AlertTriangle,
    QrCode,
} from "lucide-react";
import DashboardLayout from "@/components/ui/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import PageTransition from "@/components/ui/PageTransition";
import LeafletMap from "@/components/ui/Map";
import { volunteerStats, volunteerTasks, getPriorityClass } from "@/lib/mock-data";

// Custom font styles
const serifFont = { fontFamily: '"Cormorant Garamond", serif' };
const sansFont = { fontFamily: '"Space Grotesk", sans-serif' };

const steps = [
    { id: 1, label: "Pickup Alerts", icon: Bell },
    { id: 2, label: "Accept Pickup", icon: Truck },
    { id: 3, label: "Drop-Off", icon: CheckCircle2 },
];

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

export default function VolunteerDashboard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [acceptedTask, setAcceptedTask] = useState<string | null>(null);
    const [qrScanned, setQrScanned] = useState(false);
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [deliveryComplete, setDeliveryComplete] = useState(false);
    const [checklist, setChecklist] = useState([false, false, false, false]);

    const goToStep = (step: number) => { setDirection(step > currentStep ? 1 : -1); setCurrentStep(step); };
    const nextStep = () => { if (currentStep < 3) goToStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) goToStep(currentStep - 1); };

    const toggleChecklist = (idx: number) => {
        const updated = [...checklist];
        updated[idx] = !updated[idx];
        setChecklist(updated);
    };
    const checklistProgress = Math.round((checklist.filter(Boolean).length / checklist.length) * 100);

    const handleAcceptTask = (taskId: string) => {
        setAcceptedTask(taskId);
        setTimeout(() => nextStep(), 600);
    };

    const handleConfirmDelivery = () => {
        setDeliveryComplete(true);
    };

    return (
        <DashboardLayout title="Volunteer Dashboard">
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
                            Compassion in <br /> <span className="italic text-[var(--color-text-paragraph)]">motion.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-[var(--color-text-secondary)] max-w-md"
                            style={sansFont}
                        >
                            Your movement sustains communities. Every mile is a measure of impact.
                        </motion.p>
                    </div>

                    {/* Stats Grid - Condensed (Right 5 cols) */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        <StatCard icon={<Package size={18} className="text-white" />} label="Completed" value={volunteerStats.completedDeliveries} change={volunteerStats.completedDeliveriesChange} iconBg="var(--color-green-primary)" delay={0.1} />
                        <StatCard icon={<Navigation size={18} className="text-white" />} label="Distance (km)" value={volunteerStats.totalDistance} change={volunteerStats.totalDistanceChange} iconBg="var(--color-editorial-amethyst)" delay={0.15} />
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

                                    {/* STEP 1: PICKUP ALERTS */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Dispatch alerts.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Nearby donations requiring immediate transport.</p>
                                                </div>
                                            </div>

                                            {/* Proximity Alert */}
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 rounded-xl bg-[var(--color-warning-amber)]/10 border border-[var(--color-warning-amber)]/20 flex items-center gap-4"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-[var(--color-warning-amber)]/20 flex items-center justify-center animate-pulse shrink-0">
                                                    <AlertTriangle size={20} className="text-[var(--color-warning-amber)]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white" style={sansFont}>Urgent Pickup Nearby</p>
                                                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5" style={sansFont}>Grand Hyatt (1.8 km) • Expires in 3h</p>
                                                </div>
                                                <button className="ml-auto px-4 py-2 bg-[var(--color-warning-amber)]/10 hover:bg-[var(--color-warning-amber)]/20 text-[var(--color-warning-amber)] text-xs uppercase tracking-widest rounded-lg transition-colors border border-[var(--color-warning-amber)]/20" style={sansFont}>
                                                    Route
                                                </button>
                                            </motion.div>

                                            <div className="space-y-4">
                                                {volunteerTasks.map((task, i) => (
                                                    <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                                        className={`group relative p-5 rounded-xl border transition-all cursor-pointer overflow-hidden ${acceptedTask === task.id ? "bg-[var(--color-green-primary)]/10 border-[var(--color-green-accent)]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>

                                                        <div className="flex items-start justify-between mb-3 relative z-10">
                                                            <div>
                                                                <h3 className="text-lg font-light text-white mb-1" style={serifFont}>{task.foodItem}</h3>
                                                                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider" style={sansFont}>{task.from} → {task.to}</p>
                                                            </div>
                                                            <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest border ${getPriorityClass(task.priority)}`}>{task.priority} Priority</span>
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-2 text-xs text-[var(--color-text-secondary)] mb-4 relative z-10" style={sansFont}>
                                                            <div className="flex items-center gap-1.5"><MapPin size={12} /> {task.distance}</div>
                                                            <div className="flex items-center gap-1.5"><Clock size={12} /> ETA: {task.eta}</div>
                                                            <div className="flex items-center gap-1.5"><Package size={12} /> {task.quantity}</div>
                                                        </div>

                                                        {acceptedTask === task.id ? (
                                                            <span className="text-[var(--color-green-bright)] text-xs uppercase tracking-widest font-bold relative z-10">Accepted</span>
                                                        ) : (
                                                            <div className="flex gap-3 relative z-10">
                                                                <button onClick={() => handleAcceptTask(task.id)} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2" style={sansFont}>
                                                                    Accept <ArrowRight size={12} />
                                                                </button>
                                                            </div>
                                                        )}

                                                        {/* Hover Glow */}
                                                        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white/[0.05] opacity-0 transition-opacity duration-500 group-hover:animate-shine pointer-events-none" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 2: ACCEPT PICKUP */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>En-route.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Navigate to pickup location.</p>
                                                </div>
                                            </div>

                                            {/* Interactive Map - NEW FEATURE */}
                                            <div className="h-[240px] rounded-2xl overflow-hidden border border-white/10 relative z-0">
                                                <LeafletMap
                                                    locations={[{ lat: 12.978, lng: 77.590, title: "Pickup: Grand Hyatt", description: "Kitchen Entrance" }]}
                                                    center={[12.978, 77.590]}
                                                    zoom={15}
                                                />
                                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent z-[400]" />

                                                <div className="absolute bottom-4 left-4 z-[500] flex flex-col items-start pointer-events-none">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Navigation size={16} className="text-[var(--color-green-bright)] animate-pulse" />
                                                        <span className="text-sm font-medium text-white shadow-black drop-shadow-md">200m to Destination</span>
                                                    </div>
                                                    <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] shadow-black drop-shadow-md">Turn right onto MG Road</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <h3 className="text-sm text-white font-medium mb-3" style={sansFont}>Logistics</h3>
                                                    <ul className="space-y-2.5 text-xs text-[var(--color-text-secondary)]" style={sansFont}>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" /> Main Entrance, ask for Manager</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" /> 6 Large Containers (Fragile)</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" /> Take photo of seal</li>
                                                    </ul>
                                                </div>

                                                <div className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <div>
                                                        <p className="text-sm text-white" style={sansFont}>Grand Hyatt Catering</p>
                                                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5" style={sansFont}>Kitchen Manager</p>
                                                    </div>
                                                    <button className="p-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">
                                                        <Phone size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                                <button onClick={prevStep} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 text-sm uppercase tracking-widest transition-colors flex items-center gap-2" style={sansFont}>
                                                    <ArrowLeft size={14} /> Back
                                                </button>
                                                <button onClick={nextStep} className="flex-1 py-3 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2" style={sansFont}>
                                                    Arrived at Donor <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: DROP-OFF */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8">
                                            <div>
                                                <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={serifFont}>Verification.</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]" style={sansFont}>Complete chain of custody.</p>
                                            </div>

                                            {!deliveryComplete ? (
                                                <div className="space-y-6">
                                                    {/* Actions Grid */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() => setQrScanned(true)}
                                                            className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-colors ${qrScanned ? "bg-[var(--color-green-primary)]/10 border-[var(--color-green-accent)]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
                                                        >
                                                            {qrScanned ? <CheckCircle2 size={24} className="text-[var(--color-green-bright)]" /> : <QrCode size={24} className="text-white" />}
                                                            <span className={`text-xs uppercase tracking-widest ${qrScanned ? "text-[var(--color-green-bright)]" : "text-[var(--color-text-secondary)]"}`} style={sansFont}>{qrScanned ? "Verified" : "Scan QR"}</span>
                                                        </button>

                                                        <button
                                                            onClick={() => setPhotoUploaded(true)}
                                                            className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-colors ${photoUploaded ? "bg-[var(--color-green-primary)]/10 border-[var(--color-green-accent)]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
                                                        >
                                                            {photoUploaded ? <CheckCircle2 size={24} className="text-[var(--color-green-bright)]" /> : <Camera size={24} className="text-white" />}
                                                            <span className={`text-xs uppercase tracking-widest ${photoUploaded ? "text-[var(--color-green-bright)]" : "text-[var(--color-text-secondary)]"}`} style={sansFont}>{photoUploaded ? "Uploaded" : "Photo Proof"}</span>
                                                        </button>
                                                    </div>

                                                    {/* Checklist */}
                                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest" style={sansFont}>Protocol Checklist</span>
                                                            <span className="text-xs text-[var(--color-green-bright)] font-mono">{checklistProgress}%</span>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {[
                                                                "Containers Sealed & Intact",
                                                                "Temperature Range Verified",
                                                                "Handover Signed by NGO",
                                                                "Vehicle Cleaned Post-trip"
                                                            ].map((item, i) => (
                                                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checklist[i] ? "bg-[var(--color-green-bright)] border-[var(--color-green-bright)]" : "border-white/20 group-hover:border-white/40"}`}>
                                                                        {checklist[i] && <CheckCircle2 size={10} className="text-black" />}
                                                                    </div>
                                                                    <input type="checkbox" checked={checklist[i]} onChange={() => toggleChecklist(i)} className="hidden" />
                                                                    <span className={`text-sm transition-colors ${checklist[i] ? "text-white" : "text-[var(--color-text-secondary)]"}`} style={sansFont}>{item}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <button onClick={handleConfirmDelivery} disabled={!qrScanned || checklistProgress < 100} className="w-full py-4 rounded-xl bg-[var(--color-green-primary)] hover:bg-[var(--color-green-accent)] text-white text-sm tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={sansFont}>
                                                        Complete Delivery
                                                    </button>
                                                </div>
                                            ) : (
                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--color-green-primary)] to-[var(--color-green-bright)] flex items-center justify-center shadow-[0_0_30px_rgba(82,183,136,0.3)] mx-auto mb-6">
                                                        <CheckCircle2 size={40} className="text-white" />
                                                    </div>
                                                    <h2 className="text-4xl text-white font-light tracking-wide mb-2" style={serifFont}>Chain Complete.</h2>
                                                    <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-xs mx-auto" style={sansFont}>120 meals successfully transferred. Your contribution has been recorded.</p>

                                                    <button onClick={() => { setDeliveryComplete(false); setQrScanned(false); setPhotoUploaded(false); setChecklist([false, false, false, false]); goToStep(1); }} className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest" style={sansFont}>
                                                        Next Pickup
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
                            <h3 className="text-base text-white font-light mb-4" style={serifFont}>Active Route</h3>
                            <div className="h-[120px] rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
                                <Navigation size={24} className="mb-2 opacity-50" />
                                <span className="text-xs uppercase tracking-widest" style={sansFont}>{acceptedTask ? "Navigate" : "No Active Route"}</span>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.4}>
                            <h3 className="text-base text-white font-light mb-4" style={serifFont}>Session Impact</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider" style={sansFont}>Distance</span>
                                    <span className="text-white text-sm font-medium" style={sansFont}>14.2 km</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider" style={sansFont}>Meals</span>
                                    <span className="text-[var(--color-green-bright)] text-sm font-medium" style={sansFont}>280</span>
                                </div>
                                <div className="flex justify-between items-end pb-2">
                                    <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider" style={sansFont}>Time</span>
                                    <span className="text-white text-sm font-medium" style={sansFont}>2h 15m</span>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Recent Deliveries - RESTORED FEATURE */}
                        <GlassCard className="p-6 bg-white/[0.02]" delay={0.5}>
                            <h3 className="text-lg text-white font-light mb-4" style={serifFont}>Recent Deliveries</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm text-white" style={sansFont}>To: Feeding India</p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5" style={sansFont}>Yesterday • 5.2 km</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-[var(--color-green-primary)]/10 border border-[var(--color-green-accent)] text-[10px] text-[var(--color-green-bright)] uppercase tracking-wide">Done</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm text-white" style={sansFont}>To: Robin Hood Army</p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5" style={sansFont}>2 days ago • 3.8 km</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-[var(--color-green-primary)]/10 border border-[var(--color-green-accent)] text-[10px] text-[var(--color-green-bright)] uppercase tracking-wide">Done</span>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
