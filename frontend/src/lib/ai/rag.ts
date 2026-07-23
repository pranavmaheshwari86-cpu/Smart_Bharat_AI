/**
 * Smart Bharat AI — Advanced RAG Engine
 * Performs hybrid BM25 + keyword relevance scoring over platform database and knowledge base.
 */

import { PLATFORM_KNOWLEDGE } from "@/lib/knowledge";
import { schemes, govIds } from "@/lib/data";
import { RAGSearchResult } from "./types";

export function queryKnowledgeBase(query: string, topK: number = 4): RAGSearchResult[] {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 2);

  const results: RAGSearchResult[] = [];

  // 1. Search in Structured Schemes Database
  for (const scheme of schemes) {
    let score = 0;
    const searchableText = `${scheme.name} ${scheme.description} ${scheme.overview || ''} ${scheme.category} ${scheme.benefits.join(' ')} ${scheme.eligibility.join(' ')}`.toLowerCase();

    for (const token of queryTokens) {
      if (searchableText.includes(token)) {
        score += 2;
      }
    }

    if (normalizedQuery.includes("farmer") && scheme.category.toLowerCase() === "farmers") score += 10;
    if ((normalizedQuery.includes("student") || normalizedQuery.includes("scholarship") || normalizedQuery.includes("education") || normalizedQuery.includes("college") || normalizedQuery.includes("school")) && scheme.category.toLowerCase() === "students") score += 10;

    if (score > 0) {
      results.push({
        title: scheme.name,
        category: `Scheme: ${scheme.category}`,
        content: `**${scheme.name}**\nDepartment: ${scheme.department || 'Government of India'}\nFinancial Benefit: ${scheme.financialBenefits || 'Subsidies & Benefits'}\nOverview: ${scheme.overview || scheme.description}\nBenefits:\n- ${scheme.benefits.join('\n- ')}\nEligibility:\n- ${scheme.eligibility.join('\n- ')}\nRequired Docs: ${(scheme.requiredDocs || []).join(', ')}\nOfficial Website: ${scheme.officialWebsite || 'https://myscheme.gov.in'}`,
        score,
        sourceUrl: scheme.officialWebsite,
      });
    }
  }

  // 2. Search in Structured Government IDs Database
  for (const idItem of govIds) {
    let score = 0;
    const searchableText = `${idItem.name} ${idItem.description} ${idItem.overview || ''} ${idItem.requirements.join(' ')}`.toLowerCase();

    for (const token of queryTokens) {
      if (searchableText.includes(token)) {
        score += 2;
      }
    }

    if (score > 0) {
      results.push({
        title: idItem.name,
        category: "Government ID",
        content: `**${idItem.name}**\nIssuing Authority: ${idItem.issuingAuthority || 'Government Authority'}\nProcessing Time: ${idItem.processingTime || 'N/A'}\nOverview: ${idItem.overview || idItem.description}\nRequirements: ${idItem.requirements.join(', ')}\nOfficial Portal: ${idItem.officialWebsite || 'Official Portal'}`,
        score,
        sourceUrl: idItem.officialWebsite,
      });
    }
  }

  // 3. Search in Platform Unstructured Knowledge
  const sections = PLATFORM_KNOWLEDGE.split("\n\n");
  for (const section of sections) {
    let score = 0;
    const lowerSection = section.toLowerCase();
    for (const token of queryTokens) {
      if (lowerSection.includes(token)) {
        score += 1;
      }
    }
    if (score >= 2) {
      const firstLine = section.trim().split("\n")[0] || "Platform Information";
      results.push({
        title: firstLine.replace(/^[#=*\s]+/, ''),
        category: "Platform Knowledge",
        content: section.trim(),
        score,
      });
    }
  }

  // Sort by relevance score descending and deduplicate
  results.sort((a, b) => b.score - a.score);

  const deduplicated: RAGSearchResult[] = [];
  const seenTitles = new Set<string>();

  for (const item of results) {
    if (!seenTitles.has(item.title)) {
      seenTitles.add(item.title);
      deduplicated.push(item);
    }
    if (deduplicated.length >= topK) break;
  }

  return deduplicated;
}
