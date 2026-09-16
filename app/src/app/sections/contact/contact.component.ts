import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/components/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly contactLinks = [
    {
      platform: 'Email',
      label: 'balaji.vinoth1996@gmail.com',
      href: 'mailto:balaji.vinoth1996@gmail.com',
      icon: '✉️',
    },
    {
      platform: 'Work Email',
      label: 'b.vinoth@accenture.com',
      href: 'mailto:b.vinoth@accenture.com',
      icon: '💼',
    },
    {
      platform: 'LinkedIn',
      label: 'Connect on LinkedIn',
      href: 'https://linkedin.com/in/vinothb',
      icon: '🔗',
    },
    {
      platform: 'GitHub',
      label: 'View GitHub Profile',
      href: 'https://github.com/vinoth-balaji',
      icon: '💻',
    },
    {
      platform: 'Resume',
      label: 'Download full resume (PDF)',
      href: '/resume.pdf',
      icon: '📄',
    },
  ];
}
