import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
  ViewChild,
} from '@angular/core';

interface ProgStage {
  id: string;
  label: string;
  descriptor: string;
}

interface Principle {
  text: string;
}

@Component({
  selector: 'app-leadership',
  standalone: true,
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.scss',
})
export class LeadershipComponent implements AfterViewInit, OnDestroy {
  @ViewChild('progTrack') private progRef!: ElementRef<HTMLElement>;

  private readonly zone = inject(NgZone);
  private readonly el   = inject(ElementRef);
  private observer?: IntersectionObserver;

  readonly stages: ProgStage[] = [
    {
      id: 'developer',
      label: 'Developer',
      descriptor: 'Executes tasks. Writes good code.',
    },
    {
      id: 'owner',
      label: 'Feature Owner',
      descriptor: 'Drives end-to-end. Understands the "why".',
    },
    {
      id: 'client',
      label: 'Client Partner',
      descriptor: 'Communicates. Challenges. Accountable.',
    },
    {
      id: 'leader',
      label: 'Technical Leader',
      descriptor: 'Architects. Mentors. Sets the standard.',
    },
  ];

  readonly principles: Principle[] = [
    { text: 'Own features independently — from requirements to production' },
    { text: 'Understand the business context behind every technical decision' },
    { text: 'Speak directly and confidently with clients' },
    { text: 'Ask questions instead of making assumptions' },
    { text: 'Explain technical decisions clearly to non-technical stakeholders' },
    { text: 'Manage expectations proactively, not retroactively' },
    { text: 'Respectfully challenge requirements when there is a better approach' },
    { text: 'Take full accountability for outcomes, not just effort' },
    { text: 'Eventually mentor others and pass the pattern forward' },
  ];

  readonly aiTags = [
    'Code Generation',
    'AI-Assisted Debugging',
    'Requirements Analysis',
    'Test Coverage',
    'Delivery Acceleration',
  ];

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

      const targets = Array.from(
        this.el.nativeElement.querySelectorAll('.observe-me') as NodeListOf<Element>
      );
      targets.forEach((t: Element) => this.observer!.observe(t));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
