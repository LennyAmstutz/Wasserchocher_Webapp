import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events/events.component').then(m => m.EventsComponent),
  },
  {
    path: 'events/:slug',
    loadComponent: () =>
      import('./pages/event-detail/event-detail.component').then(
        m => m.EventDetailComponent
      ),
  },
  {
    path: 'rueckblick',
    loadComponent: () =>
      import('./pages/rueckblick/rueckblick.component').then(
        m => m.RueckblickComponent
      ),
  },
  {
    path: 'rueckblick/:slug',
    loadComponent: () =>
      import('./pages/rueckblick-detail/rueckblick-detail.component').then(
        m => m.RueckblickDetailComponent
      ),
  },
  {
    path: 'sponsoren',
    loadComponent: () =>
      import('./pages/sponsoren/sponsoren.component').then(
        m => m.SponsorenComponent
      ),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./pages/kontakt/kontakt.component').then(
        m => m.KontaktComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
