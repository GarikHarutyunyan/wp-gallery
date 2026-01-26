import clsx from 'clsx';
import {ArrowAngleDoubleLeft} from 'components/alert-dialog/icons/arrows/ArrowAngleDoubleLeft';
import {ArrowAngleDoubleRight} from 'components/alert-dialog/icons/arrows/ArrowAngleDoubleRight';
import {ArrowAngleLeft} from 'components/alert-dialog/icons/arrows/ArrowAngleLeft';
import {ArrowAngleRight} from 'components/alert-dialog/icons/arrows/ArrowAngleRight';
import {ArrowBoldLeft} from 'components/alert-dialog/icons/arrows/ArrowBoldLeft';
import {ArrowBoldRight} from 'components/alert-dialog/icons/arrows/ArrowBoldRight';
import {ArrowCaretLeft} from 'components/alert-dialog/icons/arrows/ArrowCaretLeft';
import {ArrowCaretRight} from 'components/alert-dialog/icons/arrows/ArrowCaretRight';
import {ArrowCircleLeft} from 'components/alert-dialog/icons/arrows/ArrowCircleLeft';
import {ArrowCircleRight} from 'components/alert-dialog/icons/arrows/ArrowCircleRight';
import {ISliderSettings, SliderNavigationType} from 'data-structures';
import {FC} from 'react';
import SwiperInstance from 'swiper';
interface SliderNavigationProps {
  settings: ISliderSettings;
  mainRef?: React.RefObject<SwiperInstance | null>;
}

export const SliderNavigation: FC<SliderNavigationProps> = ({
  settings,
  mainRef,
}) => {
  const {
    navigationshowsOnHover,
    navigationType,
    navigationColor,
    navigationBackgroundColor,
    navigationSize,
    navigationPosition,
    navigationPadding,
    navigationOpacity,
    navigationBorder,
    navigationBorderColor,
    navigationBorderRadius,
    navigationColorHover,
    navigationBackgroundColorHover,
  } = settings;

  let LeftIcon: React.FC = ArrowAngleLeft;
  let RightIcon: React.FC = ArrowAngleRight;

  switch (navigationType) {
    case SliderNavigationType.ANGLE_DOUBLE:
      LeftIcon = ArrowAngleDoubleLeft;
      RightIcon = ArrowAngleDoubleRight;
      break;
    case SliderNavigationType.BOLD:
      LeftIcon = ArrowBoldLeft;
      RightIcon = ArrowBoldRight;
      break;
    case SliderNavigationType.CARET:
      LeftIcon = ArrowCaretLeft;
      RightIcon = ArrowCaretRight;
      break;
    case SliderNavigationType.CIRCLE:
      LeftIcon = ArrowCircleLeft;
      RightIcon = ArrowCircleRight;
      break;
    case SliderNavigationType.ANGLE:
    default:
      LeftIcon = ArrowAngleLeft;
      RightIcon = ArrowAngleRight;
      break;
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // stop the click from triggering the slide
    mainRef?.current?.slidePrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // stop the click from triggering the slide
    mainRef?.current?.slideNext();
  };

  return (
    <div
      className={clsx(
        'slider__navigation',
        `slider__navigation--${navigationPosition}`,
        {
          'slider__navigation--hover': navigationshowsOnHover,
        }
      )}
      style={
        {
          '--slider__navigation-color': navigationColor,
          '--slider__navigation-bg-color': navigationBackgroundColor,
          '--slider__navigation-color-hover': navigationColorHover,
          '--slider__navigation-bg-hover': navigationBackgroundColorHover,
        } as React.CSSProperties
      }
    >
      <div
        className="slider__button-prev"
        style={{
          width: `${navigationSize}px`,
          height: `${navigationSize}px`,
          padding: `${navigationPadding}px`,
          opacity: navigationOpacity,
          borderWidth: `${navigationBorder}px`,
          borderColor: navigationBorderColor,
          borderRadius: `${navigationBorderRadius}px`,

          borderStyle: 'solid',
        }}
        role="button"
        aria-label="Previous slide"
        tabIndex={0}
        onClick={handlePrev}
        onKeyDown={(e) => e.key === 'Enter' && handlePrev(e as any)}
      >
        <LeftIcon />
      </div>
      <div
        className="slider__button-next"
        style={{
          width: `${navigationSize}px`,
          height: `${navigationSize}px`,
          padding: `${navigationPadding}px`,
          opacity: navigationOpacity,
          borderWidth: `${navigationBorder}px`,
          borderColor: navigationBorderColor,
          borderRadius: `${navigationBorderRadius}px`,

          borderStyle: 'solid',
        }}
        role="button"
        aria-label="Next slide"
        tabIndex={0}
        onClick={handleNext}
        onKeyDown={(e) => e.key === 'Enter' && handleNext(e as any)}
      >
        <RightIcon />
      </div>
    </div>
  );
};
