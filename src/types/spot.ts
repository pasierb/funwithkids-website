import type { Json } from '~/supabase';

export enum AttractionType {
  playground = 'playground',
  trampolinePark = 'trampoline_park',
  parkour = 'parkour',
  swimming = 'swimming',
}

export interface SpotAttraction {
  name: string;
  type: AttractionType;
  age_from: number;
  age_to: number;
}

export interface Spot {
  created_at: string;
  has_restaurant: boolean;
  has_toilet: boolean;
  id: number;
  lat: number;
  lon: number;
  name: string;
  google_maps_url: string | null;
  website_url: string | null;
  spot_attractions?: SpotAttraction[];
}

export type SpotProposal = {
  created_at: string;
  data: Json;
  id: number;
};

export interface SpotProposalData {
  name: string;
  website_url: string;
  about: string;
  google_maps_url: string;
  has_toilet: boolean;
  has_restaurant: boolean;
  spot_attractions: {
    name: string;
    type: AttractionType;
    age_from?: number;
    age_to?: number;
  }[];
}
