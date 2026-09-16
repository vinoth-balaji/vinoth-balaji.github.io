import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  KNOWLEDGE_BASE,
  FALLBACK_INTENT,
  KnowledgeIntent,
  AiSource,
} from '../data/knowledge-base';

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: readonly AiSource[];
  timestamp: Date;
}

export interface AiResponse {
  text: string;
  sources?: readonly AiSource[];
}

// ─── Provider interface ───────────────────────────────────────────────────────
// Swap the implementation below with OpenAiProvider / AzureOpenAiProvider later.
// The query signature (prompt + history) matches what an LLM API expects.

export interface AiProvider {
  query(prompt: string, history: AiMessage[]): Observable<AiResponse>;
}

// ─── Local knowledge-base provider ───────────────────────────────────────────

class LocalKnowledgeProvider implements AiProvider {
  query(prompt: string): Observable<AiResponse> {
    const normalized = prompt.toLowerCase().trim();
    const scored = KNOWLEDGE_BASE.map((intent: KnowledgeIntent) => ({
      intent,
      // Longer trigger phrases score higher (more specific matches win)
      score: intent.triggers.reduce(
        (acc: number, t: string) =>
          acc + (normalized.includes(t.toLowerCase()) ? Math.ceil(t.length / 4) : 0),
        0
      ),
    }));

    const best = scored.sort((a, b) => b.score - a.score)[0];
    const matched = best.score > 0 ? best.intent : FALLBACK_INTENT;

    // Simulate a realistic "thinking" delay (800ms – 1.4s)
    const delay = 800 + Math.random() * 600;

    return timer(delay).pipe(
      map(() => ({
        text: matched.response,
        sources: matched.sources,
      }))
    );
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AiKnowledgeService {
  // Swap this provider to plug in an LLM API
  private readonly provider: AiProvider = new LocalKnowledgeProvider();

  query(prompt: string, history: AiMessage[] = []): Observable<AiResponse> {
    return this.provider.query(prompt, history);
  }

  newMessage(role: 'user' | 'assistant', text: string, sources?: readonly AiSource[]): AiMessage {
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role,
      text,
      sources,
      timestamp: new Date(),
    };
  }
}
