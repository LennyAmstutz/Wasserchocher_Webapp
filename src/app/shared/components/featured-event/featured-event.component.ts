import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-featured-event',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './featured-event.component.html',
  styleUrl: './featured-event.component.css',
})
export class FeaturedEventComponent {
  event = input.required<Event>();
}
