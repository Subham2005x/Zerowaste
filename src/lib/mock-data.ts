// ============================================
// ZeroWaste — Mock Data & Utility Functions
// ============================================

// ---------- TYPES ----------

export interface Donation {
    id: string;
    foodType: string;
    quantity: string;
    source: string;
    distance: string;
    timeAgo: string;
    isVeg: boolean;
    freshness: number;
    status: "available" | "claimed" | "picked_up" | "delivered";
    urgency: "urgent" | "expiring" | "fresh";
    priority: "High" | "Medium" | "Low";
    eta?: string;
    assignedNgo?: string;
    assignedVolunteer?: string;
}

export interface NGO {
    name: string;
    distance: string;
    capacity: "High" | "Medium" | "Low";
    needs: string;
}

export interface VolunteerTask {
    id: string;
    foodItem: string;
    quantity: string;
    from: string;
    to: string;
    distance: string;
    eta: string;
    priority: "High" | "Medium" | "Low";
    status: "pending" | "accepted" | "picked_up" | "delivered";
}

export interface DonationHistory {
    id: string;
    foodItem: string;
    ngo: string;
    date: string;
    freshness: number;
    status: "Delivered" | "Claimed" | "Pending" | "Expired";
}

export interface IncomingPickup {
    id: string;
    foodItem: string;
    volunteer: string;
    eta: string;
    status: "Picked Up" | "Accepted" | "En Route";
}

// ---------- MOCK DATA ----------

export const donorStats = {
    totalDonations: 42,
    totalDonationsChange: "+8 this week",
    mealsRescued: 1260,
    mealsRescuedChange: "+180 this week",
    avgFreshness: 89,
    ngosServed: 12,
    ngosServedChange: "+2 new",
};

export const ngoStats = {
    mealsReceived: 3240,
    mealsReceivedChange: "+420 this week",
    peopleServed: 8560,
    peopleServedChange: "+1,200 this week",
    activeDonations: 7,
    wasteReduced: "2.1 tons",
    wasteReducedChange: "↓ 15% spoilage",
};

export const volunteerStats = {
    completedDeliveries: 87,
    completedDeliveriesChange: "+12 this week",
    activePickups: 2,
    volunteerScore: 4.8,
    totalDistance: "342 km",
    totalDistanceChange: "This month",
};

export const availableDonations: Donation[] = [
    {
        id: "DON-001",
        foodType: "Biryani (120 plates)",
        quantity: "120 plates",
        source: "Grand Hyatt Catering",
        distance: "1.8 km",
        timeAgo: "30 min ago",
        isVeg: false,
        freshness: 94,
        status: "available",
        urgency: "urgent",
        priority: "High",
    },
    {
        id: "DON-002",
        foodType: "Veg Pulao (80 plates)",
        quantity: "80 plates",
        source: "Taj Events",
        distance: "2.5 km",
        timeAgo: "1 hr ago",
        isVeg: true,
        freshness: 88,
        status: "available",
        urgency: "fresh",
        priority: "Medium",
    },
    {
        id: "DON-003",
        foodType: "Bread & Butter (200 pcs)",
        quantity: "200 pcs",
        source: "Monginis Bakery",
        distance: "3.2 km",
        timeAgo: "2 hr ago",
        isVeg: true,
        freshness: 75,
        status: "available",
        urgency: "expiring",
        priority: "Medium",
    },
    {
        id: "DON-004",
        foodType: "Mixed Fruits (50 kg)",
        quantity: "50 kg",
        source: "FreshMart Stores",
        distance: "4.0 km",
        timeAgo: "1.5 hr ago",
        isVeg: true,
        freshness: 92,
        status: "available",
        urgency: "fresh",
        priority: "Low",
    },
];

export const nearbyNGOs: NGO[] = [
    { name: "Akshaya Patra Foundation", distance: "2.3 km", capacity: "High", needs: "Cooked meals" },
    { name: "Feeding India - Zomato", distance: "3.1 km", capacity: "Medium", needs: "Any food" },
    { name: "Robin Hood Army", distance: "4.7 km", capacity: "High", needs: "Packaged food" },
];

