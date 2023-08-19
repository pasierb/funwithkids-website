import { atom } from 'nanostores';

export type AttractionType = 'trampoline_park' | 'playground' | 'parkour' | null;

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
  spot_attractions?: SpotAttraction[];
}

export const $spots = atom<Spot[]>([]);
export const $selectedSpot = atom<Spot | null>(null);
