import { useRef, useEffect, HTMLAttributes } from 'react';
import * as Leaflet from 'leaflet';
import { $spots, $selectedSpot, $mapSelectedSpot } from '~/stores/spots.store';
import { spotMapMarkerIcon } from './spotIcon';

import 'leaflet/dist/leaflet.css';

interface SpotsMapProps extends HTMLAttributes<HTMLDivElement> {}

export function SpotsMap(props: SpotsMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hasMap = true;
    const map = Leaflet.map(mapElement.current!).setView([47.16646223589143, 8.515760000580993], 13);
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
            $selectedSpot.set(spot);
            $mapSelectedSpot.set(spot);
          })
      );
    });
    $selectedSpot.subscribe((spot) => {
      if (!hasMap || !spot) return;

      map.panTo([spot.lat, spot.lon]);
    });

    return () => {
      hasMap = false;
      map.remove();
    };
  }, [$spots]);

  return <div {...props} ref={mapElement}></div>;
}