export const volunteerTasks: VolunteerTask[] = [
    {
        id: "VT-001",
        foodItem: "Biryani (120 plates)",
        quantity: "120 plates",
        from: "Grand Hyatt",
        to: "Akshaya Patra",
        distance: "5.2 km",
        eta: "20 min",
        priority: "High",
        status: "pending",
    },
    {
        id: "VT-002",
        foodItem: "Veg Pulao (80 plates)",
        quantity: "80 plates",
        from: "Taj Events",
        to: "Feeding India",
        distance: "3.8 km",
        eta: "15 min",
        priority: "Medium",
        status: "accepted",
    },
    {
        id: "VT-003",
        foodItem: "Bread (200 pcs)",
        quantity: "200 pcs",
        from: "Monginis",
        to: "Robin Hood Army",
        distance: "6.1 km",
        eta: "25 min",
        priority: "Low",
        status: "pending",
    },
];

export const donationHistory: DonationHistory[] = [
    { id: "D-1042", foodItem: "Paneer Curry (50 plates)", ngo: "Akshaya Patra", date: "2026-02-13", freshness: 92, status: "Delivered" },
    { id: "D-1041", foodItem: "Rice & Dal (100 plates)", ngo: "Feeding India", date: "2026-02-12", freshness: 88, status: "Delivered" },
    { id: "D-1040", foodItem: "Sandwiches (80 pcs)", ngo: "Robin Hood Army", date: "2026-02-11", freshness: 78, status: "Delivered" },
    { id: "D-1039", foodItem: "Fruit Salad (30 kg)", ngo: "Akshaya Patra", date: "2026-02-10", freshness: 95, status: "Delivered" },
    { id: "D-1038", foodItem: "Pasta (60 plates)", ngo: "Feeding India", date: "2026-02-09", freshness: 85, status: "Expired" },
];

export const incomingPickups: IncomingPickup[] = [
    { id: "IP-001", foodItem: "Biryani (120 plates)", volunteer: "Rahul Sharma", eta: "15 min", status: "Picked Up" },
    { id: "IP-002", foodItem: "Veg Pulao (80 plates)", volunteer: "Priya Patel", eta: "25 min", status: "Accepted" },
];

export const impactStats = {
    totalMealsRescued: 128450,
    totalCO2Saved: 192.7,
    totalDonors: 1240,
    totalNGOs: 85,
    totalVolunteers: 3200,
    citiesCovered: 12,
};

// ---------- UTILITY FUNCTIONS ----------

// Environmental ROI: 1.2 lbs food = 1 meal; 1 lb food rescued = 3.66 lbs CO2 prevented
export function calculateMeals(foodPoundsRescued: number): number {
    return Math.round(foodPoundsRescued / 1.2);
}

export function calculateCO2Prevented(foodPoundsRescued: number): number {
    return parseFloat((foodPoundsRescued * 3.66).toFixed(1));
}

// Neural Harvest: Priority scoring (higher = more urgent)
export function calculatePriorityScore(donation: Donation): number {
    let score = 0;

    // Expiry urgency (highest weight)
    if (donation.urgency === "urgent") score += 100;
    else if (donation.urgency === "expiring") score += 60;
    else score += 20;

    // Distance (closer = higher priority)
    const dist = parseFloat(donation.distance);
    score += Math.max(0, 50 - dist * 10);

    // Freshness bonus
    score += donation.freshness * 0.3;

    return Math.round(score);
}

// Format large numbers
export function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    return num.toLocaleString();
}

// Get urgency color class
export function getUrgencyClass(urgency: string): string {
    switch (urgency) {
        case "urgent": return "badge-urgent";
        case "expiring": return "badge-expiring";
        case "fresh": return "badge-fresh";
        default: return "badge-fresh";
    }
}

export function getUrgencyLabel(urgency: string): string {
    switch (urgency) {
        case "urgent": return "Urgent";
        case "expiring": return "Expiring Soon";
        case "fresh": return "Fresh";
        default: return "Fresh";
    }
}

export function getPriorityClass(priority: string): string {
    switch (priority) {
        case "High": return "badge-priority-high";
        case "Medium": return "badge-priority-medium";
        case "Low": return "badge-priority-low";
        default: return "";
    }
}
