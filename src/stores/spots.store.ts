import { atom } from 'nanostores';
import type { Spot } from '~/services/spotsService';

export const $spots = atom<Spot[]>([]);
export const $selectedSpot = atom<Spot | null>(null);
