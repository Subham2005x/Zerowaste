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
import { volunteerStats, volunteerTasks, getPriorityClass } from "@/lib/mock-data";

const steps = [
    { id: 1, label: "Pickup Alerts", icon: Bell },
    { id: 2, label: "Accept Pickup", icon: Truck },
    { id: 3, label: "Confirm Drop-Off", icon: CheckCircle2 },
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
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard icon={<Package size={18} className="text-[var(--color-green-bright)]" />} label="Completed Deliveries" value={volunteerStats.completedDeliveries} change={volunteerStats.completedDeliveriesChange} delay={0} />
                    <StatCard icon={<Truck size={18} className="text-[var(--color-green-bright)]" />} label="Active Pickups" value={volunteerStats.activePickups} delay={0.05} />
                    <StatCard icon={<Star size={18} className="text-[var(--color-warning-amber)]" />} label="Volunteer Score" value={volunteerStats.volunteerScore} delay={0.1} />
                    <StatCard icon={<Navigation size={18} className="text-[var(--color-green-bright)]" />} label="Total Distance" value={volunteerStats.totalDistance} change={volunteerStats.totalDistanceChange} delay={0.15} />
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

                                {/* STEP 1: PICKUP ALERTS */}
                                {currentStep === 1 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.2)] flex items-center justify-center"><Bell size={20} className="text-[var(--color-warning-amber)]" /></div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Pickup Alerts</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]">Nearby food available for pickup</p>
                                            </div>
                                        </div>

                                        {/* Proximity Alert Banner */}
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[var(--color-warning-amber)] mb-5 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[rgba(245,158,11,0.2)] flex items-center justify-center animate-pulse shrink-0">
                                                <AlertTriangle size={20} className="text-[var(--color-warning-amber)]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">🔔 150 meals just 1.8 km away!</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">Grand Hyatt — Expires in 3 hours • Urgent pickup needed</p>
                                            </div>
                                        </motion.div>

                                        <div className="space-y-3">
                                            {volunteerTasks.map((task, i) => (
                                                <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                                    className={`p-4 rounded-xl border transition-all ${acceptedTask === task.id ? "bg-[rgba(16,185,129,0.1)] border-[var(--color-green-accent)]" : "bg-[rgba(255,255,255,0.02)] border-[var(--color-border-glass)] hover:border-[rgba(255,255,255,0.12)]"} ${task.priority === "High" ? "urgent-pulse" : ""}`}>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-white">{task.foodItem}</h3>
                                                            <p className="text-xs text-[var(--color-text-muted)]">{task.from} → {task.to}</p>
                                                        </div>
                                                        <span className={getPriorityClass(task.priority) + " text-xs font-semibold"}>{task.priority} Priority</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
                                                        <span className="flex items-center gap-1"><MapPin size={12} /> {task.distance}</span>
                                                        <span className="flex items-center gap-1"><Clock size={12} /> ETA: {task.eta}</span>
                                                        <span>{task.quantity}</span>
                                                    </div>
                                                    {acceptedTask === task.id ? (
                                                        <span className="badge badge-fresh">✅ Accepted</span>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleAcceptTask(task.id)} className="btn-accept flex-1 py-2 flex items-center justify-center gap-1.5">Accept <ArrowRight size={14} /></button>
                                                            <button className="btn-reject py-2 px-4">Skip</button>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </GlassCard>
                                )}

                                {/* STEP 2: ACCEPT PICKUP — Route / Instructions */}
                                {currentStep === 2 && (
                                    <GlassCard className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Truck size={20} className="text-white" /></div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Pickup in Progress</h2>
                                                <p className="text-sm text-[var(--color-text-muted)]">Navigate to donor location</p>
                                            </div>
                                        </div>

                                        {/* Route preview */}
                                        <div className="h-[200px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)] flex flex-col items-center justify-center text-[var(--color-text-muted)] mb-5">
                                            <Navigation size={32} className="mb-2 opacity-40" />
                                            <p className="text-sm">Route: Grand Hyatt → Akshaya Patra</p>
                                            <p className="text-xs mt-1">5.2 km • ~20 min</p>
                                            <button className="btn-primary mt-3 py-2 px-4 text-sm flex items-center gap-2"><Navigation size={14} /> Open in Google Maps</button>
                                        </div>

                                        {/* Pickup Instructions */}
                                        <div className="glass-card p-4 mb-5">
                                            <h3 className="text-sm font-semibold text-white mb-3">Pickup Instructions</h3>
                                            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                                                <li className="flex items-center gap-2">📍 Go to the main entrance, ask for catering manager</li>
                                                <li className="flex items-center gap-2">📦 Food is packed in 6 large containers</li>
                                                <li className="flex items-center gap-2">🧊 Keep insulated — temp-sensitive items</li>
                                                <li className="flex items-center gap-2">📸 Take photo of sealed containers before leaving</li>
                                            </ul>
                                        </div>

                                        {/* Donor Contact */}
                                        <div className="glass-card p-4 mb-5">
                                            <h3 className="text-sm font-semibold text-white mb-3">Donor Contact</h3>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-white">Grand Hyatt Catering</p>
                                                    <p className="text-xs text-[var(--color-text-muted)]">Contact: Kitchen Manager</p>
                                                </div>
                                                <a href="tel:+919876500001" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[var(--color-green-accent)] text-sm text-[var(--color-green-bright)] hover:bg-[rgba(16,185,129,0.2)] transition-colors">
                                                    <Phone size={14} /> Call
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={prevStep} className="btn-reject flex-1 py-3 flex items-center justify-center gap-2"><ArrowLeft size={16} /> Back</button>
                                            <button onClick={nextStep} className="btn-primary flex-[2] py-3 flex items-center justify-center gap-2">Confirm Drop-Off <ArrowRight size={16} /></button>
                                        </div>
                                    </GlassCard>
                                )}

                                {/* STEP 3: CONFIRM DROP-OFF */}
                                {currentStep === 3 && (
                                    <GlassCard className="p-6">
                                        {!deliveryComplete ? (
                                            <>
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-[rgba(59,130,246,0.2)] flex items-center justify-center"><CheckCircle2 size={20} className="text-blue-400" /></div>
                                                    <div>
                                                        <h2 className="text-xl font-bold text-white">Confirm Drop-Off</h2>
                                                        <p className="text-sm text-[var(--color-text-muted)]">Verify delivery at NGO location</p>
                                                    </div>
                                                </div>

                                                {/* QR Code Scan */}
                                                <div className="glass-card p-5 mb-5 text-center">
                                                    <QrCode size={28} className="mx-auto mb-2 text-[var(--color-text-muted)]" />
                                                    <p className="text-sm font-medium text-white mb-2">Scan QR Code at NGO</p>
                                                    {!qrScanned ? (
                                                        <button onClick={() => setQrScanned(true)} className="btn-primary py-2.5 px-6 text-sm mx-auto flex items-center gap-2"><QrCode size={16} /> Scan QR Code</button>
                                                    ) : (
                                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                                            <CheckCircle2 size={28} className="text-[var(--color-green-bright)] mx-auto mb-1" />
                                                            <p className="text-sm text-[var(--color-green-bright)]">QR Verified — Location Confirmed ✓</p>
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Checklist */}
                                                <div className="glass-card p-4 mb-5">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <p className="text-sm font-medium text-white">Pickup Checklist</p>
                                                        <span className="text-xs text-[var(--color-text-muted)]">{checklistProgress}% complete</span>
                                                    </div>
                                                    <div className="progress-bar mb-3">
                                                        <motion.div className="progress-bar-fill" style={{ background: "linear-gradient(90deg, #1B4332, #52B788)" }}
                                                            animate={{ width: `${checklistProgress}%` }} transition={{ duration: 0.3 }} />
                                                    </div>
                                                    {[
                                                        "Food containers intact & sealed",
                                                        "Quantity matches listing",
                                                        "Temperature within safe range",
                                                        "Handed over to NGO representative",
                                                    ].map((item, i) => (
                                                        <label key={i} className="flex items-center gap-2.5 py-2 cursor-pointer border-b border-[var(--color-border-glass)] last:border-b-0">
                                                            <input type="checkbox" checked={checklist[i]} onChange={() => toggleChecklist(i)} className="w-4 h-4 rounded accent-[var(--color-green-accent)]" />
                                                            <span className={`text-sm transition-colors ${checklist[i] ? "text-white" : "text-[var(--color-text-secondary)]"}`}>{item}</span>
                                                        </label>
                                                    ))}
                                                </div>

                                                {/* Photo Upload */}
                                                <div className="glass-card p-4 mb-5">
                                                    <p className="text-sm font-medium text-white mb-2">Photo Proof of Delivery</p>
                                                    {!photoUploaded ? (
                                                        <div onClick={() => setPhotoUploaded(true)} className="border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-green-accent)] transition-colors">
                                                            <Camera size={24} className="text-[var(--color-text-muted)] mb-1" />
                                                            <span className="text-xs text-[var(--color-text-muted)]">Tap to upload photo</span>
                                                        </div>
                                                    ) : (
                                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-sm text-[var(--color-green-bright)]">
                                                            <CheckCircle2 size={16} /> Photo uploaded ✓
                                                        </motion.div>
                                                    )}
                                                </div>

                                                <button onClick={handleConfirmDelivery} disabled={!qrScanned || checklistProgress < 100}
                                                    className="btn-primary w-full py-3 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                                    <CheckCircle2 size={18} /> Confirm Delivery
                                                </button>
                                                <div className="flex gap-3 mt-3"><button onClick={prevStep} className="btn-reject w-full py-2.5 flex items-center justify-center gap-2"><ArrowLeft size={16} /> Back</button></div>
                                            </>
                                        ) : (
                                            /* Success Screen */
                                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="text-center py-6">
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                                                    className="w-24 h-24 rounded-full gradient-bg glow-green flex items-center justify-center mx-auto mb-6">
                                                    <CheckCircle2 size={44} className="text-white" />
                                                </motion.div>
                                                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cal)" }}>🎉 Delivery Complete!</h2>
                                                <p className="text-[var(--color-text-secondary)] mb-8">120 meals successfully delivered to Akshaya Patra</p>
                                                <div className="grid grid-cols-3 gap-4 mb-8">
                                                    <div className="glass-card p-4"><p className="text-2xl font-bold gradient-text">88</p><p className="text-xs text-[var(--color-text-muted)]">Deliveries</p></div>
                                                    <div className="glass-card p-4"><p className="text-2xl font-bold gradient-text">4.8</p><p className="text-xs text-[var(--color-text-muted)]">Score</p></div>
                                                    <div className="glass-card p-4"><p className="text-2xl font-bold gradient-text">347 km</p><p className="text-xs text-[var(--color-text-muted)]">Total Dist.</p></div>
                                                </div>
                                                <button onClick={() => { goToStep(1); setDeliveryComplete(false); setQrScanned(false); setPhotoUploaded(false); setChecklist([false, false, false, false]); setAcceptedTask(null); }}
                                                    className="btn-primary py-3 px-8 text-base">View More Pickups</button>
                                            </motion.div>
                                        )}
                                    </GlassCard>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Sidebar — Volunteer-specific */}
                    <div className="space-y-6">
                        <GlassCard className="p-5" delay={0.25}>
                            <h3 className="text-base font-semibold text-white mb-4">Your Active Route</h3>
                            <div className="h-[150px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)] flex flex-col items-center justify-center text-[var(--color-text-muted)]">
                                <Navigation size={24} className="mb-2 opacity-40" />
                                <p className="text-xs">{acceptedTask ? "Grand Hyatt → Akshaya Patra" : "No active route"}</p>
                                {acceptedTask && <p className="text-xs mt-0.5">5.2 km • ~20 min</p>}
                            </div>
                        </GlassCard>

                        <GlassCard className="p-5" delay={0.3}>
                            <h3 className="text-base font-semibold text-white mb-4">Today&apos;s Summary</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Deliveries today</span>
                                    <span className="text-white font-medium">3</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Distance covered</span>
                                    <span className="text-white font-medium">14.2 km</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Avg delivery time</span>
                                    <span className="text-white font-medium">22 min</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Meals moved</span>
                                    <span className="text-[var(--color-green-bright)] font-medium">280</span>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-5" delay={0.35}>
                            <h3 className="text-base font-semibold text-white mb-4">Upcoming Pickups</h3>
                            <div className="space-y-3">
                                {volunteerTasks.filter(t => t.status === "pending").map((task) => (
                                    <div key={task.id} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-glass)]">
                                        <p className="text-sm font-medium text-white">{task.foodItem}</p>
                                        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mt-1">
                                            <span>{task.from} → {task.to}</span>
                                            <span>{task.distance}</span>
                                        </div>
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
