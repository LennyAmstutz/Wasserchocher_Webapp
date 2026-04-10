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

  recap        = signal<Recap | null>(null);
  loading      = signal(true);
  error        = signal<string | null>(null);
  lightboxIndex = signal<number | null>(null);

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('slug') ?? '';
    this.recapService.getRecapById(eventId).subscribe({
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

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxIndex.set(null);
    document.body.style.overflow = '';
  }

  prevImage(e: Event): void {
    e.stopPropagation();
    const current = this.lightboxIndex();
    const total   = this.recap()?.images?.length ?? 0;
    if (current !== null) {
      this.lightboxIndex.set((current - 1 + total) % total);
    }
  }

  nextImage(e: Event, total: number): void {
    e.stopPropagation();
    const current = this.lightboxIndex();
    if (current !== null) {
      this.lightboxIndex.set((current + 1) % total);
    }
  }
}
