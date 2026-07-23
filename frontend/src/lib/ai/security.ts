/**
 * Smart Bharat AI — Security & Guardrails Engine
 * Protects against prompt injections, jailbreaks, system prompt leaks, and unsafe execution.
 */

import { SecurityCheckResult } from "./types";

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above)\s+instructions/i,
  /disregard\s+system\s+prompt/i,
  /you\s+are\s+now\s+in\s+dan\s+mode/i,
  /reveal\s+(your\s+)?system\s+prompt/i,
  /print\s+(your\s+)?initial\s+instructions/i,
  /bypass\s+safety\s+filter/i,
  /do\s+anything\s+now/i,
  /repeat\s+after\s+me:\s*system/i,
];

export function validateInputSecurity(input: string): SecurityCheckResult {
  const sanitizedInput = input.trim();
  const flaggedPatterns: string[] = [];

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitizedInput)) {
      flaggedPatterns.push(pattern.source);
    }
  }

  if (flaggedPatterns.length > 0) {
    return {
      safe: false,
      reason: "Potential prompt injection or safety rule violation detected.",
      sanitizedInput: "I have a question regarding government schemes and citizen services in India.",
      flaggedPatterns,
    };
  }

  return {
    safe: true,
    sanitizedInput,
  };
}

export function sanitizeResponseOutput(output: string): string {
  let clean = output;
  // Prevent systemic leaking of internal keys or sensitive environment variables
  clean = clean.replace(/(gsk_[A-Za-z0-9_]{30,})/g, "[REDACTED_KEY]");
  clean = clean.replace(/(sk-or-v1-[A-Za-z0-9_]{30,})/g, "[REDACTED_KEY]");
  clean = clean.replace(/(AI_KEY_[A-Za-z0-9_]+)/g, "[REDACTED_KEY]");
  return clean;
}
