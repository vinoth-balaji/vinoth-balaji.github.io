import { Component, AfterViewInit, OnDestroy, ElementRef, inject, NgZone } from '@angular/core';
import { AiChatComponent } from '../../shared/components/ai-chat/ai-chat.component';

@Component({
  selector: 'app-ai-copilot',
  standalone: true,
  imports: [AiChatComponent],
  templateUrl: './ai-copilot.component.html',
  styleUrl: './ai-copilot.component.scss',
})
export class AiCopilotComponent implements AfterViewInit, OnDestroy {
  private readonly el   = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  readonly knowledgeTags = [
    'Aviation', 'Pricing', 'CDP', 'VaR Risk', 'MyOps',
    'Angular', 'Python', 'Azure', 'Databricks', 'Gen AI',
    'Leadership', 'Architecture',
  ];

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible', 'visible');
              this.observer?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '100px 0px 50px 0px' }
      );
      this.el.nativeElement.querySelectorAll('.observe-me').forEach((n: Element) =>
        this.observer?.observe(n)
      );
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
