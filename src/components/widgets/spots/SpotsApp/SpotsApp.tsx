import { Fragment, useEffect, useState } from 'react';
import { $selectedSpot, $spots } from '~/stores/spots.store';
import { $spotFilters } from '~/stores/spotFilters.store';
import { supabaseClient } from '~/services/supabase';
import { ListBulletIcon } from '@heroicons/react/20/solid';
import debounce from 'lodash-es/debounce';
import { SpotsFilterBar } from '~/components/widgets/spots/SpotsFilterBar';
import { SpotsMap } from '~/components/widgets/spots/SpotsMap';
import { SpotsList } from '~/components/widgets/spots/SpotsList';
import { SpotDetails } from '~/components/widgets/spots/SpotDetails';
import { Spot } from '~/types/spot';
import { SlidePanel } from './SlidePanel';
import { set } from 'lodash-es';

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
  const [spotDetailsOpen, setSpotDetailsOpen] = useState(false);
  const [spotListOpen, setSpotListOpen] = useState(false);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  function updateApplicationUrl(spot: Spot | null) {
    const url = new URL(window.location.href);
    url.searchParams.set('spot', spot?.id.toString() ?? '');

    window.history.pushState({ spot: $selectedSpot.get() }, '', url.toString());
  }

  function updateApplicationStateFromUrl(url: URL) {
    let spot: Spot | undefined;
    if (url.searchParams.get('spot')) {
      const spotId = parseInt(url.searchParams.get('spot')!);
      spot = $spots.get().find((spot) => spot.id === spotId);
    }
    $selectedSpot.set(spot ?? null);
  }

  // Handle clicks on the map toggle button.
  function handleMapToggle() {
    setSpotListOpen((spotListOpen) => !spotListOpen);
  }

  // Handle clicks on the map.
  function handleMapSpotClick(spot: Spot) {
    $selectedSpot.set(spot);
    setSpotDetailsOpen(true);
  }

  function handleSelectSpot(spot: Spot) {
    $selectedSpot.set(spot);
    setSpotListOpen(false);
    setSpotDetailsOpen(true);
  }

  useEffect(() => {
    updateApplicationUrl(selectedSpot);
  }, [selectedSpot]);

  useEffect(() => {
    // Update spots when filters change.
    $spotFilters.subscribe(debounce(updateSpots, 500));

    // When the selected spot changes, update the URL.
    $selectedSpot.listen(setSelectedSpot);

    $spots.listen((spots) => setSpots([...spots]));

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
        <SlidePanel
          isOpen={spotDetailsOpen}
          onClose={() => setSpotDetailsOpen(false)}
          title={selectedSpot ? selectedSpot.name : ''}
        >
          {selectedSpot && <SpotDetails spot={selectedSpot} />}
        </SlidePanel>

        <SlidePanel isOpen={spotListOpen} onClose={() => setSpotListOpen(false)} title="Spots">
          <SpotsList onSelectSpot={handleSelectSpot} spots={spots} />
        </SlidePanel>

        <div className="grow flex flex-col">
          <SpotsMap onSpotClick={handleMapSpotClick} className="grow" />
        </div>

        <div className="fixed z-[410] bottom-8 w-full flex justify-center pointer-events-none">
          <button
            className="pointer-events-auto flex align-baseline rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleMapToggle}
          >
            <span>List</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
