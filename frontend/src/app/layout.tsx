import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import { RouteGuard } from "@/components/RouteGuard";
import { ClientShells } from "@/components/ClientShells";
import { AppPreloader } from "@/components/AppPreloader";
import dynamic from "next/dynamic";

// ─── next/font: self-hosted, zero layout shift, no external CDN blocking ──────
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Inter & Manrope replace the blocking Google Fonts <link> tags
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["600", "700", "800"],
});

// Footer is below the fold — defer its JS chunk (ssr still enabled)
const Footer = dynamic(
  () => import("@/components/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true }
);

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-bharat-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Smart Bharat AI — Intelligent Government Services",
    template: "%s | Smart Bharat AI",
  },
  description:
    "AI-powered platform to discover government schemes, apply for foundational IDs, file civic complaints, and get 24/7 policy guidance.",
  openGraph: {
    title: "Smart Bharat AI — Next-Gen Citizen Platform",
    description: "Discover government schemes, track applications, and consult 24/7 AI policy assistant.",
    url: appUrl,
    siteName: "Smart Bharat AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Bharat AI",
    description: "Intelligent citizen service platform powered by AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        manrope.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600&family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-[100dvh] bg-background text-foreground font-sans overflow-x-hidden">
        <AuthProvider>
          <AppPreloader />
          <RouteGuard>
            <Navbar />
            <main>{children}</main>
            <Footer />
            {/* ClientShells hosts ssr:false components (AIAssistant chat widget) */}
            <ClientShells />
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
