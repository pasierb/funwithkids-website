import { useRef, useEffect, HTMLAttributes, Fragment } from 'react';
import * as Leaflet from 'leaflet';
import { $spots, $selectedSpot } from '~/stores/spots.store';
import { spotMapMarkerIcon, attractionTypeImage } from './spotIcon';
import currentPositionImage from '~/assets/images/icons/crosshair.svg';
import { AttractionType, Spot } from '~/types/spot';

import 'leaflet/dist/leaflet.css';
import './SpotsMap.css';

function getCurrentLocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function createIcon(imageSrc: string[], iconCssClass?: string | undefined) {
  return new Leaflet.DivIcon({
    className: `spots-map-pin-icon ${iconCssClass ?? ''}`,
    html: `<div class="icon" data-icons-rotate='${JSON.stringify(
      imageSrc.map((src) => `url(${src})`)
    )}' style="--background-image-url: url(${imageSrc[0]})" />`,
  });
}

const defaultIcon = createIcon([attractionTypeImage(AttractionType.playground).src]);
const attractionTypeIconMap = {
  [AttractionType.playground]: createIcon([attractionTypeImage(AttractionType.playground).src]),
  [AttractionType.parkour]: createIcon([attractionTypeImage(AttractionType.parkour).src]),
  [AttractionType.trampolinePark]: createIcon([attractionTypeImage(AttractionType.trampolinePark).src]),
  [AttractionType.swimming]: createIcon([attractionTypeImage(AttractionType.swimming).src]),
};

function spotIcon(spot: Spot) {
  if (!spot.spot_attractions || spot.spot_attractions.length === 0) return defaultIcon;
  if (spot.spot_attractions.length === 1) return attractionTypeIconMap[spot.spot_attractions[0].type];

  return createIcon(spot.spot_attractions.map((attraction) => attractionTypeImage(attraction.type).src));
}

interface SpotsMapProps extends HTMLAttributes<HTMLDivElement> {
  onSpotClick?: (spot: Spot) => void;
}

export function SpotsMap({ onSpotClick, className = '', ...props }: SpotsMapProps) {
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
          .setIcon(spotIcon(spot))
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

  useEffect(() => {
    function rotateImages() {
      document.querySelectorAll<HTMLDivElement>('[data-icons-rotate]').forEach((div) => {
        const images = JSON.parse(div.dataset.iconsRotate ?? '[]') as string[];
        const idx = parseInt(div.dataset.iconsRotateIdx ?? '1') % images.length;

        div.style.setProperty('--background-image-url', images[idx]);
        div.setAttribute('data-icons-rotate-idx', (idx + 1).toString());
      });
    }

    const intervalId = setInterval(rotateImages, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Fragment>
      <div {...props} className={`spots-map ${className}`} ref={mapElement}></div>
      <button className="fixed bottom-8 right-4 z-[500]" onClick={handleMoveToCurrentPosition}>
        <img src={currentPositionImage.src} alt="Current position" className="w-8 h-8" />
      </button>
    </Fragment>
  );
}
