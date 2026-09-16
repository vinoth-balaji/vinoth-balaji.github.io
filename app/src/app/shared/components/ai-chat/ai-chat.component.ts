import {
  Component,
  Input,
  OnDestroy,
  signal,
  computed,
  inject,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AiKnowledgeService, AiMessage, AiResponse } from '../../../core/services/ai-knowledge.service';
import { SUGGESTED_PROMPTS } from '../../../core/data/knowledge-base';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
})
export class AiChatComponent implements OnDestroy {
  // compact = true → used inside the floating widget (tighter layout)
  @Input() compact = false;

  @ViewChild('msgList')  private msgListRef?: ElementRef<HTMLElement>;
  @ViewChild('inputEl') private inputRef?: ElementRef<HTMLInputElement>;

  private readonly ai     = inject(AiKnowledgeService);
  private readonly san    = inject(DomSanitizer);
  private readonly zone   = inject(NgZone);
  private subscription?: Subscription;

  readonly messages   = signal<AiMessage[]>([]);
  readonly isTyping   = signal(false);
  readonly inputText  = signal('');
  readonly isFullscreen = signal(false);

  // Hide suggestions once conversation starts
  readonly showSuggestions = computed(() => this.messages().length === 0);

  readonly suggestions = SUGGESTED_PROMPTS;

  // ─── Send ─────────────────────────────────────────────────────────────────

  send(text = this.inputText().trim()): void {
    if (!text || this.isTyping()) return;

    this.inputText.set('');
    this.messages.update(m => [...m, this.ai.newMessage('user', text)]);
    this.isTyping.set(true);
    this.scrollToBottom();

    this.subscription = this.ai.query(text, this.messages()).subscribe({
      next: (res: AiResponse) => {
        this.zone.run(() => {
          this.isTyping.set(false);
          this.messages.update(m => [
            ...m,
            this.ai.newMessage('assistant', res.text, res.sources),
          ]);
          this.scrollToBottom(true);
        });
      },
      error: () => {
        this.zone.run(() => {
          this.isTyping.set(false);
          this.messages.update(m => [
            ...m,
            this.ai.newMessage('assistant', "I couldn't process that right now. Try rephrasing your question."),
          ]);
        });
      },
    });
  }

  usePrompt(prompt: string): void {
    this.send(prompt);
    this.inputRef?.nativeElement.focus();
  }

  clearChat(): void {
    this.messages.set([]);
    this.isTyping.set(false);
    this.subscription?.unsubscribe();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  toggleFullscreen(): void {
    this.isFullscreen.update(v => !v);
    // Scroll to bottom after layout settles
    setTimeout(() => this.scrollToBottom(), 80);
  }

  scrollToSourceSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (this.isFullscreen()) this.isFullscreen.set(false);
  }

  // ─── Markdown rendering ───────────────────────────────────────────────────
  // Safe: content comes from our controlled knowledge base only.

  renderMarkdown(text: string): SafeHtml {
    let html = text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Inline code
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      // Unordered list items
      .replace(/^- (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> elements into <ul>
    html = html.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, m => `<ul>${m}</ul>`);

    // Paragraph breaks (double newline) then single breaks
    html = html
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    return this.san.bypassSecurityTrustHtml(`<p>${html}</p>`);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ─── Scroll ───────────────────────────────────────────────────────────────

  private scrollToBottom(smooth = false): void {
    setTimeout(() => {
      const el = this.msgListRef?.nativeElement;
      if (!el) return;
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
    }, 30);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
