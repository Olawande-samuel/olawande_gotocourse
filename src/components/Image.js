import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = ({ image, alt, height, width }) => (
  <div>
    <LazyLoadImage
      alt={alt}
      height={height}
      src={image} // use normal <img> attributes as props
      width={width} />
  </div>
);

export default Image;