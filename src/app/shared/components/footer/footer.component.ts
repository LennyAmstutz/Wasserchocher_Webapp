import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly navLinks = [
    { label: 'Events',    path: '/events' },
    { label: 'Rückblick', path: '/rueckblick' },
    { label: 'Sponsoren', path: '/sponsoren' },
    { label: 'Kontakt',   path: '/kontakt' },
  ];
}
