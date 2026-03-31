export type SponsorTier = 'gold' | 'silver' | 'bronze';

export interface Sponsor {
  id: number;
  name: string;
  slug: string;
  tier: SponsorTier;
  logo_path: string | null;
  website_url: string;
  short_description: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
