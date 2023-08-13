import { SpotEnvironment } from '~/stores/spotFilters.store';

export interface SpotAttraction {
  ageFrom: number;
  ageTo?: number;
  environment?: SpotEnvironment;
  title: string;
}

export interface Spot {
  name: string;
  website?: string;
  lat: number;
  lng: number;
  attractions: SpotAttraction[];
  hasFood?: boolean;
  hasToilet?: boolean;
}

const spots: Spot[] = [
  {
    name: 'Freiruum',
    website: 'https://www.freiruum.ch/',
    lat: 47.17674491319202,
    lng: 8.513148398803247,
    attractions: [
      {
        title: 'Trampolins',
        ageFrom: 6,
        environment: SpotEnvironment.Indoors,
      },
      {
        title: 'Playground',
        ageFrom: 0,
        ageTo: 7,
        environment: SpotEnvironment.Indoors,
      },
    ],
  },
  {
    name: 'Spielplatz Siehbach',
    lat: 47.172791930243605,
    lng: 8.50763538692062,
    attractions: [
      {
        title: 'Playground',
        ageFrom: 0,
        environment: SpotEnvironment.Outdoors,
      },
    ],
  },
];

export async function getSpots(): Promise<Spot[]> {
  return spots;
}
