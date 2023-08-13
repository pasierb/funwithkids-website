import { map } from 'nanostores';

export type SpotFilters = {
  age?: string[];
  environment?: string[];
};

export enum SpotEnvironment {
  Indoors = 'indoors',
  Outdoors = 'outdoors',
}

// export const $spotFilters = map<{ [key: string]: string[] }>({});
export const $spotFilters = map<SpotFilters>({});
