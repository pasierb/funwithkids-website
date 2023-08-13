import { SpotFilters } from '~/stores/spotFilters.store';
import type { Spot, SpotAttraction } from '~/services/spotsService';

export class SpotAttractionFilterService {
  constructor(public attraction: SpotAttraction) {}

  matches(filters: SpotFilters): boolean {
    const matchesAge = SpotAttractionFilterService.age(this.attraction, filters);
    const matchesEnvironment = SpotAttractionFilterService.environment(this.attraction, filters);

    return matchesAge && matchesEnvironment;
  }

  // FIXME: This is not working.
  static age(attraction: SpotAttraction, filters: SpotFilters): boolean {
    if (!filters.age?.length) return true;

    const ranges = filters.age.map((value) => value.split(':').map(parseInt)) as [number, number | typeof NaN][];
    const { ageFrom, ageTo = Number.POSITIVE_INFINITY } = attraction;

    for (const range of ranges) {
      const [from = 0, to = Number.POSITIVE_INFINITY] = range;

      if (ageTo < from) return false;

      // if (attractionAge >= from && attractionAge <= to) return true;
    }

    return true;
  }

  static environment(attraction: SpotAttraction, filters: SpotFilters): boolean {
    if (!filters.environment?.length) return true;
    if (!attraction.environment) return false;

    return filters.environment.includes(attraction.environment!);
  }
}

export class SpotFilterService {
  constructor(public spot: Spot) {}

  matches(filters: SpotFilters): boolean {
    const matchesAttractions = this.spot.attractions.some((attraction) =>
      new SpotAttractionFilterService(attraction).matches(filters)
    );

    return matchesAttractions;
  }
}
