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
}
