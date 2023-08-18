import { atom } from 'nanostores';

interface Spot {
  created_at: string;
  has_restaurant: boolean;
  has_toilet: boolean;
  id: number;
  lat: number;
  lon: number;
  name: string;
}

export const $spots = atom<Spot[]>([]);
export const $selectedSpot = atom<Spot | null>(null);
