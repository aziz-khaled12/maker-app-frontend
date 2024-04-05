import React from 'react';
import { Link } from 'react-router-dom';

const ImageWithLink = ({ link, imageSrc, altText, className }) => {
  return (
    <Link href={link} >
      <img src={imageSrc} alt={altText} className={className} />
    </Link>
  );
};

export default ImageWithLink;
