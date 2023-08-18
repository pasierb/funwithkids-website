import { atom, computed } from 'nanostores';
import type { Spot } from '~/services/spotsService';
import { $spotFilters } from '~/stores/spotFilters.store';

export const $allSpots = atom<Spot[]>([]);
export const $spots = computed([$allSpots, $spotFilters], (spots, spotFilters) => {
  // return spots.filter((spot) => new SpotFilterService(spot).matches(spotFilters));
  return spots;
});
export const $selectedSpot = atom<Spot | null>(null);
