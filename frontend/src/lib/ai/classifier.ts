/**
 * Smart Bharat AI — Intent Classifier & Entity Extraction Engine
 */

import { IntentClassification, IntentCategory } from "./types";

const KEYWORD_MAP: Record<IntentCategory, string[]> = {
  SCHEME_DISCOVERY: ["scheme", "schemes", "yojana", "benefit", "subsidy", "welfare", "apply scheme", "farmer scheme", "student scholarship"],
  SCHEME_ELIGIBILITY: ["eligible", "eligibility", "can i apply", "am i eligible", "who can apply", "income limit", "land requirement"],
  GOV_ID_SERVICE: ["aadhaar", "pan", "passport", "voter id", "driving license", "ration card", "epic", "id card", "update id"],
  COMPLAINT_GRIEVANCE: ["complaint", "grievance", "pothole", "garbage", "water issue", "electricity issue", "corrupt", "delay", "report"],
  DOCUMENT_CREDENTIAL: ["document", "credential", "vault", "certificate", "mark sheet", "store doc"],
  GENERAL_GOV_QA: ["how to", "what is", "office", "portal", "website", "helpline", "contact"],
  COMPLEX_REASONING: ["compare", "best option", "step by step guide", "which is better", "calculate"],
  UNKNOWN: [],
};

export function classifyUserQuery(query: string): IntentClassification {
  const normalized = query.toLowerCase();
  let maxMatchCount = 0;
  let detectedCategory: IntentCategory = "GENERAL_GOV_QA";

  for (const [category, keywords] of Object.entries(KEYWORD_MAP) as [IntentCategory, string[]][]) {
    let count = 0;
    for (const kw of keywords) {
      if (normalized.includes(kw)) {
        count++;
      }
    }
    if (count > maxMatchCount) {
      maxMatchCount = count;
      detectedCategory = category;
    }
  }

  // Extract key entity hints
  const extractedEntities: IntentClassification["extractedEntities"] = {
    keywords: query.split(/\s+/).filter((w) => w.length > 3),
  };

  if (normalized.includes("farmer") || normalized.includes("kisan") || normalized.includes("crop") || normalized.includes("land")) {
    extractedEntities.occupation = "farmer";
  } else if (normalized.includes("student") || normalized.includes("scholarship") || normalized.includes("college") || normalized.includes("school")) {
    extractedEntities.occupation = "student";
  }

  if (normalized.includes("aadhaar")) extractedEntities.idType = "Aadhaar Card";
  if (normalized.includes("pan")) extractedEntities.idType = "PAN Card";
  if (normalized.includes("passport")) extractedEntities.idType = "Passport";

  const requiresSearch = detectedCategory === "SCHEME_DISCOVERY" || detectedCategory === "SCHEME_ELIGIBILITY" || detectedCategory === "GOV_ID_SERVICE";
  const requiresReasoning = normalized.includes("compare") || normalized.includes("best") || normalized.length > 80;

  const suggestedTools: string[] = [];
  if (requiresSearch) suggestedTools.push("rag_knowledge_search");
  if (extractedEntities.occupation === "farmer") suggestedTools.push("farmer_scheme_matcher");
  if (extractedEntities.occupation === "student") suggestedTools.push("student_scheme_matcher");
  if (detectedCategory === "GOV_ID_SERVICE") suggestedTools.push("id_requirement_checker");

  return {
    category: detectedCategory,
    confidence: maxMatchCount > 0 ? 0.9 : 0.6,
    extractedEntities,
    requiresSearch,
    requiresReasoning,
    suggestedTools,
  };
}
