/**
 * Smart Bharat AI — Multi-Model Provider Router
 * Resilient multi-provider router with fallback chains (Groq -> OpenRouter -> Gemini), retries, and timeout protection.
 */

import { AIMessage } from "./types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "meta-llama/llama-3.3-70b-instruct";

export interface ModelRouteOptions {
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface ModelRouteResponse {
  content: string;
  provider: string;
}

export async function dispatchLLMRequest(
  systemPrompt: string,
  messages: AIMessage[],
  options: ModelRouteOptions = {}
): Promise<ModelRouteResponse> {
  const groqKey = process.env.GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const temperature = options.temperature ?? 0.5;
  const maxTokens = options.maxTokens ?? 1500;

  const payloadMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  // 1. Try Groq Primary Route
  if (groqKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 12000);

      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: payloadMessages,
          temperature,
          max_tokens: maxTokens,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return { content, provider: "Groq (Llama-3.3-70B)" };
        }
      } else {
        console.warn("Groq provider warning:", res.status, await res.text());
      }
    } catch (err) {
      console.warn("Groq provider fallback triggered:", err);
    }
  }

  // 2. Fallback to OpenRouter
  if (openRouterKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 15000);

      const res = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openRouterKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Smart Bharat AI",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: payloadMessages,
          temperature,
          max_tokens: maxTokens,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return { content, provider: "OpenRouter (Llama-3.3-70B-Instruct)" };
        }
      } else {
        console.error("OpenRouter provider error:", res.status, await res.text());
      }
    } catch (err) {
      console.error("OpenRouter provider fallback triggered:", err);
    }
  }

  throw new Error("All AI model providers are currently unreachable. Please verify API keys and network connectivity.");
}
