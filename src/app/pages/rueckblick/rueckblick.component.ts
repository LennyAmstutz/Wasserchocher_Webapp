import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

interface GalleryImage {
  image_path: string;
  alt_text: string;
  recap_title: string;
}

@Component({
  selector: 'app-rueckblick',
  standalone: true,
  imports: [PageHeroComponent],
  templateUrl: './rueckblick.component.html',
  styleUrl: './rueckblick.component.css',
})
export class RueckblickComponent implements OnInit {
  private readonly http = inject(HttpClient);

  allImages     = signal<GalleryImage[]>([]);
  loading       = signal(true);
  error         = signal<string | null>(null);
  lightboxIndex = signal<number | null>(null);

  ngOnInit(): void {
    this.http.get<{ success: boolean; data: GalleryImage[] }>('/Wasserchocher/api/recaps/gallery.php').subscribe({
      next: res => { this.allImages.set(res.data); this.loading.set(false); },
      error: () => { this.error.set('Bilder konnten nicht geladen werden.'); this.loading.set(false); },
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
    const total   = this.allImages().length;
    if (current !== null) this.lightboxIndex.set((current - 1 + total) % total);
  }

  nextImage(e: Event): void {
    e.stopPropagation();
    const current = this.lightboxIndex();
    const total   = this.allImages().length;
    if (current !== null) this.lightboxIndex.set((current + 1) % total);
  }
}
