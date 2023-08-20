import { useRef, useEffect, HTMLAttributes, Fragment } from 'react';
import * as Leaflet from 'leaflet';
import { $spots, $selectedSpot } from '~/stores/spots.store';
import type { Spot } from '~/stores/spots.store';
import { spotMapMarkerIcon } from './spotIcon';
import currentPositionImage from '~/assets/images/icons/crosshair.svg';

import 'leaflet/dist/leaflet.css';

function getCurrentLocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

interface SpotsMapProps extends HTMLAttributes<HTMLDivElement> {
  onSpotClick?: (spot: Spot) => void;
}

export function SpotsMap({ onSpotClick, ...props }: SpotsMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);

  function handleMoveToCurrentPosition() {
    getCurrentLocation().then((position) => {
      if (mapRef.current) {
        mapRef.current.panTo([position.coords.latitude, position.coords.longitude]);
      }
    });
  }

  useEffect(() => {
    let hasMap = true;
    const map = Leaflet.map(mapElement.current!).setView([47.16646223589143, 8.515760000580993], 13);
    mapRef.current = map;
    let markers: Leaflet.Marker[] = [];

    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    $spots.subscribe((spots) => {
      if (!hasMap) return;

      markers.forEach((marker) => marker.remove());
      markers = spots.map((spot) =>
        Leaflet.marker([spot.lat, spot.lon])
          .addTo(map)
          .setIcon(spotMapMarkerIcon(spot))
          .on('click', () => {
            onSpotClick?.(spot);
          })
      );
    });
    $selectedSpot.subscribe((spot) => {
      if (!hasMap || !spot) return;

      map.panTo([spot.lat, spot.lon]);
    });

    handleMoveToCurrentPosition();

    return () => {
      hasMap = false;
      map.remove();
    };
  }, [$spots]);

  return (
    <Fragment>
      <div {...props} ref={mapElement}></div>
      <button className="fixed bottom-8 right-4 z-[500]" onClick={handleMoveToCurrentPosition}>
        <img src={currentPositionImage.src} alt="Current position" className="w-8 h-8" />
      </button>
    </Fragment>
  );
}
