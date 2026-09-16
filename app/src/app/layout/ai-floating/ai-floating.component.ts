import { Component, signal, HostListener } from '@angular/core';
import { AiChatComponent } from '../../shared/components/ai-chat/ai-chat.component';

@Component({
  selector: 'app-ai-floating',
  standalone: true,
  imports: [AiChatComponent],
  templateUrl: './ai-floating.component.html',
  styleUrl: './ai-floating.component.scss',
})
export class AiFloatingComponent {
  readonly isOpen = signal(false);
  readonly hasOpened = signal(false);

  toggle(): void {
    if (!this.hasOpened()) this.hasOpened.set(true);
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) this.isOpen.set(false);
  }
}
