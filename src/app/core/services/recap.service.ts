import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Recap } from '../../models/recap.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class RecapService {
  private readonly http = inject(HttpClient);
  private readonly base = '/Wasserchocher/api/recaps';

  getRecaps(): Observable<Recap[]> {
    return this.http
      .get<ApiResponse<Recap[]>>(`${this.base}/list.php`)
      .pipe(map(r => r.data));
  }

  getRecapById(id: string | number): Observable<Recap> {
    return this.http
      .get<ApiResponse<Recap>>(`${this.base}/detail.php?event_id=${id}`)
      .pipe(map(r => r.data));
  }

  getRecapBySlug(slug: string): Observable<Recap> {
    return this.http
      .get<ApiResponse<Recap>>(`${this.base}/detail.php?slug=${slug}`)
      .pipe(map(r => r.data));
  }
}
