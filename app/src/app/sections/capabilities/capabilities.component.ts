import {
  Component,
  signal,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
} from '@angular/core';

interface CapGroup {
  id: string;
  label: string;
  description: string;
  accent: 'blue' | 'cyan' | 'violet' | 'slate' | 'brand';
  items: string[];
}

@Component({
  selector: 'app-capabilities',
  standalone: true,
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.scss',
})
export class CapabilitiesComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  readonly hoveredGroup = signal<string | null>(null);

  // Which groups light up when a given group is focused
  private readonly relations: Record<string, string[]> = {
    engineering: ['data', 'ai', 'cloud'],
    ai:          ['engineering', 'data', 'cloud'],
    data:        ['engineering', 'ai'],
    cloud:       ['engineering', 'ai'],
    leadership:  ['engineering', 'ai', 'data', 'cloud'],
  };

  readonly groups: CapGroup[] = [
    {
      id: 'engineering',
      label: 'Engineering',
      description: 'Full-stack across frontend, backend, APIs, and database layers.',
      accent: 'blue',
      items: [
        'Angular', 'TypeScript', 'Python', 'FastAPI',
        'Node.js', 'Django', 'REST APIs', 'PostgreSQL', 'SQL', 'Redis',
      ],
    },
    {
      id: 'ai',
      label: 'Artificial Intelligence',
      description: 'From LLM orchestration and RAG to production agentic systems.',
      accent: 'violet',
      items: [
        'Generative AI', 'Large Language Models', 'Agentic AI',
        'LangGraph', 'AI-Assisted Engineering', 'Conversational Analytics', 'Semantic Search',
      ],
    },
    {
      id: 'data',
      label: 'Data & Analytics',
      description: 'Enterprise analytics, risk visualization, and large-scale data pipelines.',
      accent: 'cyan',
      items: [
        'Databricks', 'Highcharts', 'Power BI',
        'Enterprise Analytics', 'Financial / Risk Analytics', 'Large Data Visualization',
      ],
    },
    {
      id: 'cloud',
      label: 'Cloud & Enterprise',
      description: 'Azure-native deployments, identity management, and enterprise integrations.',
      accent: 'slate',
      items: [
        'Microsoft Azure', 'Microsoft Entra ID',
        'SSO / RBAC', 'Enterprise Integrations', 'SAP Integration',
      ],
    },
    {
      id: 'leadership',
      label: 'Leadership',
      description: 'From blank-canvas architecture to cross-functional delivery and client partnership.',
      accent: 'brand',
      items: [
        'Solution Architecture', 'Technical Leadership',
        'Client Engagement', 'Mentoring', 'Stakeholder Management', 'End-to-End Delivery',
      ],
    },
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
      this.el.nativeElement.querySelectorAll('.observe-me, .cap-group').forEach((n: Element) =>
        this.observer?.observe(n)
      );
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  getGroupClass(id: string): string {
    const h = this.hoveredGroup();
    const base = `cap-group cap-group--${id}`;
    if (!h) return base;
    if (h === id) return `${base} cap-group--active`;
    if (this.relations[h]?.includes(id)) return `${base} cap-group--related`;
    return `${base} cap-group--dim`;
  }
}
