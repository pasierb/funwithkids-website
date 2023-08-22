import { AnchorHTMLAttributes, LiHTMLAttributes, ComponentType, ExoticComponent, ReactElement } from 'react';
import { $selectedSpot } from '~/stores/spots.store';
import { ArrowTopRightOnSquareIcon, GlobeAltIcon, MapIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SpotAttractionTypeIcon } from '~/components/widgets/spots/SpotAttractionTypeIcon';
import { Spot } from '~/types/spot';

interface SpotDetailsProps {
  spot: Spot;
}

export function SpotDetails({ spot }: SpotDetailsProps) {
  return (
    <div className="py-4 px-4">
      <section>
        <ul>
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
      </section>

      <section className="border-t border-gray-100 py-4">
        <h4 className="font-semibold">Attractions</h4>

        <ul className="mt-4">
          {spot.spot_attractions?.map((attraction, idx) => (
            <AttributeListLitem key={idx} icon={<SpotAttractionTypeIcon className="w-6 h-6" type={attraction.type} />}>
              {attraction.name}
            </AttributeListLitem>
          ))}
        </ul>
      </section>
    </div>
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
