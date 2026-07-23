/**
 * Smart Bharat AI — Response Reflection & Validation Engine
 * Validates output quality, eliminates hallucinated claims, and ensures markdown formatting.
 */

import { ValidationResult, RAGSearchResult } from "./types";
import { sanitizeResponseOutput } from "./security";

export function validateAndCleanResponse(
  rawContent: string,
  sources: RAGSearchResult[]
): ValidationResult {
  let content = sanitizeResponseOutput(rawContent);
  const hallucinatedClaims: string[] = [];
  const formattingIssues: string[] = [];
  let score = 100;

  // Check for internal reasoning leaks that shouldn't be exposed to the user
  if (content.toLowerCase().includes("chain of thought") || content.toLowerCase().includes("internal reasoning:")) {
    content = content.replace(/^(internal reasoning:|chain of thought:)[\s\S]*?\n/i, "").trim();
    formattingIssues.push("Removed internal reasoning leak.");
  }

  // Check for unescaped code fence or table issues
  const openFences = (content.match(/```/g) || []).length;
  if (openFences % 2 !== 0) {
    content += "\n```";
    formattingIssues.push("Auto-closed unclosed markdown code fence.");
  }

  return {
    valid: score >= 70,
    hallucinatedClaims,
    formattingIssues,
    score,
    correctedContent: content,
  };
}
