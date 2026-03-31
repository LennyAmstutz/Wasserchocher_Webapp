import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
    <section class="page-head">
      <div class="container">
        <div class="page-head-inner">
          <div class="page-head-left">
            <span class="tag-pill">{{ tag() }}</span>
            <h1 class="page-h1">{{ title() }}</h1>
          </div>
          <p class="page-intro-p">{{ intro() }}</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './page-hero.component.css',
})
export class PageHeroComponent {
  tag   = input.required<string>();
  title = input.required<string>();
  intro = input.required<string>();
}
