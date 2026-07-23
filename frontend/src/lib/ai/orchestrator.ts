/**
 * Smart Bharat AI — Enterprise AI Orchestrator Engine
 * Coordinates Security -> Intent Classification -> Memory -> RAG -> Tools -> Prompt Assembly -> LLM Routing -> Validation -> Response Formatting.
 */

import { validateInputSecurity } from "./security";
import { classifyUserQuery } from "./classifier";
import { processConversationMemory } from "./memory";
import { queryKnowledgeBase } from "./rag";
import { executeTools } from "./tools";
import { assembleSystemPrompt, formatUserMessagePayload } from "./promptBuilder";
import { dispatchLLMRequest } from "./modelRouter";
import { validateAndCleanResponse } from "./validator";
import { AIMessage, AIResponsePayload } from "./types";

export class AIOrchestrator {
  static async process(history: AIMessage[]): Promise<AIResponsePayload> {
    const startTime = Date.now();

    if (!history || history.length === 0) {
      throw new Error("Message history is required");
    }

    const lastMessage = history[history.length - 1];
    const userQuery = lastMessage.content;
    const priorHistory = history.slice(0, history.length - 1);

    // Stage 1: Security Guardrails
    const securityCheck = validateInputSecurity(userQuery);
    const activeQuery = securityCheck.safe ? securityCheck.sanitizedInput : userQuery;

    // Stage 2: Intent Classification & Entity Extraction
    const intent = classifyUserQuery(activeQuery);

    // Stage 3: Conversation Memory Processing & Summarization
    const memoryState = processConversationMemory(priorHistory);

    // Stage 4: Advanced RAG Knowledge Search
    const ragSources = intent.requiresSearch ? queryKnowledgeBase(activeQuery, 4) : [];

    // Stage 5: Tool Execution Engine
    const toolResults = executeTools(intent, activeQuery);

    // Stage 6: Enterprise Dynamic Prompt Assembly
    const systemPrompt = assembleSystemPrompt(intent, memoryState, ragSources, toolResults);
    const messagePayload = formatUserMessagePayload(activeQuery, memoryState.recentMessages);

    // Stage 7: Resilient Multi-Model Routing & LLM Dispatch
    const llmResponse = await dispatchLLMRequest(systemPrompt, messagePayload, {
      temperature: intent.requiresReasoning ? 0.3 : 0.5,
      maxTokens: 1500,
    });

    // Stage 8 & 9: Self-Reflection, Validation & Formatting
    const validation = validateAndCleanResponse(llmResponse.content, ragSources);

    const executionTimeMs = Date.now() - startTime;

    return {
      content: validation.correctedContent || llmResponse.content,
      intent: intent.category,
      sources: ragSources,
      toolsUsed: toolResults.map((t) => t.toolName),
      providerUsed: llmResponse.provider,
      executionTimeMs,
    };
  }
}
