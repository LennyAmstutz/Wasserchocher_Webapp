import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Sponsor } from '../../models/sponsor.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class SponsorService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/sponsors';

  getSponsors(): Observable<Sponsor[]> {
    return this.http
      .get<ApiResponse<Sponsor[]>>(`${this.base}/list.php`)
      .pipe(map(r => r.data));
  }
}
