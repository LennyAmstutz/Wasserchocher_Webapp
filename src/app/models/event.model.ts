export interface Event {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  address: string;
  hero_image_path: string | null;
  status: 'published' | 'draft' | 'cancelled';
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images?: EventImage[];
  sponsors?: Sponsor[];
}

export interface EventImage {
  id: number;
  event_id: number;
  image_path: string;
  alt_text: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

import { Sponsor } from './sponsor.model';
