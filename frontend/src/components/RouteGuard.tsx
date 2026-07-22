"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = [
  "/",
  "/signup",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isProtected = !PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isLoading && isProtected && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, isAuthenticated, isLoading, isProtected, router]);

  if (isLoading && isProtected) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAF8] text-[#111111]">
        <div className="w-8 h-8 border-3 border-[#C9A86A]/30 border-t-[#C9A86A] rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#666666]">Verifying Authentication Session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
