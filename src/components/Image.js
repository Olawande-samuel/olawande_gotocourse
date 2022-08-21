import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({ image, alt, height, width, effect="blur" }) => (
  <div className="background">
    <LazyLoadImage
      alt={alt}
      height={height}
      src={image} // use normal <img> attributes as props
      visibleByDefault={true}
      width={width}
      effect={effect}
       />
  </div>
);

export default Image;