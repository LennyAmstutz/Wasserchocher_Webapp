import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Event } from '../../models/event.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/events';

  getEvents(): Observable<Event[]> {
    return this.http
      .get<ApiResponse<Event[]>>(`${this.base}/list.php`)
      .pipe(map(r => r.data));
  }

  getFeaturedEvent(): Observable<Event | null> {
    return this.http
      .get<ApiResponse<Event | null>>(`${this.base}/featured.php`)
      .pipe(map(r => r.data));
  }

  getEventBySlug(slug: string): Observable<Event> {
    return this.http
      .get<ApiResponse<Event>>(`${this.base}/detail.php?slug=${slug}`)
      .pipe(map(r => r.data));
  }
}
