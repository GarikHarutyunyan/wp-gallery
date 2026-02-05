import {
  IImageDTO,
  ISliderSettings,
  SliderSlidesDesign,
  SliderTextPosition,
} from 'data-structures';
import {FC, RefObject} from 'react';
import {SlideText} from './SlideText';
interface SliderSlideContentProps {
  image: IImageDTO;
  effect: string;
  settings: ISliderSettings;
  textRef?: RefObject<HTMLDivElement>;
}

export const SliderSlideContent: FC<SliderSlideContentProps> = ({
  image,
  effect,
  settings,
  textRef,
}) => {
  const {
    slidesDesign,
    backgroundColor,
    padding,
    height,
    heightType,
    backgroundBlur,
    showTitle,
    showCaption,
    showDescription,
    textPosition,
  } = settings;

  const isFitCreative =
    (slidesDesign === SliderSlidesDesign.FIT ||
      slidesDesign === SliderSlidesDesign.BLURFIT) &&
    effect === 'creative';

  const isFill = slidesDesign === SliderSlidesDesign.FILL;

  const showText =
    (showTitle || showCaption || showDescription) &&
    textPosition !== SliderTextPosition.ABOVE &&
    textPosition !== SliderTextPosition.BELOW;

  return (
    <div
      className="slider__slide-content"
      style={{
        backgroundColor: isFitCreative ? backgroundColor : '',
        padding,
        height: `${height}${heightType}`,
      }}
    >
      {slidesDesign === SliderSlidesDesign.BLURFIT && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image.original.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: `blur(${backgroundBlur}px)`,
            transform: 'scale(1.1)',
            zIndex: 0,
          }}
        />
      )}

      <img
        src={image.original.url}
        alt=""
        style={{
          width: isFill ? '100%' : 'auto',
          height: isFill ? '100%' : 'auto',
          objectFit: isFill ? 'cover' : 'contain',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {showText && (
        <SlideText variant={'main'} image={image} settings={settings} />
      )}
    </div>
  );
};
