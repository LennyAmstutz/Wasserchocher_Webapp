import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  scrolled = signal(false);
  navOpen = signal(false);

  readonly navLinks = [
    { label: 'Home',       path: '/',          exact: true },
    { label: 'Events',     path: '/events',    exact: false },
    { label: 'Rückblick',  path: '/rueckblick',exact: false },
    { label: 'Sponsoren',  path: '/sponsoren', exact: false },
    { label: 'Kontakt',    path: '/kontakt',   exact: false },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  toggleNav(): void {
    this.navOpen.update(v => !v);
  }

  closeNav(): void {
    this.navOpen.set(false);
  }
}
