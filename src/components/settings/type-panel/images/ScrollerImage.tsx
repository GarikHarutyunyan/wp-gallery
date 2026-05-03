import {ReactElement} from 'react';

const ScrollerImage = (): ReactElement => {
  return (
    <svg height="70" width="70" viewBox="0 0 24 24">
      <path
        fill="#85A3B8"
        d="M23,4H1c-.55,0-1-.45-1-1s.45-1,1-1H23c.55,0,1,.45,1,1s-.45,1-1,1Zm1,17c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1H23c.55,0,1-.45,1-1Zm-4-8v-2c0-2.21-1.79-4-4-4H8c-2.21,0-4,1.79-4,4v2c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4Zm-4-4c1.1,0,2,.9,2,2v2c0,1.1-.9,2-2,2H8c-1.1,0-2-.9-2-2v-2c0-1.1,.9-2,2-2h8Z"
      />
    </svg>
  );
};

export {ScrollerImage};
