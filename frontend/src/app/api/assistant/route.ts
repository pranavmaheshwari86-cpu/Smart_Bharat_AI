import { NextRequest, NextResponse } from "next/server";
import { AIOrchestrator } from "@/lib/ai/orchestrator";
import { AIMessage } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages as AIMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array is required" }, { status: 400 });
    }

    const payload = await AIOrchestrator.process(messages);

    return NextResponse.json({
      content: payload.content,
      metadata: {
        intent: payload.intent,
        provider: payload.providerUsed,
        executionTimeMs: payload.executionTimeMs,
        sourcesCount: payload.sources.length,
      },
    });
  } catch (err: any) {
    console.error("AI Orchestrator Execution Error:", err);
    return NextResponse.json(
      { error: err?.message || "AI service temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }
}
