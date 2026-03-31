import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { RecapService } from '../../core/services/recap.service';
import { SponsorService } from '../../core/services/sponsor.service';
import { Event } from '../../models/event.model';
import { Recap } from '../../models/recap.model';
import { Sponsor, SponsorTier } from '../../models/sponsor.model';
import { FeaturedEventComponent } from '../../shared/components/featured-event/featured-event.component';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';
import { ContactCtaComponent } from '../../shared/components/contact-cta/contact-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    FeaturedEventComponent,
    EventCardComponent,
    ContactCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly eventService   = inject(EventService);
  private readonly recapService   = inject(RecapService);
  private readonly sponsorService = inject(SponsorService);

  featuredEvent  = signal<Event | null>(null);
  recentEvents   = signal<Event[]>([]);
  recentRecaps   = signal<Recap[]>([]);
  sponsorsByTier = signal<Record<SponsorTier, Sponsor[]>>({ gold: [], silver: [], bronze: [] });

  /** Feste Tier-Reihenfolge für @for im Template — kein Casting nötig */
  readonly tierOrder: { key: SponsorTier; label: string }[] = [
    { key: 'gold',   label: 'Gold'   },
    { key: 'silver', label: 'Silber' },
    { key: 'bronze', label: 'Bronze' },
  ];

  /** Hilfsmethode: gibt Sponsoren für einen Tier zurück — typsicher, kein Casting im Template */
  getSponsorsForTier(tier: SponsorTier): Sponsor[] {
    return this.sponsorsByTier()[tier];
  }

  ngOnInit(): void {
    this.eventService.getFeaturedEvent().subscribe(e => this.featuredEvent.set(e));

    this.eventService.getEvents().subscribe(events => {
      this.recentEvents.set(events.slice(0, 3));
    });

    this.recapService.getRecaps().subscribe(recaps => {
      this.recentRecaps.set(recaps.slice(0, 3));
    });

    this.sponsorService.getSponsors().subscribe(sponsors => {
      const grouped: Record<SponsorTier, Sponsor[]> = { gold: [], silver: [], bronze: [] };
      sponsors.forEach(s => grouped[s.tier].push(s));
      this.sponsorsByTier.set(grouped);
    });
  }
}
