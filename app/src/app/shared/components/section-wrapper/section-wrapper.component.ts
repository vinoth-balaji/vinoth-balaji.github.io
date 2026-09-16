import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-wrapper.component.html',
  styleUrl: './section-wrapper.component.scss',
})
export class SectionWrapperComponent {
  @Input() label = '';
  @Input() heading = '';
  @Input() subheading = '';
  @Input() centered = false;
  @Input() compact = false;
}
