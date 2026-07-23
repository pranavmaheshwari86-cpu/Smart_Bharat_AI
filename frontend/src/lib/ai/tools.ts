/**
 * Smart Bharat AI — Tool Selection & Execution Engine
 */

import { ToolExecutionResult, IntentClassification } from "./types";
import { schemes, govIds } from "@/lib/data";

export function executeTools(intent: IntentClassification, userQuery: string): ToolExecutionResult[] {
  const results: ToolExecutionResult[] = [];

  for (const toolName of intent.suggestedTools) {
    if (toolName === "farmer_scheme_matcher") {
      const farmerSchemes = schemes.filter((s) => s.category.toLowerCase() === "farmers");
      results.push({
        toolName: "farmer_scheme_matcher",
        success: true,
        output: {
          matchedCount: farmerSchemes.length,
          schemes: farmerSchemes.map((s) => ({ id: s.id, name: s.name, benefit: s.financialBenefits })),
        },
      });
    }

    if (toolName === "student_scheme_matcher") {
      const studentSchemes = schemes.filter((s) => s.category.toLowerCase() === "students");
      results.push({
        toolName: "student_scheme_matcher",
        success: true,
        output: {
          matchedCount: studentSchemes.length,
          schemes: studentSchemes.map((s) => ({ id: s.id, name: s.name, benefit: s.financialBenefits || s.description })),
        },
      });
    }

    if (toolName === "id_requirement_checker") {
      const queryLower = userQuery.toLowerCase();
      const matchedId = govIds.find((id) => queryLower.includes(id.name.toLowerCase()) || queryLower.includes(id.id.toLowerCase()));
      if (matchedId) {
        results.push({
          toolName: "id_requirement_checker",
          success: true,
          output: {
            idName: matchedId.name,
            requirements: matchedId.requirements,
            authority: matchedId.issuingAuthority,
            fees: matchedId.fees,
          },
        });
      }
    }
  }

  return results;
}
