import React from 'react';

export const hexToDecPair = (
  shadowHex: string,
  highlightHex: string
): [string, string, string] => {
  const toDec = (hex: string): [number, number, number] => [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];

  const [r1, g1, b1] = toDec(shadowHex);
  const [r2, g2, b2] = toDec(highlightHex);

  return [
    `${r1.toFixed(2)} ${r2.toFixed(2)}`,
    `${g1.toFixed(2)} ${g2.toFixed(2)}`,
    `${b1.toFixed(2)} ${b2.toFixed(2)}`,
  ];
};

interface DuotoneFilterProps {
  id: string;
  shadowColor: string;
  highlightColor: string;
}

export const DuotoneFilter: React.FC<DuotoneFilterProps> = ({
  id,
  shadowColor,
  highlightColor,
}) => {
  const [rTable, gTable, bTable] = hexToDecPair(shadowColor, highlightColor);

  return (
    <svg style={{display: 'none'}}>
      <filter id={id}>
        <feColorMatrix
          type="matrix"
          values="
            0.3 0.59 0.11 0 0
            0.3 0.59 0.11 0 0
            0.3 0.59 0.11 0 0
            0   0    0    1 0"
        />
        <feComponentTransfer colorInterpolationFilters="sRGB">
          <feFuncR type="table" tableValues={rTable} />
          <feFuncG type="table" tableValues={gTable} />
          <feFuncB type="table" tableValues={bTable} />
        </feComponentTransfer>
      </filter>
    </svg>
  );
};
