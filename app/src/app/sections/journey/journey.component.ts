import { Component, AfterViewInit, OnDestroy, signal, inject, ElementRef, NgZone } from '@angular/core';

interface CareerStage {
  readonly id: string;
  readonly year: string;
  readonly role: string;
  readonly phase: string;
  readonly phaseShort: string;
  readonly accent: 'slate' | 'blue' | 'cyan' | 'violet';
  readonly achievements: readonly string[];
  readonly isCurrent: boolean;
}

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent implements AfterViewInit, OnDestroy {
  private readonly el   = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  readonly activeStage = signal<string | null>(null);

  readonly stages: readonly CareerStage[] = [
    {
      id: 'programmer',
      year: '2017',
      role: 'Programmer',
      phase: 'Frontend Engineering',
      phaseShort: 'Frontend',
      accent: 'slate',
      achievements: [
        'Reduced application initial load time by 70% through bundle and render-path optimization',
        'Built reusable large-dataset visualization frameworks',
      ],
      isCurrent: false,
    },
    {
      id: 'senior',
      year: '2020',
      role: 'Senior Programmer',
      phase: 'Full-Stack Platform Engineering',
      phaseShort: 'Full-Stack',
      accent: 'blue',
      achievements: [
        'Led architecture migration from jQuery to modern MEAN stack',
        'Implemented Azure AD SSO with JWT/OAuth; built WebSocket + Redis real-time features',
      ],
      isCurrent: false,
    },
    {
      id: 'atl',
      year: '2022',
      role: 'Associate Technical Lead',
      phase: 'Technical Leadership',
      phaseShort: 'Tech Lead',
      accent: 'blue',
      achievements: [
        'Led cross-functional team on VaR Risk Analytics & Scenario Platform',
        'Took direct ownership of client relationships and end-to-end delivery',
      ],
      isCurrent: false,
    },
    {
      id: 'am',
      year: '2023',
      role: 'Associate Manager',
      phase: 'Enterprise AI & Architecture',
      phaseShort: 'AI & Arch',
      accent: 'cyan',
      achievements: [
        'Delivered Aviation Commercial Platform with GenAI AI Copilot — RAG + LangGraph in production',
        'Began mentoring engineers into independent owners with direct client access',
      ],
      isCurrent: false,
    },
    {
      id: 'tl',
      year: '2025+',
      role: 'Technical Lead',
      roleAlt: 'Associate Manager',
      phase: 'Team & Client Leadership',
      phaseShort: 'Leadership',
      accent: 'violet',
      achievements: [
        '5 enterprise products across Aviation, BFSI, and Retail — AI Copilots, Analytics, Risk, Operations',
        'Mentoring 30+ engineers into independent owners while actively managing a 10+ engineer team',
      ],
      isCurrent: true,
    } as CareerStage & { roleAlt: string },
  ] as const;

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

  setActive(id: string): void {
    this.zone.run(() => this.activeStage.set(id));
  }

  clearActive(): void {
    this.zone.run(() => this.activeStage.set(null));
  }

  toggleActive(id: string): void {
    this.zone.run(() => {
      const s = this.stages.find(s => s.id === id);
      if (s?.isCurrent) return;
      this.activeStage.update(cur => cur === id ? null : id);
    });
  }

  isActive(id: string): boolean {
    return this.activeStage() === id;
  }
}
