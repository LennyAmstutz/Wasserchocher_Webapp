import { Component, OnInit, inject, signal } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../models/event.model';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [PageHeroComponent, EventCardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  private readonly eventService = inject(EventService);

  events  = signal<Event[]>([]);
  loading = signal(true);
  error   = signal<string | null>(null);

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: data => {
        this.events.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Events konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
