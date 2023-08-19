import type { AttractionType, SpotAttraction, Spot } from '~/stores/spots.store';
import { Icon } from 'leaflet';

import mapMarkerDefaultImage from '~/assets/images/icons/map-marker-default.svg';
import mapMarkerPlaygroundImage from '~/assets/images/icons/map-marker-playground.svg';

const defaultIcon = new Icon({
  iconUrl: attractionTypeImage().src,
  iconSize: [50, 82],
});

const playgroundIcon = new Icon({
  iconUrl: attractionTypeImage('playground').src,
  iconSize: [50, 82],
});

export function attractionTypeImage(attractionType?: AttractionType) {
  switch (attractionType) {
    case 'playground':
      return mapMarkerPlaygroundImage;
    default:
      return mapMarkerDefaultImage;
  }
}

export function spotAttractionImage(spotAttraction: SpotAttraction) {
  return attractionTypeImage(spotAttraction.type);
}

export function spotMapMarkerIcon(spot: Spot) {
  if (!spot.spot_attractions || spot.spot_attractions.length === 0) return defaultIcon;
  if (spot.spot_attractions.length > 1) return defaultIcon;

  const attraction = spot.spot_attractions[0];
  switch (attraction.type) {
    case 'playground':
      return playgroundIcon;
    default:
      return defaultIcon;
  }
}
