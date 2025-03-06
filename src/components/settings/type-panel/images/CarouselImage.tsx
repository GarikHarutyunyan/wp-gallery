import {ReactElement} from 'react';

const CarouselImage = (): ReactElement => {
  return (
    <svg height="70" width="70" viewBox="0 0 24 24">
      <path
        fill="#85A3B8"
        d="m21,0h-8c-1.654,0-3,1.346-3,3v21h14V3c0-1.654-1.346-3-3-3Zm1,22h-10V3c0-.551.449-1,1-1h8c.551,0,1,.449,1,1v19ZM5,3h2v18h-2V3ZM0,6h2v12H0V6Z"
      ></path>
    </svg>
  );
};

export {CarouselImage};
