import { atom } from 'nanostores';
import { Spot } from '~/types/spot';

export const $spots = atom<Spot[]>([]);
export const $selectedSpot = atom<Spot | null>(null);
