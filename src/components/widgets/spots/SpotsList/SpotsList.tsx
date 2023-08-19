import { useEffect, useState, Fragment } from 'react';
import { $spots, $selectedSpot } from '~/stores/spots.store';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { SpotDetails } from './SpotDetails';
import { SpotAttractionTypeIcon } from '~/components/widgets/spots/SpotAttractionTypeIcon';
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
      <div>
        {spot.name}
        <ul>
          {spot.spot_attractions?.map((attraction) => (
            <li className="inline-block">
              <SpotAttractionTypeIcon type={attraction.type} />
            </li>
          ))}
        </ul>
      </div>

      <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
    </li>
  );
}