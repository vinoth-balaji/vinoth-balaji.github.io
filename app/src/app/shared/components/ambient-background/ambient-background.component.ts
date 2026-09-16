import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
  inject,
} from '@angular/core';

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  phase: number;
}

/**
 * Single fixed full-viewport canvas + orbs shared by the whole app.
 * Because it is one continuous layer (not re-created per section), scrolling
 * never reveals a seam between sections — there is only one background.
 */
@Component({
  selector: 'app-ambient-background',
  standalone: true,
  templateUrl: './ambient-background.component.html',
  styleUrl: './ambient-background.component.scss',
})
export class AmbientBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('netCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  private ctx!: CanvasRenderingContext2D;
  private nodes: NetNode[] = [];
  private rafId?: number;
  private mouseX = 0;
  private mouseY = 0;
  private resizeFn?: () => void;
  private moveFn?: (e: MouseEvent) => void;

  ngAfterViewInit(): void {
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.zone.runOutsideAngular(() => {
      this.initCanvas();
      this.watchMouse();
      this.startLoop();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeFn) window.removeEventListener('resize', this.resizeFn);
    if (this.moveFn) document.removeEventListener('mousemove', this.moveFn);
  }

  private initCanvas(): void {
    const c = this.canvasRef.nativeElement;
    this.ctx = c.getContext('2d')!;
    this.resize();
    this.seed();
    this.resizeFn = () => { this.resize(); this.seed(); };
    window.addEventListener('resize', this.resizeFn, { passive: true });
  }

  private resize(): void {
    const c = this.canvasRef.nativeElement;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }

  private seed(): void {
    const c = this.canvasRef.nativeElement;
    const count = Math.min(Math.floor((c.width * c.height) / 9000), 95);

    const palette: [number, number, number][] = [
      [59, 130, 246],
      [34, 211, 238],
      [139, 92, 246],
      [96, 165, 250],
    ];

    this.nodes = Array.from({ length: count }, () => {
      const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        baseR: Math.random() * 1.5 + 0.7,
        r, g, b,
        alpha: Math.random() * 0.45 + 0.25,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }

  private watchMouse(): void {
    this.moveFn = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };
    document.addEventListener('mousemove', this.moveFn, { passive: true });
  }

  private startLoop(): void {
    const tick = () => { this.draw(); this.rafId = requestAnimationFrame(tick); };
    this.rafId = requestAnimationFrame(tick);
  }

  private draw(): void {
    const c = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    const mx = this.mouseX;
    const my = this.mouseY;

    ctx.clearRect(0, 0, c.width, c.height);

    const CONN = 165;
    const M_INF = 200;

    for (const n of this.nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.phase += 0.014;
      if (n.x < 0 || n.x > c.width) n.vx *= -1;
      if (n.y < 0 || n.y > c.height) n.vy *= -1;
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > CONN) continue;

        const midX = (a.x + b.x) * 0.5;
        const midY = (a.y + b.y) * 0.5;
        const md = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
        const mb = Math.max(0, 1 - md / M_INF);

        const baseA = (1 - d / CONN) * 0.09;
        const alpha = Math.min(baseA + mb * 0.28, 0.75);
        const lr = Math.round(59 + mb * (34 - 59));
        const lg = Math.round(130 + mb * (211 - 130));
        const lb = Math.round(246 + mb * (238 - 246));

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha})`;
        ctx.lineWidth = mb > 0.25 ? 0.7 : 0.4;
        ctx.stroke();
      }
    }

    for (const n of this.nodes) {
      const md = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
      const mb = Math.max(0, 1 - md / 160);
      const pulse = Math.sin(n.phase) * 0.06;
      const rad = n.baseR * (1 + mb * 1.1);
      const alp = Math.min(n.alpha + mb * 0.55 + pulse, 0.9);

      if (mb > 0.25) {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad * 5);
        grd.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${mb * 0.15})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.r},${n.g},${n.b},${alp})`;
      ctx.fill();
    }
  }
}
