import { Component, input } from '@angular/core';
import { Sponsor, SponsorTier } from '../../../models/sponsor.model';

@Component({
  selector: 'app-sponsor-tier',
  standalone: true,
  templateUrl: './sponsor-tier.component.html',
  styleUrl: './sponsor-tier.component.css',
})
export class SponsorTierComponent {
  tier     = input.required<SponsorTier>();
  sponsors = input.required<Sponsor[]>();

  get tierLabel(): string {
    const map: Record<SponsorTier, string> = { gold: 'Gold', silver: 'Silber', bronze: 'Bronze' };
    return map[this.tier()];
  }
}
