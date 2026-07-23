/**
 * Smart Bharat AI — Enterprise AI Orchestration Types
 */

export type MessageRole = 'system' | 'user' | 'assistant';

export interface AIMessage {
  role: MessageRole;
  content: string;
}

export type IntentCategory =
  | 'SCHEME_DISCOVERY'
  | 'SCHEME_ELIGIBILITY'
  | 'GOV_ID_SERVICE'
  | 'COMPLAINT_GRIEVANCE'
  | 'DOCUMENT_CREDENTIAL'
  | 'GENERAL_GOV_QA'
  | 'COMPLEX_REASONING'
  | 'UNKNOWN';

export interface IntentClassification {
  category: IntentCategory;
  confidence: number;
  extractedEntities: {
    schemeName?: string;
    idType?: string;
    state?: string;
    occupation?: string;
    category?: string;
    keywords: string[];
  };
  requiresSearch: boolean;
  requiresReasoning: boolean;
  suggestedTools: string[];
}

export interface SecurityCheckResult {
  safe: boolean;
  reason?: string;
  sanitizedInput: string;
  flaggedPatterns?: string[];
}

export interface RAGSearchResult {
  title: string;
  content: string;
  category: string;
  score: number;
  sourceUrl?: string;
}

export interface ToolExecutionResult {
  toolName: string;
  success: boolean;
  output: Record<string, any> | string;
  error?: string;
}

export interface MemoryState {
  recentMessages: AIMessage[];
  summary?: string;
  userGoal?: string;
  activeTopic?: string;
}

export interface ValidationResult {
  valid: boolean;
  hallucinatedClaims: string[];
  formattingIssues: string[];
  score: number;
  correctedContent?: string;
}

export interface AIResponsePayload {
  content: string;
  intent: IntentCategory;
  sources: RAGSearchResult[];
  toolsUsed: string[];
  providerUsed: string;
  executionTimeMs: number;
}
