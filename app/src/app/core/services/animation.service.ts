import { Injectable, inject, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─── Types ────────────────────────────────────────────────────────────────────

type Cleanup = () => void;

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly zone = inject(NgZone);

  private initialized       = false;
  private reducedMotion     = false;
  private isTouch           = false;
  private readonly cleanups: Cleanup[] = [];

  // ─── Entry point ───────────────────────────────────────────────────────────

  init(): void {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch       = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    this.zone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Allow Angular's initial render to fully paint before wiring scroll triggers
      requestAnimationFrame(() => {
        this.initNavProgress();
        this.initScrollReveals();

        if (!this.reducedMotion) {
          this.initHeroParallax();
          this.initHeadingReveals();

          if (!this.isTouch) {
            this.initCursorGlow();
            this.initMagneticButtons();
          }
        }
      });
    });
  }

  // ─── Nav scroll-progress bar ───────────────────────────────────────────────
  //
  // A 2px gradient line at the bottom of the fixed nav.
  // GSAP scrubs scaleX 0→1 as the full page scrolls.

  private initNavProgress(): void {
    const bar = document.querySelector<HTMLElement>('.nav__progress-bar');
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25,
      },
    });
  }

  // ─── Scroll reveals ────────────────────────────────────────────────────────
  //
  // Additive to the existing per-component IntersectionObserver system.
  // Adding .is-visible twice is idempotent — no conflict.
  // Benefit: GSAP batch adds a consistent stagger when multiple elements
  // enter the viewport simultaneously (IntersectionObserver fires all at once).

  private initScrollReveals(): void {
    const selector = '.observe-me:not(.is-visible), .reveal:not(.is-visible), .bento-card:not(.is-visible)';

    // Immediately reveal elements already near or inside the viewport
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150) {
        el.classList.add('is-visible', 'visible');
      }
    });

    ScrollTrigger.batch(selector, {
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          setTimeout(() => el.classList.add('is-visible', 'visible'), i * 40);
        });
      },
      start: 'top 92%',
      once: true,
    });
  }

  // ─── Hero background parallax ──────────────────────────────────────────────
  //
  // Moves the perspective grid and network canvas at different rates as the
  // hero scrolls out of view — layering depth without touching the orbs
  // (which have their own CSS custom-property hover parallax via --mx/--my).

  private initHeroParallax(): void {
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!hero) return;

    const grid   = hero.querySelector<HTMLElement>('.hero__grid');
    const canvas = hero.querySelector<HTMLElement>('.hero__canvas');

    const base = {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.7,
    };

    if (grid) {
      gsap.to(grid, { y: -100, ease: 'none', scrollTrigger: base });
    }

    if (canvas) {
      gsap.to(canvas, {
        y: -60,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: base,
      });
    }
  }

  // ─── Heading reveals ───────────────────────────────────────────────────────
  //
  // MutationObserver watches for .is-visible being added to .observe-me
  // containers, then fires a GSAP slide-up on the first heading inside.
  // The heading has no individual CSS transition, so there is no conflict
  // with the parent container's opacity + translateY CSS transition.

  private initHeadingReveals(): void {
    const mo = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        if (mut.attributeName !== 'class') continue;
        const container = mut.target as HTMLElement;
        if (!container.classList.contains('is-visible')) continue;

        const heading = container.querySelector<HTMLElement>('h1, h2');
        if (!heading || heading.dataset['gsapRevealed']) continue;
        heading.dataset['gsapRevealed'] = '1';

        // Slide up from slightly below while parent fades in
        gsap.from(heading, {
          y: 22,
          duration: 0.85,
          ease: 'power3.out',
          delay: 0.08,
          clearProps: 'transform',
        });
      }
    });

    document.querySelectorAll('.observe-me').forEach((el) =>
      mo.observe(el, { attributes: true, attributeFilter: ['class'] })
    );

    this.cleanups.push(() => mo.disconnect());
  }

  // ─── Cursor glow ───────────────────────────────────────────────────────────
  //
  // A soft radial-gradient spotlight that follows the cursor with a smooth lag.
  // Grows slightly when hovering interactive elements.
  // Fades out on mouse leave; completely absent on touch devices.

  private initCursorGlow(): void {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    // Start offscreen
    gsap.set(glow, { x: -600, y: -600, opacity: 0 });

    // quickTo: position updates each frame, but eased — feels like liquid
    const xTo = gsap.quickTo(glow, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.55, ease: 'power3.out' });

    let visible = false;

    const onMove = (e: MouseEvent): void => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to(glow, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    };

    // Grow over interactive targets
    const onOver = (e: MouseEvent): void => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, [data-magnetic]')) {
        gsap.to(glow, { scale: 1.6, duration: 0.35, ease: 'power2.out' });
      }
    };

    const onOut = (e: MouseEvent): void => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, [data-magnetic]')) {
        gsap.to(glow, { scale: 1, duration: 0.4, ease: 'power2.out' });
      }
    };

    const onLeave = (): void => {
      visible = false;
      gsap.to(glow, { opacity: 0, duration: 0.6 });
    };

    document.addEventListener('mousemove',   onMove,  { passive: true });
    document.addEventListener('mouseover',   onOver,  { passive: true });
    document.addEventListener('mouseout',    onOut,   { passive: true });
    document.addEventListener('mouseleave',  onLeave, { passive: true });

    this.cleanups.push(() => {
      glow.remove();
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mouseleave', onLeave);
    });
  }

  // ─── Magnetic buttons ──────────────────────────────────────────────────────
  //
  // Elements with [data-magnetic] pull toward the cursor on hover.
  // Strength defaults to 0.28; override per-element with data-magnetic-strength.
  // On leave: elastic snap-back gives a satisfying spring feel.

  private initMagneticButtons(): void {
    const targets = document.querySelectorAll<HTMLElement>('[data-magnetic]');

    targets.forEach((el) => {
      const strength = parseFloat(el.dataset['magneticStrength'] ?? '0.28');

      const onMove = (e: MouseEvent): void => {
        const r  = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        gsap.to(el, {
          x: (e.clientX - cx) * strength,
          y: (e.clientY - cy) * strength,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const onLeave = (): void => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.75,
          ease: 'elastic.out(1, 0.35)',
          overwrite: 'auto',
        });
      };

      el.addEventListener('mousemove',  onMove);
      el.addEventListener('mouseleave', onLeave);

      this.cleanups.push(() => {
        el.removeEventListener('mousemove',  onMove);
        el.removeEventListener('mouseleave', onLeave);
        gsap.killTweensOf(el);
      });
    });
  }

  // ─── Teardown ──────────────────────────────────────────────────────────────

  destroy(): void {
    this.cleanups.forEach((fn) => fn());
    this.cleanups.length = 0;
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
