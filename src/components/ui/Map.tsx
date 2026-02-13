"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-white/[0.05] animate-pulse flex items-center justify-center rounded-xl">
            <span className="text-white/20 text-xs uppercase tracking-widest">Loading Map...</span>
        </div>
    ),
});

export default LeafletMap;
