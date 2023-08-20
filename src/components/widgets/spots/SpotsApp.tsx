import { Fragment, useEffect, useState } from 'react';
import { $selectedSpot, $spots, Spot } from '~/stores/spots.store';
import { $spotFilters } from '~/stores/spotFilters.store';
import { supabaseClient } from '~/services/supabase';
import { MapIcon } from '@heroicons/react/20/solid';
import debounce from 'lodash-es/debounce';
import { SpotsFilterBar } from '~/components/widgets/spots/SpotsFilterBar';
import { SpotsMap } from '~/components/widgets/spots/SpotsMap';
import { SpotsList } from '~/components/widgets/spots/SpotsList';
import { SpotDetails } from '~/components/widgets/spots/SpotDetails';

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
  const [mapOpen, setMapOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  function updateApplicationUrl(spot: Spot | null, mapOpen: boolean) {
    const url = new URL(window.location.href);
    url.searchParams.set('map', mapOpen ? '1' : '0');
    url.searchParams.set('spot', spot?.id.toString() ?? '');

    window.history.pushState({ spot: $selectedSpot.get(), mapOpen }, '', url.toString());
  }

  function updateApplicationStateFromUrl(url: URL) {
    setMapOpen(url.searchParams.get('map') === '1');

    let spot: Spot | undefined;
    if (url.searchParams.get('spot')) {
      const spotId = parseInt(url.searchParams.get('spot')!);
      spot = $spots.get().find((spot) => spot.id === spotId);
    }
    $selectedSpot.set(spot ?? null);
  }

  // Handle clicks on the map toggle button.
  function handleMapToggle() {
    setMapOpen((val) => !val);
  }

  // Handle clicks on the map.
  function handleMapSpotClick(spot: Spot) {
    if (mapOpen) {
      setMapOpen(false);
    }

    $selectedSpot.set(spot);
  }

  useEffect(() => {
    console.log('update app state', { mapOpen, selectedSpot });
    updateApplicationUrl(selectedSpot, mapOpen);
  }, [mapOpen, selectedSpot]);

  useEffect(() => {
    // Update spots when filters change.
    $spotFilters.subscribe(debounce(updateSpots, 500));

    // When the selected spot changes, update the URL.
    $selectedSpot.listen(setSelectedSpot);

    // When the URL changes, update application state.
    window.addEventListener('popstate', (event) => {
      const url = new URL(window.location.href);
      updateApplicationStateFromUrl(url);
    });
  }, []);

  return (
    <Fragment>
      <div className="border-b border-gray-200">
        <SpotsFilterBar />
      </div>

      <div className="grow flex flex-row relative">
        <div className={`w-full md:w-1/2 lg:w-1/3 ${mapOpen ? 'hidden' : null}`}>
          {selectedSpot ? <SpotDetails spot={selectedSpot} /> : <SpotsList />}
        </div>

        {(!isMobile || mapOpen) && (
          <div className="grow flex flex-col">
            <SpotsMap onSpotClick={handleMapSpotClick} className="grow" key={`open-${mapOpen}`} />
          </div>
        )}

        <div className="fixed z-[1000] bottom-8 w-full flex justify-center pointer-events-none md:hidden">
          <button
            className="pointer-events-auto flex align-middle rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleMapToggle}
          >
            <MapIcon className="w-6 h-6" />
            <span>Map</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
