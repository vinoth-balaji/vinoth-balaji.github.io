import { Component, AfterViewInit, HostListener, inject, signal } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { AnimationService } from '../../core/services/animation.service';
import { AmbientBackgroundComponent } from '../../shared/components/ambient-background/ambient-background.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { AboutComponent } from '../../sections/about/about.component';
import { MetricsComponent } from '../../sections/metrics/metrics.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { CapabilitiesComponent } from '../../sections/capabilities/capabilities.component';
import { LeadershipComponent } from '../../sections/leadership/leadership.component';
import { JourneyComponent } from '../../sections/journey/journey.component';
import { AiCopilotComponent } from '../../sections/ai-copilot/ai-copilot.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { AiFloatingComponent } from '../ai-floating/ai-floating.component';
import { CommandPaletteComponent } from '../../shared/components/command-palette/command-palette.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    AmbientBackgroundComponent,
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    MetricsComponent,
    ProjectsComponent,
    CapabilitiesComponent,
    LeadershipComponent,
    JourneyComponent,
    AiCopilotComponent,
    ContactComponent,
    AiFloatingComponent,
    CommandPaletteComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  readonly showScrollTop = signal(false);
  private readonly animations = inject(AnimationService);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop.set(window.scrollY > 600);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.animations.init());
  }
}
