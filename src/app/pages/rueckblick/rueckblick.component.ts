import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RecapService } from '../../core/services/recap.service';
import { Recap } from '../../models/recap.model';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-rueckblick',
  standalone: true,
  imports: [RouterLink, DatePipe, PageHeroComponent],
  templateUrl: './rueckblick.component.html',
  styleUrl: './rueckblick.component.css',
})
export class RueckblickComponent implements OnInit {
  private readonly recapService = inject(RecapService);

  recaps  = signal<Recap[]>([]);
  loading = signal(true);
  error   = signal<string | null>(null);

  /** Group recaps by year for the editorial year-block layout */
  recapsByYear = computed(() => {
    const grouped = new Map<number, Recap[]>();
    this.recaps().forEach(r => {
      const year = new Date(r.published_at).getFullYear();
      if (!grouped.has(year)) grouped.set(year, []);
      grouped.get(year)!.push(r);
    });
    // Return sorted descending
    return Array.from(grouped.entries())
      .sort(([a], [b]) => b - a)
      .map(([year, items]) => ({ year, items }));
  });

  ngOnInit(): void {
    this.recapService.getRecaps().subscribe({
      next: data => {
        this.recaps.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Rückblicke konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
