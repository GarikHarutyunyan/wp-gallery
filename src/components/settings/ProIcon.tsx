import React, {CSSProperties} from 'react';
import './pro-icon.css';

interface IProIconProps {
  width?: number;
  height?: number;
  style?: CSSProperties;
}

const ProIcon: React.FC<IProIconProps> = ({width = 30, height = 30, style}) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 120 120"
      id="Layer_1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g>
        <polygon
          className="st0"
          points="75.7,107.4 60,97.5 44.3,107.4 44.3,41.1 75.7,41.1  "
        />
        <circle className="st1" cx="60" cy="44.8" r="32.2" />
        <circle className="st2" cx="60" cy="44.8" r="25.3" />
        <path
          className="st3"
          d="M61.2,29.7l4.2,8.4c0.2,0.4,0.6,0.7,1,0.8l9.3,1.4c1.1,0.2,1.6,1.5,0.8,2.3l-6.7,6.6c-0.3,0.3-0.5,0.8-0.4,1.2   l1.6,9.3c0.2,1.1-1,2-2,1.4l-8.3-4.4c-0.4-0.2-0.9-0.2-1.3,0L51,61.1c-1,0.5-2.2-0.3-2-1.4l1.6-9.3c0.1-0.4-0.1-0.9-0.4-1.2   l-6.7-6.6c-0.8-0.8-0.4-2.2,0.8-2.3l9.3-1.4c0.4-0.1,0.8-0.3,1-0.8l4.2-8.4C59.3,28.7,60.7,28.7,61.2,29.7z"
        />
      </g>
    </svg>
  );
};

export {ProIcon};
