import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly stackItems = [
    'Angular', 'Python', 'FastAPI', 'Databricks', 'Azure', 'LangChain', 'OpenAI',
  ];

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  }
}
