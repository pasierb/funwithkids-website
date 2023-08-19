import { ImgHTMLAttributes } from 'react';
import { attractionTypeImage } from '~/components/widgets/spots/spotIcon';
import type { AttractionType } from '~/stores/spots.store';

export function SpotAttractionTypeIcon({ ...rest }: ImgHTMLAttributes<HTMLImageElement> & { type: AttractionType }) {
  const image = attractionTypeImage(rest.type);

  return <img {...rest} src={image.src} />;
}
