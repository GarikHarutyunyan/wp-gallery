import {ReactElement} from 'react';

const MasonryImage = (): ReactElement => {
  return (
    <svg height="70" width="70" viewBox="0 0 24 24">
      <path
        fill="#85A3B8"
        d="m0,4v7h13V1H3C1.346,1,0,2.346,0,4Zm11,5H2v-5c0-.552.449-1,1-1h8v6Zm10-6h-6v17h6c1.654,0,3-1.346,3-3V6c0-1.654-1.346-3-3-3Zm1,14c0,.552-.449,1-1,1h-4V5h4c.551,0,1,.448,1,1v11Zm-20,3c0,1.654,1.346,3,3,3h8v-10H2v7Zm2-5h7v6h-6c-.551,0-1-.448-1-1v-5Z"
      ></path>
    </svg>
  );
};

export {MasonryImage};
