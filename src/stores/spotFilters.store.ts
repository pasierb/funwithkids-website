import { map } from 'nanostores';
import { AttractionType } from '~/types/spot';

export type SpotFilters = {
  age?: string[];
  amenities?: string[];
  attractionType?: AttractionType[];
  query?: string;
};

// export const $spotFilters = map<{ [key: string]: string[] }>({});
export const $spotFilters = map<SpotFilters>({});
