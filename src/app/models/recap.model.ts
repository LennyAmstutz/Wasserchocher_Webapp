export interface RecapImage {
  image_path: string;
  alt_text: string;
  caption: string;
  sort_order: number;
}

export interface Recap {
  id: number;
  event_id: number;
  title: string;
  slug?: string;
  content: string;
  cover_image_path: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  images?: RecapImage[];
}
