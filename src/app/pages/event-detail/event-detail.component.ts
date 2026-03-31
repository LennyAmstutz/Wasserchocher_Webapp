import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../models/event.model';
import { SponsorTierComponent } from '../../shared/components/sponsor-tier/sponsor-tier.component';
import { Sponsor, SponsorTier } from '../../models/sponsor.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, SponsorTierComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  private readonly route        = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);

  event   = signal<Event | null>(null);
  loading = signal(true);
  error   = signal<string | null>(null);

  sponsorsByTier = signal<Record<SponsorTier, Sponsor[]>>({
    gold: [], silver: [], bronze: [],
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.eventService.getEventBySlug(slug).subscribe({
      next: data => {
        this.event.set(data);
        if (data.sponsors?.length) {
          const grouped: Record<SponsorTier, Sponsor[]> = { gold: [], silver: [], bronze: [] };
          data.sponsors.forEach(s => grouped[s.tier].push(s));
          this.sponsorsByTier.set(grouped);
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Event konnte nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }

  get hasSponsorsByTier(): boolean {
    const t = this.sponsorsByTier();
    return t.gold.length > 0 || t.silver.length > 0 || t.bronze.length > 0;
  }

  readonly tierOrder: SponsorTier[] = ['gold', 'silver', 'bronze'];
}
