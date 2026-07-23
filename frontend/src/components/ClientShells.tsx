"use client";

import dynamic from "next/dynamic";

/**
 * ClientLayoutShells — wraps heavy client-only layout components.
 * This client boundary lets us use `ssr: false` dynamic imports
 * while keeping layout.tsx as a Server Component.
 */

const AIAssistant = dynamic(
  () => import("@/components/ai/AIAssistant").then((m) => ({ default: m.AIAssistant })),
  { ssr: false }
);

export function ClientShells() {
  return <AIAssistant />;
}
