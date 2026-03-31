import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SponsorService } from '../../core/services/sponsor.service';
import { Sponsor, SponsorTier } from '../../models/sponsor.model';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SponsorTierComponent } from '../../shared/components/sponsor-tier/sponsor-tier.component';

@Component({
  selector: 'app-sponsoren',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, SponsorTierComponent],
  templateUrl: './sponsoren.component.html',
  styleUrl: './sponsoren.component.css',
})
export class SponsorenComponent implements OnInit {
  private readonly sponsorService = inject(SponsorService);

  sponsors = signal<Sponsor[]>([]);
  loading  = signal(true);
  error    = signal<string | null>(null);

  readonly tierOrder: SponsorTier[] = ['gold', 'silver', 'bronze'];

  sponsorsByTier = computed(() => {
    const grouped: Record<SponsorTier, Sponsor[]> = { gold: [], silver: [], bronze: [] };
    this.sponsors().forEach(s => grouped[s.tier].push(s));
    return grouped;
  });

  ngOnInit(): void {
    this.sponsorService.getSponsors().subscribe({
      next: data => {
        this.sponsors.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Sponsoren konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
