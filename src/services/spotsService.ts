export interface Spot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  attractions: {
    title: string;
    ageFrom: number;
    ageTo: number;
  }[];
}

const spots: Spot[] = [
  {
    id: 4,
    name: 'Freiruum',
    lat: 47.17674491319202,
    lng: 8.513148398803247,
    attractions: [],
  },
];

export async function getSpots(): Promise<Spot[]> {
  return spots;
}
