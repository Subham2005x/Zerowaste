import type { Metadata } from "next";
import "./globals.css";
import GlobalEffects from "@/components/GlobalEffects";

export const metadata: Metadata = {
    title: "ZeroWaste — Bridging Surplus to Sustenance",
    description:
        "An AI-powered logistics bridge for food security. Connect donors, NGOs, and volunteers to rescue surplus food and reduce waste.",
    keywords: ["food rescue", "zero waste", "food security", "sustainability", "NGO", "volunteer"],
};

import { Cormorant_Garamond, Space_Grotesk, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${cormorant.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}>
                <GlobalEffects />
                {children}
            </body>
        </html>
    );
}
