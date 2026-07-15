import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { PageWrapper } from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Smart Bharat AI",
  description: "One Platform for All Your Government Needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 font-sans`}>
        <Navbar />
        <main>
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
      </body>
    </html>
  );
}
