import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-metrics',
  standalone: true,
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
})
export class MetricsComponent implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly el   = inject(ElementRef);
  private observer?: IntersectionObserver;

  readonly products = ['Aviation', 'Pricing', 'CDP', 'VaR', 'MyOps'];

  readonly aiTags = ['Generative AI', 'Agentic AI', 'RAG', 'Copilots', 'LLM Orchestration'];

  readonly pipeline = [
    'Frontend', 'APIs', 'Data', 'AI', 'Cloud', 'Production',
  ];

  // 8 dots for the year timeline
  readonly yearDots = Array.from({ length: 8 }, (_, i) => i);

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible', 'visible');
              this.observer!.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.05, rootMargin: '100px 0px 50px 0px' }
      );

      const items = Array.from(
        this.el.nativeElement.querySelectorAll('.bento-card, .impact__header, .impact__stats, .reveal') as NodeListOf<Element>
      );
      items.forEach((c: Element) => this.observer!.observe(c));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
