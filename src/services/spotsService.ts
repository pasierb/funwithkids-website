// import { SpotEnvironment } from '~/stores/spotFilters.store';
import { supabaseClient } from '~/services/supabase';

export interface Spot {
  created_at: string;
  has_restaurant: boolean;
  has_toilet: boolean;
  id: number;
  lat: number;
  lon: number;
  name: string;
}

export interface SpotAttraction {
  age_from: number;
  age_to: number;
  created_at: string;
  id: number;
  name: string;
  spot_id: number;
}

// export interface SpotAttraction {
//   ageFrom: number;
//   ageTo?: number;
//   environment?: SpotEnvironment;
//   title: string;
// }

// export interface Spot {
//   name: string;
//   website?: string;
//   lat: number;
//   lng: number;
//   attractions: SpotAttraction[];
//   hasFood?: boolean;
//   hasToilet?: boolean;
// }

// const spots: Spot[] = [
//   {
//     name: 'Freiruum',
//     website: 'https://www.freiruum.ch/',
//     lat: 47.17674491319202,
//     lng: 8.513148398803247,
//     attractions: [
//       {
//         title: 'Trampolins',
//         ageFrom: 6,
//         environment: SpotEnvironment.Indoors,
//       },
//       {
//         title: 'Playground',
//         ageFrom: 0,
//         ageTo: 7,
//         environment: SpotEnvironment.Indoors,
//       },
//     ],
//   },
//   {
//     name: 'Spielplatz Siehbach',
//     lat: 47.172791930243605,
//     lng: 8.50763538692062,
//     attractions: [
//       {
//         title: 'Playground',
//         ageFrom: 0,
//         environment: SpotEnvironment.Outdoors,
//       },
//     ],
//   },
//   {
//     name: 'Fronalpstock',
//     lat: 46.96910874487854,
//     lng: 8.637157732125562,
//     hasFood: true,
//     hasToilet: true,
//     attractions: [
//       {
//         title: 'Playground',
//         ageFrom: 4,
//         ageTo: 12,
//         environment: SpotEnvironment.Outdoors,
//       },
//     ],
//   },
// ];

export async function getSpots() {
  return supabaseClient
    .from('spots')
    .select('*')
    .then((response) => response.data);
}
