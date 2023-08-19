import { Fragment, useEffect, useState } from 'react';
import { $spots } from '~/stores/spots.store';
import { $spotFilters } from '~/stores/spotFilters.store';
import { supabaseClient } from '~/services/supabase';
import { MapIcon } from '@heroicons/react/20/solid';
import debounce from 'lodash-es/debounce';
import { SpotsFilterBar } from '~/components/widgets/spots/SpotsFilterBar';
import { SpotsMap } from '~/components/widgets/spots/SpotsMap';
import { SpotsList } from '~/components/widgets/spots/SpotsList';

function updateSpots() {
  let spotsQuery = supabaseClient.from('spots').select(`
        *,
        spot_attractions!inner (
          name,
          type,
          age_from,
          age_to
        )
      `);

  const filters = $spotFilters.get();
  filters.amenities?.forEach((amenity) => {
    spotsQuery = spotsQuery.is(amenity, true);
  });
  if (filters.attractionType && filters.attractionType.length > 0) {
    spotsQuery = spotsQuery.in(`spot_attractions.type`, filters.attractionType);
  }
  if (filters.query) {
    spotsQuery = spotsQuery.ilike('name', `%${filters.query}%`);
  }

  spotsQuery.order('name').then(({ data: spots, error }) => {
    if (error) {
      console.error(error);
      return;
    }

    $spots.set(spots);
  });
}

export function SpotsApp() {
  const [mapOpen, setMapOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    $spotFilters.subscribe(debounce(updateSpots, 500));

    if (window.innerWidth < 768) {
      setIsMobile(true);
      setMapOpen(true);
    }
  }, []);

  return (
    <Fragment>
      <div className="border-b border-gray-200 px-8">
        <SpotsFilterBar />
      </div>

      <div className="grow flex flex-row relative">
        <div className={`w-full md:w-1/2 lg:w-1/3 ${mapOpen ? 'hidden' : null}`}>
          <SpotsList />
        </div>

        {(!isMobile || mapOpen) && (
          <div className="grow flex flex-col">
            <SpotsMap className="grow" />
          </div>
        )}

        <div className="absolute z-[1000] bottom-8 w-full flex justify-center pointer-events-none">
          <button
            className="pointer-events-auto flex align-middle rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setMapOpen(!mapOpen)}
          >
            <MapIcon className="w-6 h-6" />
            <span>Map</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
