import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-text">
            <h2 class="cta-h2">Fragen, Ideen,<br/>Kooperationen?</h2>
            <p>Wir hören gerne von dir — ob Anfrage, Idee oder einfach Hallo.</p>
          </div>
          <a routerLink="/kontakt" class="btn btn-light">Schreib uns →</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact-cta.component.css',
})
export class ContactCtaComponent {}
