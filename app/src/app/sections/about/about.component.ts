import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/components/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
