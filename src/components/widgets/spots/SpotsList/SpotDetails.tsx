import { AnchorHTMLAttributes, LiHTMLAttributes, ComponentType, ExoticComponent, ReactElement } from 'react';
import type { Spot } from '~/stores/spots.store';
import { $selectedSpot } from '~/stores/spots.store';
import { ArrowTopRightOnSquareIcon, GlobeAltIcon, MapIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SpotAttractionTypeIcon } from '~/components/widgets/spots/SpotAttractionTypeIcon';

interface SpotDetailsProps {
  spot: Spot;
}

export function SpotDetails({ spot }: SpotDetailsProps) {
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
      <div className="py-8 px-4">
        <ul className="border-t border-gray-100 py-4">
          {spot.website_url && (
            <AttributeListLitem icon={<GlobeAltIcon className="h-6 w-6" />}>
              <LinkOut href={spot.website_url}>{spot.website_url}</LinkOut>
            </AttributeListLitem>
          )}
          {spot.google_maps_url && (
            <AttributeListLitem icon={<MapIcon className="h-6 w-6" />}>
              <LinkOut href={spot.google_maps_url}>Open in Google Maps</LinkOut>
            </AttributeListLitem>
          )}
        </ul>

        <ul>
          {spot.spot_attractions?.map((attraction, idx) => (
            <AttributeListLitem key={idx} icon={<SpotAttractionTypeIcon type={attraction.type} />}>
              {attraction.name}
            </AttributeListLitem>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AttributeListLitem({ icon, children, ...rest }: LiHTMLAttributes<HTMLLIElement> & { icon: ReactElement }) {
  return (
    <li {...rest} className="flex gap-4 my-4">
      {icon}
      {children}
    </li>
  );
}

function LinkOut({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} target="_blank">
      {children}
      <ArrowTopRightOnSquareIcon className="inline ml-2 h-4 w-4 text-gray-500" />
    </a>
  );
}
