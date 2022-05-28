import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = ({ image, alt, height, width }) => (
  <div className="background">
    <LazyLoadImage
      alt={alt}
      height={height}
      src={image} // use normal <img> attributes as props
      visibleByDefault={true}
      width={width} />
  </div>
);

export default Image;