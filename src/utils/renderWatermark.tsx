import React from 'react';

import {IPositionOption} from 'components/controls';
import {useSettings} from 'components/settings';

export const getWatermarkPositionStyles = (
  position: IPositionOption['value']
): React.CSSProperties => {
  switch (position) {
    case 'top-left':
      return {top: '0', bottom: 'unset', left: '0', right: 'unset'};
    case 'top-center':
      return {
        top: '0',
        bottom: 'unset',
        left: '50%',
        right: 'unset',
        transform: 'translateX(-50%)',
      };
    case 'top-right':
      return {top: '0', bottom: 'unset', left: 'unset', right: '0'};
    case 'middle-left':
      return {
        top: '50%',
        bottom: 'unset',
        left: '0',
        right: 'unset',
        transform: 'translateY(-50%)',
      };
    case 'middle-center':
      return {
        top: '50%',
        bottom: 'unset',
        left: '50%',
        right: 'unset',
        transform: 'translate(-50%, -50%)',
      };
    case 'middle-right':
      return {
        top: '50%',
        bottom: 'unset',
        left: 'unset',
        right: '0',
        transform: 'translateY(-50%)',
      };
    case 'bottom-left':
      return {top: 'unset', bottom: '0', left: '0', right: 'unset'};
    case 'bottom-center':
      return {
        top: 'unset',
        bottom: '0',
        left: '50%',
        right: 'unset',
        transform: 'translateX(-50%)',
      };
    case 'bottom-right':
      return {top: 'unset', bottom: '0', left: 'unset', right: '0'};
    default:
      return {
        top: '50%',
        bottom: 'unset',
        left: '50%',
        right: 'unset',
        transform: 'translate(-50%, -50%)',
      };
  }
};

export function Watermark() {
  const {generalSettings} = useSettings();
  if (
    !generalSettings ||
    !generalSettings.enableWatermark ||
    !generalSettings.watermarkImageURL
  ) {
    return null;
  }
  return (
    <img
      src={generalSettings.watermarkImageURL}
      alt=""
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        width: `${generalSettings.watermarkSize}%`,
        height: 'auto',
        border: 'none',
        opacity: 1 - generalSettings.watermarkTransparency / 100,
        ...getWatermarkPositionStyles(generalSettings.watermarkPosition),
      }}
    />
  );
}
