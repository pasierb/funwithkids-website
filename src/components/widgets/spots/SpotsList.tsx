import { useEffect, useState, Fragment } from 'react';
import { $spots, $selectedSpot } from '~/stores/spots.store';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import type { Spot } from '~/stores/spots.store';

export function SpotsList() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  useEffect(() => {
    $spots.subscribe((spots) => {
      setSpots([...spots]);
    });

    $selectedSpot.subscribe((spot) => {
      setSelectedSpot(spot);
    });
  }, [$spots]);

  function handleSelectSpot(spot: Spot) {
    $selectedSpot.set(spot);
  }

  return (
    <Fragment>
      {!selectedSpot ? (
        <ul role="list" className="divide-y divide-gray-100">
          {spots.map((spot) => (
            <SpotsListItem key={[spot.lat, spot.lon].join('-')} spot={spot} onSelect={handleSelectSpot} />
          ))}
        </ul>
      ) : (
        <SpotDetails spot={selectedSpot} />
      )}
    </Fragment>
  );
}

interface SpotsListItemProps {
  spot: Spot;
  onSelect: (spot: Spot) => void;
}

function SpotsListItem({ spot, onSelect }: SpotsListItemProps) {
  return (
    <li
      className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
      role="button"
      onClick={() => onSelect(spot)}
    >
      {spot.name}

      <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
    </li>
  );
}

interface SpotDetailsProps {
  spot: Spot;
}

function SpotDetails({ spot }: SpotDetailsProps) {
  function handleBack() {
    $selectedSpot.set(null);
  }

  return (
    <section>
      {/* Header */}
      <div className="bg-gray-50 px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold leading-6 text-gray-900">{spot.name}</h3>
          </div>
          <div className="flex h-7 items-center">
            <button type="button" className="relative text-gray-400 hover:text-gray-500" onClick={() => handleBack()}>
              <span className="absolute -inset-2.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div>{spot.spot_attractions?.map((attraction) => <div>{attraction.name}</div>)}</div>
    </section>
  );
}
