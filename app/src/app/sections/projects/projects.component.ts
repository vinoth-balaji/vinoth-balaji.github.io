import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
  ViewChild,
  signal,
} from '@angular/core';

interface Project {
  id: string;
  number: string;
  name: string;
  industry: string;
  year: string;
  scale: string;
  problem: string;
  led: string;
  challenges: string[];
  impact: string;
  tech: string[];
  accent: 'blue' | 'cyan' | 'violet' | 'amber' | 'green';
  visual: 'aviation' | 'pricing' | 'cdp' | 'var' | 'myops';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('trackWrapper') private wrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('slider') private sliderRef!: ElementRef<HTMLElement>;

  private readonly zone = inject(NgZone);
  private readonly el = inject(ElementRef);
  private scrollFn?: EventListener;
  private resizeFn?: EventListener;
  private resizeObserver?: ResizeObserver;
  private travel = 0;

  readonly activeIndex = signal(0);

  readonly projects: Project[] = [
    {
      id: 'aviation',
      number: '01',
      name: 'Aviation Commercial Platform & AI Copilot',
      industry: 'Aviation · Commercial',
      year: '2023 – 2024',
      scale: 'Fortune 500 Aviation Group',
      problem:
        'A major aviation group operated with no unified commercial platform — RFPs, bids, contracts, and pricing decisions lived in disconnected systems and manual spreadsheets, with no AI layer for high-stakes negotiation intelligence.',
      led: 'Greenfield architecture and cross-functional delivery from blank canvas to production. Defined the technical roadmap, led a 4–5 engineer team, and owned client relationships end-to-end.',
      challenges: [
        'GenAI copilot with RAG over complex contract, bid, and pricing history',
        'Real-time Databricks pipeline for live commercial analytics at scale',
        'Multi-workflow lifecycle state machine: RFP → Bid → Contract',
      ],
      impact:
        'Reduced commercial decision cycle time across the group. AI Copilot replaced offline spreadsheet analysis — surfacing negotiation strategies, bid risk, and airport growth opportunities directly in-workflow.',
      tech: ['Angular', 'Python', 'FastAPI', 'PostgreSQL', 'Databricks', 'Azure', 'Redis', 'Power BI', 'GenAI / RAG'],
      accent: 'blue',
      visual: 'aviation',
    },
    {
      id: 'pricing',
      number: '02',
      name: 'Pricing Analytics Dashboard',
      industry: 'BFSI · Pricing Intelligence',
      year: '2022 – 2023',
      scale: 'Enterprise Financial Services',
      problem:
        'Enterprise pricing data was fragmented across systems. Analysts relied on manual exports and static reports with no unified surface for filtering, custom dashboards, or real-time analytics.',
      led: 'End-to-end product engineering: semantic search architecture, custom dashboard framework, bi-directional filter system, Databricks analytics, SSO, and administration modules.',
      challenges: [
        'Bi-directional filter state with cross-dimension consistency guarantees',
        'Semantic instrument search over large-scale enterprise pricing datasets',
        'User-personalized dashboard layout persistence and sub-second query performance',
      ],
      impact:
        'Self-serve pricing analytics replaced weeks of manual reporting. Semantic search reduced instrument lookup from minutes to seconds — enabling real-time pricing decisions.',
      tech: ['Angular', 'Python', 'Databricks', 'Azure', 'SQL', 'Entra ID', 'Semantic Search', 'REST APIs'],
      accent: 'cyan',
      visual: 'pricing',
    },
    {
      id: 'cdp',
      number: '03',
      name: 'CDP — Excel Plugin & Web Application',
      industry: 'Retail · Data Consumption',
      year: '2022',
      scale: 'Global Retail Enterprise',
      problem:
        'Analysts spent hours manually extracting Databricks datasets into Excel — a brittle, error-prone process that created stale data, version conflicts, and delayed business decisions.',
      led: 'Dual-surface product: a web app for hierarchical dataset discovery and an Office.js Excel plugin for live Databricks data consumption with access-controlled, persistent filter state.',
      challenges: [
        'Office.js plugin lifecycle management within Angular standalone context',
        'Persistent filter and metadata state shared across web and Excel surfaces',
        'Access-controlled dataset exposure with hierarchical permission scoping',
      ],
      impact:
        'Eliminated manual data extraction entirely. Analysts access live Databricks datasets in Excel with one click — reducing prep time from hours to seconds.',
      tech: ['Angular', 'TypeScript', 'Office.js', 'Databricks', 'Python', 'REST APIs', 'Azure'],
      accent: 'violet',
      visual: 'cdp',
    },
    {
      id: 'var',
      number: '04',
      name: 'VaR Risk Analytics & Scenario Platform',
      industry: 'BFSI · Risk Management',
      year: '2021 – 2022',
      scale: 'Tier-1 Financial Institution',
      problem:
        'Risk teams lacked a unified, performant platform for real-time VaR computation, exposure analytics, and scenario modeling. Decisions were made on stale, siloed data.',
      led: 'Risk analytics platform architecture and engineering — multidimensional data modeling, Highcharts performance optimization, UOM validation architecture, and scenario modeling pipeline.',
      challenges: [
        'Highcharts optimization for large multi-series risk datasets without render lag',
        'Multidimensional filter composition across positions, curves, and legs',
        'Scenario modeling with real-time Databricks recalculation pipeline',
      ],
      impact:
        'Real-time risk visibility across positions, curves, and legs. Scenario modeling enabled proactive decisions before market open — replacing a manual overnight batch process.',
      tech: ['Angular', 'Python', 'Databricks', 'SQL', 'Azure', 'Highcharts', 'REST APIs'],
      accent: 'amber',
      visual: 'var',
    },
    {
      id: 'myops',
      number: '05',
      name: 'MyOps — Operational Intelligence Suite',
      industry: 'Aviation · Operations',
      year: '2020 – 2021',
      scale: 'Global Aviation Operations',
      problem:
        'Maintenance and operations teams worked across fragmented tools — work order scheduling, case management, and equipment workflows operated in silos with no unified intelligence layer.',
      led: 'Suite of three interconnected apps — Work Order Visualizer, CATCH (case management), RACE (action management) — unified under a shared Angular design system with SAP data backbone.',
      challenges: [
        'Work-center network visualization for complex maintenance scheduling graphs',
        'SAP real-time integration for work order, equipment, and routing data',
        'Shared state and cross-app context preservation across three applications',
      ],
      impact:
        'Unified operational intelligence replaced 3 fragmented tools — reducing coordination overhead, improving maintenance scheduling accuracy, and eliminating manual SAP data syncing.',
      tech: ['Angular', 'TypeScript', 'SAP Integration', 'REST APIs', 'Azure', 'D3.js'],
      accent: 'green',
      visual: 'myops',
    },
  ];

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.setupScroll();
      this.setupTilt();
    });
  }

  private setupScroll(): void {
    const wrapper = this.wrapperRef.nativeElement;
    const slider = this.sliderRef.nativeElement;
    const n = this.projects.length;

    // Cap how much vertical scroll is needed to traverse the cards — without
    // this, wide sliders (many/large cards) require an excessive amount of
    // scrolling and the section feels frozen instead of scroll-jacked.
    const MAX_TRAVEL_VH = 1.4;

    const updateHeight = () => {
      const rawTravel = Math.max(0, slider.scrollWidth - window.innerWidth);
      this.travel = Math.min(rawTravel, window.innerHeight * MAX_TRAVEL_VH);
      wrapper.style.height = `${window.innerHeight + this.travel}px`;
    };

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperH = wrapper.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const maxScroll = wrapperH - viewH;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
      slider.style.transform = `translateX(${-progress * this.travel}px)`;

      const idx = Math.min(n - 1, Math.floor(progress * n));
      if (idx !== this.activeIndex()) {
        this.zone.run(() => this.activeIndex.set(idx));
      }
    };

    updateHeight();
    this.resizeFn = updateHeight as EventListener;
    this.scrollFn = onScroll as EventListener;
    window.addEventListener('resize', this.resizeFn, { passive: true });
    window.addEventListener('scroll', this.scrollFn, { passive: true });

    // Recalculate once card content settles (fonts/images), without shifting
    // height while the user is already mid-scroll through the section.
    this.resizeObserver = new ResizeObserver(() => {
      const rect = wrapper.getBoundingClientRect();
      const isMidScroll = rect.top < 0 && rect.bottom > window.innerHeight;
      if (!isMidScroll) updateHeight();
    });
    this.resizeObserver.observe(slider);
  }

  private setupTilt(): void {
    const cards = Array.from(
      this.el.nativeElement.querySelectorAll('.pc') as NodeListOf<HTMLElement>
    );

    cards.forEach((card) => {
      const tilt = card.querySelector('.pc__tilt') as HTMLElement | null;
      if (!tilt) return;

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tilt.style.transition = 'transform 0.08s linear';
        tilt.style.transform =
          `perspective(1100px) rotateX(${-y * 5}deg) rotateY(${x * 8}deg) translateZ(6px)`;
      });

      card.addEventListener('mouseleave', () => {
        tilt.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
        tilt.style.transform =
          'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
  }

  scrollToProject(index: number): void {
    const wrapper = this.wrapperRef.nativeElement;
    const slider = this.sliderRef.nativeElement;
    const n = this.projects.length;
    const progress = index / (n - 1);
    const travel = Math.max(0, slider.scrollWidth - window.innerWidth);
    const targetScroll = wrapper.offsetTop + progress * travel;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.scrollFn) window.removeEventListener('scroll', this.scrollFn);
    if (this.resizeFn) window.removeEventListener('resize', this.resizeFn);
    this.resizeObserver?.disconnect();
  }
}
