import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLink } from '../../core/models/content.models';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  readonly navLinks: NavLink[] = [
    { label: 'About',        sectionId: 'about' },
    { label: 'Impact',       sectionId: 'metrics' },
    { label: 'Projects',     sectionId: 'projects' },
    { label: 'Capabilities', sectionId: 'capabilities' },
    { label: 'Leadership',   sectionId: 'leadership' },
    { label: 'Journey',      sectionId: 'journey' },
    { label: 'AI Copilot',   sectionId: 'ai-copilot' },
    { label: 'Contact',      sectionId: 'contact' },
  ];

  readonly mobileNavLinks: NavLink[] = [
    { label: 'About',        sectionId: 'about' },
    { label: 'Projects',     sectionId: 'projects' },
    { label: 'Capabilities', sectionId: 'capabilities' },
    { label: 'Leadership',   sectionId: 'leadership' },
    { label: 'AI Copilot',   sectionId: 'ai-copilot' },
    { label: 'Contact',      sectionId: 'contact' },
  ];

  isScrolled    = signal(false);
  isMobileOpen  = signal(false);
  activeSection = signal('hero');

  private observer?: IntersectionObserver;
  private focusTrapHandler?: (e: KeyboardEvent) => void;
  private lastFocusedElement?: HTMLElement;

  ngOnInit(): void {
    this.setupScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.releaseFocusTrap();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 24);
  }

  toggleMobileMenu(): void {
    const wasOpen = this.isMobileOpen();
    this.isMobileOpen.update(v => !v);
    if (!wasOpen) {
      this.lastFocusedElement = document.activeElement as HTMLElement;
      setTimeout(() => this.trapFocusInPanel(), 300);
    } else {
      this.releaseFocusTrap();
    }
  }

  closeMobileMenu(): void {
    this.isMobileOpen.set(false);
    this.releaseFocusTrap();
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    this.closeMobileMenu();
  }

  isActive(sectionId: string): boolean {
    return this.activeSection() === sectionId;
  }

  private trapFocusInPanel(): void {
    const panel = document.querySelector<HTMLElement>('.mobile-menu__panel');
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusable.length) focusable[0].focus();

    this.focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', this.focusTrapHandler);
  }

  private releaseFocusTrap(): void {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = undefined;
    }
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = undefined;
  }

  private setupScrollSpy(): void {
    const sectionIds = ['hero', ...this.navLinks.map(l => l.sectionId)];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    elements.forEach(el => this.observer!.observe(el));
  }
}
