import {ReactElement} from 'react';

const JustifiedImage = (): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="512"
      height="512"
    >
      <g id="_01_align_center" data-name="01 align center">
        <path d="M13,2V9H2V3A1,1,0,0,1,3,2H13m2-2H3A3,3,0,0,0,0,3v8H15V0Z" />
        <path d="M21,2a1,1,0,0,1,1,1V9H19V2h2m0-2H17V11h7V3a3,3,0,0,0-3-3Z" />
        <path d="M5,15v7H3a1,1,0,0,1-1-1V15H5m2-2H0v8a3,3,0,0,0,3,3H7V13Z" />
        <path d="M22,15v6a1,1,0,0,1-1,1H11V15H22m2-2H9V24H21a3,3,0,0,0,3-3V13Z" />
      </g>
    </svg>
  );
};

export {JustifiedImage};
