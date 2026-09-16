import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  signal,
  computed,
  effect,
} from '@angular/core';

export interface HighlightSegment {
  char: string;
  matched: boolean;
}

interface RawCommand {
  id: string;
  label: string;
  hint?: string;
  iconName: string;
  category: 'Navigate' | 'Projects' | 'Social' | 'Actions';
  keywords?: string;
  action: () => void;
}

export interface DisplayCommand {
  id: string;
  label: string;
  hint?: string;
  iconName: string;
  category: string;
  segments: HighlightSegment[];
  flatIndex: number;
  action: () => void;
}

export interface CommandGroup {
  category: string;
  commands: DisplayCommand[];
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
})
export class CommandPaletteComponent {
  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('listbox') listboxRef?: ElementRef<HTMLDivElement>;

  readonly isOpen = signal(false);
  readonly query = signal('');
  readonly selectedIndex = signal(0);

  private readonly categoryOrder: RawCommand['category'][] = [
    'Navigate',
    'Projects',
    'Social',
    'Actions',
  ];

  private readonly rawCommands: RawCommand[] = [
    {
      id: 'about',
      label: 'About Vinoth',
      hint: 'About',
      iconName: 'user',
      category: 'Navigate',
      keywords: 'profile background experience',
      action: () => this.scrollToSection('about'),
    },
    {
      id: 'proj-aviation',
      label: 'View Aviation',
      hint: 'Projects',
      iconName: 'grid',
      category: 'Projects',
      keywords: 'airline flight booking enterprise angular',
      action: () => this.goToProject(0),
    },
    {
      id: 'proj-pricing',
      label: 'View Pricing',
      hint: 'Projects',
      iconName: 'grid',
      category: 'Projects',
      keywords: 'pricing analytics revenue optimization',
      action: () => this.goToProject(1),
    },
    {
      id: 'proj-var',
      label: 'View VaR',
      hint: 'Projects',
      iconName: 'grid',
      category: 'Projects',
      keywords: 'risk value at risk financial analytics',
      action: () => this.goToProject(3),
    },
    {
      id: 'proj-myops',
      label: 'View MyOps',
      hint: 'Projects',
      iconName: 'grid',
      category: 'Projects',
      keywords: 'operations platform myops dashboard',
      action: () => this.goToProject(4),
    },
    {
      id: 'ai',
      label: 'Ask Vinoth AI',
      hint: 'AI Copilot',
      iconName: 'ai',
      category: 'Navigate',
      keywords: 'chat copilot assistant question ask',
      action: () => this.scrollToSection('ai-copilot'),
    },
    {
      id: 'contact',
      label: 'Contact Vinoth',
      hint: 'Contact',
      iconName: 'mail',
      category: 'Navigate',
      keywords: 'email hire connect reach out',
      action: () => this.scrollToSection('contact'),
    },
    {
      id: 'github',
      label: 'View GitHub',
      hint: '↗ github.com',
      iconName: 'github',
      category: 'Social',
      keywords: 'code repos open source',
      action: () => window.open('https://github.com/vinoth-balaji', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'linkedin',
      label: 'View LinkedIn',
      hint: '↗ linkedin.com',
      iconName: 'linkedin',
      category: 'Social',
      keywords: 'profile career network professional',
      action: () => window.open('https://linkedin.com/in/vinothbalaji', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'resume',
      label: 'Download Resume',
      hint: 'PDF',
      iconName: 'download',
      category: 'Actions',
      keywords: 'cv curriculum vitae pdf download',
      action: () => this.downloadResume(),
    },
    {
      id: 'theme',
      label: 'Toggle Theme',
      hint: 'Dark / Light',
      iconName: 'palette',
      category: 'Actions',
      keywords: 'dark light mode appearance color',
      action: () => this.toggleTheme(),
    },
  ];

  readonly filteredGroups = computed<CommandGroup[]>(() => {
    const q = this.query().trim();
    let flatIndex = 0;

    const matched = this.rawCommands
      .filter(cmd => this.fuzzyMatch(q, `${cmd.label} ${cmd.keywords ?? ''}`))
      .map(cmd => ({
        ...cmd,
        segments: this.buildSegments(q, cmd.label),
        score: this.fuzzyScore(q, cmd.label),
      }))
      .sort((a, b) => b.score - a.score);

    const buckets = new Map<string, (typeof matched)>();
    this.categoryOrder.forEach(c => buckets.set(c, []));
    matched.forEach(cmd => buckets.get(cmd.category as RawCommand['category'])?.push(cmd));

    const groups: CommandGroup[] = [];
    for (const [category, cmds] of buckets) {
      if (!cmds.length) continue;
      groups.push({
        category,
        commands: cmds.map(cmd => ({ ...cmd, flatIndex: flatIndex++ })),
      });
    }
    return groups;
  });

  readonly flatFiltered = computed<DisplayCommand[]>(() =>
    this.filteredGroups().flatMap(g => g.commands)
  );

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => this.searchInputRef?.nativeElement.focus(), 50);
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.toggle();
    }
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    this.query.set('');
    this.selectedIndex.set(0);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  onInput(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
    this.selectedIndex.set(0);
  }

  onSearchKeydown(e: KeyboardEvent): void {
    const flat = this.flatFiltered();
    const sel = this.selectedIndex();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.selectedIndex.set(Math.min(sel + 1, flat.length - 1));
        this.scrollItemIntoView(this.selectedIndex());
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.selectedIndex.set(Math.max(sel - 1, 0));
        this.scrollItemIntoView(this.selectedIndex());
        break;
      case 'Enter':
        e.preventDefault();
        this.execute(flat[sel]);
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  execute(cmd: DisplayCommand | undefined): void {
    if (!cmd) return;
    this.close();
    setTimeout(() => cmd.action(), 80);
  }

  hover(index: number): void {
    this.selectedIndex.set(index);
  }

  isSelected(flatIndex: number): boolean {
    return this.selectedIndex() === flatIndex;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private fuzzyMatch(query: string, text: string): boolean {
    if (!query) return true;
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    let qi = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) qi++;
    }
    return qi === q.length;
  }

  private fuzzyScore(query: string, text: string): number {
    if (!query) return 0;
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    if (t.startsWith(q)) return 100;
    if (t.includes(q)) return 80;
    return 50;
  }

  private buildSegments(query: string, text: string): HighlightSegment[] {
    if (!query) return text.split('').map(char => ({ char, matched: false }));
    const q = query.toLowerCase();
    const result: HighlightSegment[] = [];
    let qi = 0;
    for (let i = 0; i < text.length; i++) {
      const matched = qi < q.length && text[i].toLowerCase() === q[qi];
      if (matched) qi++;
      result.push({ char: text[i], matched });
    }
    return result;
  }

  private scrollItemIntoView(index: number): void {
    setTimeout(() => {
      const el = this.listboxRef?.nativeElement.querySelector<HTMLElement>(
        `[data-index="${index}"]`
      );
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  private scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  private goToProject(index: number): void {
    this.scrollToSection('projects');
    setTimeout(() => {
      const pips = document.querySelectorAll<HTMLButtonElement>('.proj-pip');
      pips[index]?.click();
    }, 700);
  }

  private downloadResume(): void {
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Vinoth_Balaji_Resume.pdf';
    a.click();
  }

  private toggleTheme(): void {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  }
}
