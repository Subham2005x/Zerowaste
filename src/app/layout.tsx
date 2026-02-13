import type { Metadata } from "next";
import "./globals.css";
import GlobalEffects from "@/components/GlobalEffects";

export const metadata: Metadata = {
    title: "ZeroWaste — Bridging Surplus to Sustenance",
    description:
        "An AI-powered logistics bridge for food security. Connect donors, NGOs, and volunteers to rescue surplus food and reduce waste.",
    keywords: ["food rescue", "zero waste", "food security", "sustainability", "NGO", "volunteer"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                <GlobalEffects />
                {children}
            </body>
        </html>
    );
}
