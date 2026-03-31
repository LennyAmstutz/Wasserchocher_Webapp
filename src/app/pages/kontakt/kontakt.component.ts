import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeroComponent],
  templateUrl: './kontakt.component.html',
  styleUrl: './kontakt.component.css',
})
export class KontaktComponent {
  private readonly fb             = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  submitting = signal(false);
  submitted  = signal(false);
  submitError = signal<string | null>(null);

  readonly categories = [
    { value: 'general',     label: 'Allgemeine Anfrage' },
    { value: 'event',       label: 'Event / Veranstaltung' },
    { value: 'sponsoring',  label: 'Sponsoring / Kooperation' },
    { value: 'press',       label: 'Presse' },
    { value: 'other',       label: 'Sonstiges' },
  ];

  form = this.fb.nonNullable.group({
    name:     ['', [Validators.required, Validators.minLength(2)]],
    email:    ['', [Validators.required, Validators.email]],
    subject:  ['', [Validators.required, Validators.minLength(4)]],
    category: ['general', Validators.required],
    message:  ['', [Validators.required, Validators.minLength(20)]],
  });

  get f() { return this.form.controls; }

  isInvalid(field: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    this.contactService.createContactRequest(this.form.getRawValue()).subscribe({
      next: res => {
        this.submitting.set(false);
        if (res.success) {
          this.submitted.set(true);
          this.form.reset({ category: 'general' });
        } else {
          this.submitError.set(res.message ?? 'Unbekannter Fehler.');
        }
      },
      error: () => {
        this.submitting.set(false);
        this.submitError.set('Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.');
      },
    });
  }
}
