"use client";

import CustomCursor from "@/components/ui/CustomCursor";

/**
 * Client-side global effects wrapper.
 * Renders the custom cursor and grain overlay on every page.
 */
export default function GlobalEffects() {
    return (
        <>
            <CustomCursor />
            <div className="grain-overlay" />
        </>
    );
}
