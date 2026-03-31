import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RecapService } from '../../core/services/recap.service';
import { Recap } from '../../models/recap.model';

@Component({
  selector: 'app-rueckblick-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './rueckblick-detail.component.html',
  styleUrl: './rueckblick-detail.component.css',
})
export class RueckblickDetailComponent implements OnInit {
  private readonly route        = inject(ActivatedRoute);
  private readonly recapService = inject(RecapService);

  recap   = signal<Recap | null>(null);
  loading = signal(true);
  error   = signal<string | null>(null);

  ngOnInit(): void {
    // Route uses :slug — could be an id or a slug depending on your API
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.recapService.getRecapBySlug(slug).subscribe({
      next: data => {
        this.recap.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Rückblick konnte nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
