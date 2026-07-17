"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Pages that do NOT require authentication
const PUBLIC_ROUTES = ["/", "/signup"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isProtected = !PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    // If this route is protected and user is not authenticated, redirect to signup
    if (isProtected && !isAuthenticated) {
      router.replace("/signup");
    }
  }, [pathname, isAuthenticated, isProtected, router]);

  // Render children normally (the redirect handles protection)
  return <>{children}</>;
}
