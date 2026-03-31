import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest, ContactResponse } from '../../models/contact-request.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/contact';

  createContactRequest(payload: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.base}/create.php`, payload);
  }
}
