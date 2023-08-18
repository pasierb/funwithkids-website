import { map } from 'nanostores';

export type SpotFilters = {
  age?: string[];
  amenities?: string[];
  query?: string;
};

// export const $spotFilters = map<{ [key: string]: string[] }>({});
export const $spotFilters = map<SpotFilters>({});
