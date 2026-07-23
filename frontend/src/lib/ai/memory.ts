/**
 * Smart Bharat AI — Conversation Memory & Context Pruning Engine
 */

import { AIMessage, MemoryState } from "./types";

const MAX_WINDOW_MESSAGES = 10;
const MAX_TOKEN_BUDGET_APPROX = 3000;

export function processConversationMemory(history: AIMessage[]): MemoryState {
  if (!history || history.length === 0) {
    return { recentMessages: [] };
  }

  // Keep only the most recent messages up to window size to prevent token blowup
  const recentMessages = history.slice(-MAX_WINDOW_MESSAGES);
  const userGoal = extractUserGoal(history);
  const activeTopic = extractActiveTopic(history);

  let summary: string | undefined;
  if (history.length > MAX_WINDOW_MESSAGES) {
    const truncatedCount = history.length - MAX_WINDOW_MESSAGES;
    summary = `[Prior conversation context: User asked ${truncatedCount} earlier questions regarding ${activeTopic || 'government services'}].`;
  }

  return {
    recentMessages,
    summary,
    userGoal,
    activeTopic,
  };
}

function extractUserGoal(history: AIMessage[]): string | undefined {
  const firstUserMsg = history.find((m) => m.role === "user");
  if (firstUserMsg) {
    return firstUserMsg.content.slice(0, 120);
  }
  return undefined;
}

function extractActiveTopic(history: AIMessage[]): string | undefined {
  const lastUserMsg = [...history].reverse().find((m) => m.role === "user");
  if (!lastUserMsg) return undefined;

  const content = lastUserMsg.content.toLowerCase();
  if (content.includes("farmer") || content.includes("kisan") || content.includes("crop")) return "Farmer Welfare & Schemes";
  if (content.includes("student") || content.includes("scholarship")) return "Student Scholarships";
  if (content.includes("aadhaar") || content.includes("pan") || content.includes("passport")) return "Government Identity Services";
  if (content.includes("complaint") || content.includes("grievance")) return "Civic Complaint & Grievances";
  return "Government Citizen Services";
}
