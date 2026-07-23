"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * PERFORMANCE-OPTIMIZED RouteGuard
 *
 * Strategy: Optimistic Rendering
 * - Content renders IMMEDIATELY on every route — no spinner, no blocking.
 * - If auth resolves to "unauthenticated" on a protected route, we redirect.
 * - This makes navigation feel instant (<50ms) instead of waiting 1–1.5s for
 *   the auth check to complete before showing any UI.
 *
 * Protected routes (redirect to /login if unauthenticated):
 *   /admin, /vault, /profile
 *
 * All other routes: public — render immediately, no auth gate.
 */
const PROTECTED_PREFIXES = ["/admin", "/vault", "/profile"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  useEffect(() => {
    // Only redirect once auth has resolved (isLoading=false)
    // and only on routes that explicitly require authentication
    if (!isLoading && isProtected && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, isProtected, pathname, router]);

  // ✅ Always render children immediately — no spinner, no blocking.
  // Protected routes will redirect AFTER auth resolves if needed.
  return <>{children}</>;
}
