import { AttractionType, SpotAttraction } from '~/types/spot';

import mapMarkerDefaultImage from '~/assets/images/icons/map-marker-default.svg';
import mapMarkerPlaygroundImage from '~/assets/images/icons/playground.svg';
import gymnastImage from '~/assets/images/icons/trampoline.svg';
import parkourImage from '~/assets/images/icons/parkour.svg';
import swimmingImage from '~/assets/images/icons/swimming.svg';

export function attractionTypeImage(attractionType?: AttractionType) {
  switch (attractionType) {
    case 'playground':
      return mapMarkerPlaygroundImage;
    case 'trampoline_park':
      return gymnastImage;
    case 'parkour':
      return parkourImage;
    case 'swimming':
      return swimmingImage;
    default:
      return mapMarkerDefaultImage;
  }
}

export function spotAttractionImage(spotAttraction: SpotAttraction) {
  return attractionTypeImage(spotAttraction.type);
}
