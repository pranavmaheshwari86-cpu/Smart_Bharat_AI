import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: "Smart Bharat AI — Intelligent Government Services",
  description:
    "AI-powered platform to discover government schemes, apply for foundational IDs, file civic complaints, and get 24/7 policy guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, "dark")}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] bg-background text-foreground font-sans overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
