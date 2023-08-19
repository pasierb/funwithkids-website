import { ImgHTMLAttributes } from 'react';
import { attractionTypeImage } from '~/components/widgets/spots/spotIcon';
import type { AttractionType } from '~/stores/spots.store';

export function SpotAttractionTypeIcon({ ...rest }: ImgHTMLAttributes<HTMLImageElement> & { type: AttractionType }) {
  const image = attractionTypeImage(rest.type);

  return <img {...rest} className='w-6 h-6' src={image.src} />;
}
