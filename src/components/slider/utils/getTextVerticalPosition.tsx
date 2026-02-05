import {SliderTextPosition} from 'data-structures';

export const getTextVerticalPosition = (
  textPosition: SliderTextPosition
): React.CSSProperties => {
  switch (textPosition) {
    case 'top':
      return {top: 0, transform: 'none'};

    case 'bottom':
      return {bottom: 0, transform: 'none'};

    case 'center':
      return {
        top: '50%',
        transform: 'translateY(-50%)',
        height: '100%',
      };

    case 'above':
    case 'below':
      return {
        position: 'relative',
        backgroundColor: 'transparent',
      };

    default:
      return {};
  }
};
