import CircularProgress from '@mui/material/CircularProgress';
import {
  IImageDTO,
  ISliderSettings,
  SizeTypeWidth,
  SliderSlidesDesign,
  SliderTextPosition,
} from 'data-structures';
import {FC, RefObject, useState} from 'react';
import {
  getLargestSrcItem,
  getSrcSetString,
  ISrcSetItem,
} from 'utils/imageSrcSet';
import {clsx} from 'yet-another-react-lightbox';
import {SlideText} from './SlideText';
interface SliderSlideContentProps {
  width: number;
  widthType: SizeTypeWidth;
  index: number;
  prevIndex: number;
  image: IImageDTO;
  effect: string;
  settings: ISliderSettings;
  textRef?: RefObject<HTMLDivElement>;
}
export const SliderSlideContent: FC<SliderSlideContentProps> = ({
  width,
  widthType,
  index,
  prevIndex,
  image,
  effect,
  settings,
}) => {
  const {
    slidesDesign,
    backgroundColor,
    padding,
    paddingType,
    height,
    heightType,
    backgroundBlur,
    showTitle,
    showCaption,
    showDescription,
    textPosition,
  } = settings;
  const [loaded, setLoaded] = useState<boolean>(false);
  const srcSetString: string = getSrcSetString(image.sizes);
  const largestSrcItem: ISrcSetItem = getLargestSrcItem(image.sizes);
  const shouldLoadImage = index === 0 || index === prevIndex || index === 1;
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
      style={
        {
          'backgroundColor': isFitCreative ? backgroundColor : '',
          '--slider__slide-padding': `${padding}${paddingType}`,
          'height': `${height}${heightType}`,
        } as React.CSSProperties
      }
    >
      {slidesDesign === SliderSlidesDesign.BLURFIT && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${largestSrcItem.src})`,
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
        src={shouldLoadImage ? largestSrcItem.src : undefined}
        alt={image.alt}
        srcSet={shouldLoadImage ? srcSetString : undefined}
        sizes={`${width}${widthType === '%' ? 'vw' : widthType}`}
        loading={'eager'}
        data-index={index}
        style={{
          width: isFill ? '100%' : 'auto',
          height: isFill ? '100%' : 'auto',
          objectFit: isFill ? 'cover' : 'contain',
          position: 'relative',
          zIndex: 1,
        }}
        onLoad={() => {
          setLoaded(true);
        }}
      />

      {!loaded && (
        <div
          className={clsx(
            'gallery__loader  gallery__loader--logo slider__slide-load-logo'
          )}
        >
          <CircularProgress sx={{color: 'black'}} size={50} />
        </div>
      )}

      {showText && (
        <SlideText variant={'main'} image={image} settings={settings} />
      )}
    </div>
  );
};
