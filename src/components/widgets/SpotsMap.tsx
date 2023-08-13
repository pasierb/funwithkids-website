import { useRef, useEffect } from 'react';
import * as Leaflet from 'leaflet';
import { $spots } from '~/stores/spots.store';

import 'leaflet/dist/leaflet.css';

export function SpotsMap() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = Leaflet.map(mapElement.current!).setView([47.16646223589143, 8.515760000580993], 13);
    let markers: Leaflet.Marker[] = [];

    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    $spots.subscribe((spots) => {
      markers.forEach((marker) => marker.remove());
      markers = spots.map((spot) => Leaflet.marker([spot.lat, spot.lng]).addTo(map));
    });

    return () => {
      map.remove();
    };
  }, [$spots]);

  return <div className="w-full h-[75vh]" ref={mapElement}></div>;
}
